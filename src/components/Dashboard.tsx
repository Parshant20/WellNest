import React from 'react';
import { UserProfile, AssessmentData, Product, CustomFormula } from '../types';
import { CustomProductCard } from './CustomProductCard';
import { Sparkles, Calendar, Droplets, User, PlusCircle, CheckCircle2, ArrowRight, Star, Leaf, RefreshCw } from 'lucide-react';

interface DashboardProps {
  currentUser: UserProfile | null;
  assessments: AssessmentData[];
  products: Product[];
  currentFormula: CustomFormula | null;
  onTakeAssessment: () => void;
  onOpenAuth: () => void;
  onSelectProduct: (product: Product) => void;
  isLoading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  assessments,
  products,
  currentFormula,
  onTakeAssessment,
  onOpenAuth,
  onSelectProduct,
  isLoading,
}) => {
  const latestAssessment = assessments[0] || null;

  // Filter matched products based on latest assessment
  const recommendedProducts = latestAssessment
    ? products.filter(
        (p) =>
          p.target_skin.includes('All') ||
          p.target_skin.includes(latestAssessment.skin_type) ||
          p.target_goal.includes(latestAssessment.primary_goal)
      )
    : products.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Leaf className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/20">
              <User className="w-3.5 h-3.5" />
              <span>Wellness Member Dashboard</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
              Welcome back, {currentUser?.full_name || currentUser?.email?.split('@')[0] || 'Wellness Guest'}!
            </h1>
            
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Track your custom botanical formulations, view matched wellness companions, and manage your health assessments stored in Supabase.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onTakeAssessment}
              className="px-5 py-3 rounded-full bg-white text-emerald-950 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              <span>{latestAssessment ? 'Design New Formula' : 'Start First Assessment'}</span>
            </button>

            {!currentUser && (
              <button
                onClick={onOpenAuth}
                className="px-4 py-3 rounded-full bg-emerald-700/80 border border-emerald-500/50 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-700 transition-all cursor-pointer"
              >
                Sign in to Sync
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
          <p className="text-xs text-emerald-700 font-medium">Loading your wellness dashboard...</p>
        </div>
      ) : latestAssessment && currentFormula ? (
        <>
          {/* Section: Your Custom Formulated Product */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Active Formulation</span>
                <h2 className="text-2xl font-bold text-emerald-950 font-['Outfit']">Your Custom Designed Product</h2>
              </div>
            </div>

            <CustomProductCard
              formula={currentFormula}
              userName={currentUser?.full_name || currentUser?.email?.split('@')[0] || 'You'}
              onRetake={onTakeAssessment}
            />
          </div>

          {/* Section: Assessment Answers Breakdown */}
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Database Record</span>
                <h3 className="text-xl font-bold text-emerald-950 font-['Outfit']">Latest Assessment Breakdown</h3>
              </div>
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {latestAssessment.created_at ? new Date(latestAssessment.created_at).toLocaleDateString() : 'Today'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[11px] font-semibold text-emerald-700 block">Age Group</span>
                <strong className="text-sm font-bold text-emerald-950">{latestAssessment.age_group} yrs</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[11px] font-semibold text-emerald-700 block">Skin Type</span>
                <strong className="text-sm font-bold text-emerald-950">{latestAssessment.skin_type}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[11px] font-semibold text-emerald-700 block">Primary Goal</span>
                <strong className="text-sm font-bold text-emerald-950 truncate block" title={latestAssessment.primary_goal}>
                  {latestAssessment.primary_goal}
                </strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[11px] font-semibold text-emerald-700 block">Stress Level</span>
                <strong className="text-sm font-bold text-emerald-950">{latestAssessment.stress_level}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[11px] font-semibold text-emerald-700 block">Hydration</span>
                <strong className="text-sm font-bold text-emerald-950">{latestAssessment.hydration_glasses} glasses/day</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[11px] font-semibold text-emerald-700 block">Botanical Base</span>
                <strong className="text-sm font-bold text-emerald-950 truncate block" title={latestAssessment.preferred_base}>
                  {latestAssessment.preferred_base.split('&')[0]}
                </strong>
              </div>
            </div>
          </div>

          {/* Section: Recommended Wellness Products Matched To Answers */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Tailored Routine</span>
                <h2 className="text-2xl font-bold text-emerald-950 font-['Outfit']">
                  Recommended Companion Products
                </h2>
                <p className="text-xs text-emerald-800/80 mt-0.5">
                  Scientifically paired with your {latestAssessment.skin_type} skin type and {latestAssessment.primary_goal} goal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-emerald-100 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-emerald-50">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold">
                        {product.category}
                      </span>
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-emerald-950 font-['Outfit'] line-clamp-1 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-emerald-800/80 line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    <div className="space-y-1 mb-4">
                      {product.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-emerald-900">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-100 flex items-center justify-between">
                    <span className="text-base font-bold text-emerald-950 font-['Outfit']">${product.price}</span>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-700 text-emerald-900 hover:text-white text-xs font-semibold border border-emerald-200 transition-colors"
                    >
                      View Formula
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Assessment History */}
          {assessments.length > 1 && (
            <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-emerald-950 font-['Outfit'] mb-4">
                Previous Assessment History ({assessments.length})
              </h3>
              <div className="space-y-3">
                {assessments.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">{item.custom_product_name}</h4>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        {item.skin_type} Skin &bull; Goal: {item.primary_goal} &bull; Base: {item.preferred_base}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 self-start sm:self-center">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Saved'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-emerald-100 p-8 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-950 font-['Outfit']">No Assessment Completed Yet</h2>
          <p className="text-sm text-emerald-800/80 mt-2 max-w-md mx-auto leading-relaxed">
            Take our quick 2-minute wellness questionnaire to design your personalized product and unlock your tailored companion recommendations.
          </p>
          <button
            onClick={onTakeAssessment}
            className="mt-6 px-7 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Design Your Product Now</span>
          </button>
        </div>
      )}

    </div>
  );
};
