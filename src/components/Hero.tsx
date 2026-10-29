import React from 'react';
import { Sparkles, ShieldCheck, Droplets, Leaf, ArrowRight, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
  onExploreProducts: () => void;
  onOpenGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartAssessment,
  onExploreProducts,
  onOpenGuide
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/50 via-teal-50/20 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top notification pill */}
        <div className="flex justify-center mb-6">
          <div 
            onClick={onOpenGuide}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium hover:bg-emerald-200/80 transition-colors cursor-pointer shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>BCA Minor Project Showcase: <strong>Powered by Supabase & React</strong></span>
            <span className="text-emerald-700 underline text-xs">View SQL Schema &rarr;</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-950 font-['Outfit'] leading-[1.12]">
              Design Your Own <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-600">
                Personalized Wellness Product
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-emerald-900/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Every body and skin is unique. Answer a few gentle questions about your age, skin type, and wellness aspirations — and formulate your own bespoke botanical skincare elixir in minutes.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartAssessment}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-base shadow-lg shadow-emerald-800/20 hover:shadow-emerald-800/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-emerald-300 group-hover:rotate-12 transition-transform" />
                <span>Start Free Wellness Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-emerald-50 text-emerald-900 font-semibold text-base border border-emerald-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer"
              >
                Browse Wellness Catalog
              </button>
            </div>

            {/* Feature Checkpoints */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-emerald-100">
              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-sm font-medium text-emerald-900">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Leaf className="w-4 h-4" />
                </div>
                <span>100% Pure Botanicals</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-sm font-medium text-emerald-900">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Droplets className="w-4 h-4" />
                </div>
                <span>Skin-pH Balanced</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-sm font-medium text-emerald-900">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Supabase Cloud Auth</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100">
              
              {/* Product Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-emerald-900 tracking-wide uppercase">Custom Formulation</span>
                </div>
                <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full font-semibold border border-emerald-200">
                  Batch #WN-BOT-2026
                </span>
              </div>

              {/* Product Card Visual */}
              <div className="my-5 relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-950 p-6 text-white text-center shadow-inner">
                <div className="absolute top-2 right-2 text-emerald-400 opacity-20">
                  <Leaf className="w-24 h-24" />
                </div>

                <div className="relative z-10 space-y-3">
                  <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase rounded-full border border-white/20">
                    Your Personalized Recipe
                  </span>
                  
                  <div className="w-20 h-28 mx-auto my-2 rounded-2xl bg-gradient-to-b from-white/30 to-emerald-200/20 backdrop-blur-sm border border-white/40 flex flex-col items-center justify-center shadow-lg">
                    <Droplets className="w-8 h-8 text-emerald-200 mb-1" />
                    <span className="text-[10px] font-mono tracking-widest text-emerald-100">50 ML</span>
                  </div>

                  <h3 className="text-xl font-bold font-['Outfit']">Radiant Botanical Glow Dew</h3>
                  <p className="text-xs text-emerald-100/80">
                    Formulated for Combination Skin &bull; Targets Glowing Radiance & Anti-Stress
                  </p>
                </div>
              </div>

              {/* Mini formulation ingredients list */}
              <div className="space-y-2 text-xs text-emerald-900">
                <p className="font-semibold text-emerald-950 flex items-center justify-between">
                  <span>Custom Active Components:</span>
                  <span className="text-emerald-700">99.4% Match</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100 font-medium">Aloe & Green Tea Base</span>
                  <span className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100 font-medium">Kakadu Plum Vit-C</span>
                  <span className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100 font-medium">French Lavender</span>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-5 pt-4 border-t border-emerald-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700">Ready in 2 minutes</span>
                <button
                  onClick={onStartAssessment}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group"
                >
                  Create yours now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 3 Step Process Bar */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-emerald-200/70">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mt-3 font-['Outfit']">
              How WellNest Crafts Your Product
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base mb-4 font-['Outfit']">
                1
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2 font-['Outfit']">Take Wellness Assessment</h3>
              <p className="text-sm text-emerald-800/80 leading-relaxed">
                Tell us about your age bracket, your skin texture (oily, dry, sensitive), and your main personal wellness priority.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base mb-4 font-['Outfit']">
                2
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2 font-['Outfit']">Select Extracts & Name It</h3>
              <p className="text-sm text-emerald-800/80 leading-relaxed">
                Choose your botanical base, aromatherapeutic aroma, and give your product a personalized name to print on its digital label.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base mb-4 font-['Outfit']">
                3
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2 font-['Outfit']">View Dashboard & Matches</h3>
              <p className="text-sm text-emerald-800/80 leading-relaxed">
                Receive your custom formulation breakdown plus curated companion wellness products saved to your profile in Supabase.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
