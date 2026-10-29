import React, { useState } from 'react';
import { Droplets, Sparkles, Check, Share2, Printer, Shield, Leaf, Clock, Heart } from 'lucide-react';
import { CustomFormula } from '../types';

interface CustomProductCardProps {
  formula: CustomFormula;
  userName?: string;
  onRetake?: () => void;
}

export const CustomProductCard: React.FC<CustomProductCardProps> = ({
  formula,
  userName = 'Wellness Seeker',
  onRetake
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Check out my custom wellness product: ${formula.name} (Batch: ${formula.batch_id}) created on WellNest!`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Leaf className="w-56 h-56 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-emerald-100 border border-white/20">
                Custom Formulation
              </span>
              <span className="text-xs font-mono text-emerald-200">
                Batch {formula.batch_id}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight">
              {formula.name}
            </h2>
            <p className="text-sm text-emerald-100/90 mt-1">
              Custom formulated for <strong className="text-white">{userName}</strong> &bull; {formula.skin_type} Skin
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2.5 rounded-full border transition-colors ${
                liked ? 'bg-rose-500 text-white border-rose-400' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-medium backdrop-blur-md transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Recipe!' : 'Share Recipe'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-700" />
              <span>Print Label</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Formula Body */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Visual Bottle & Spec Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Bottle Graphic */}
          <div className="md:col-span-4 bg-gradient-to-b from-emerald-50/70 to-teal-50/40 rounded-2xl p-6 border border-emerald-100 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-40 relative rounded-3xl bg-white border-2 border-emerald-300 shadow-md flex flex-col items-center justify-between p-3 my-2">
              <div className="w-8 h-4 rounded-t-md bg-emerald-700 -mt-7 shadow-xs border border-emerald-800" />
              <div className="w-12 h-2 rounded-full bg-emerald-200" />
              
              <div className="w-full text-center px-1">
                <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-900 truncate">{formula.name}</p>
                <p className="text-[7px] text-emerald-600 mt-0.5">{formula.skin_type} Formula</p>
                <div className="w-6 h-0.5 bg-emerald-400 mx-auto my-1" />
                <p className="text-[7px] font-mono text-emerald-700">50 ML e</p>
              </div>

              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
            </div>

            <div className="mt-3">
              <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-full text-xs font-semibold">
                Match Score: {formula.match_score}%
              </span>
              <p className="text-[11px] text-emerald-700 mt-1">100% Clean Botanical Formulation</p>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="md:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xs font-medium text-emerald-700 block">Skin Profile</span>
                <span className="text-sm font-bold text-emerald-950">{formula.skin_type} Type</span>
              </div>

              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xs font-medium text-emerald-700 block">Target Wellness Goal</span>
                <span className="text-sm font-bold text-emerald-950">{formula.primary_goal}</span>
              </div>

              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xs font-medium text-emerald-700 block">Hydrating Base</span>
                <span className="text-sm font-bold text-emerald-950">{formula.base_extract}</span>
              </div>

              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xs font-medium text-emerald-700 block">Aromatherapy Note</span>
                <span className="text-sm font-bold text-emerald-950">{formula.scent_profile}</span>
              </div>
            </div>

            <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100 flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900">Recommended Routine</h4>
                <p className="text-xs text-teal-950 mt-0.5 leading-relaxed">{formula.frequency}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Active Botanicals Section */}
        <div>
          <h3 className="text-base font-bold text-emerald-950 font-['Outfit'] mb-3 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            Selected Active Botanical Bioactives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {formula.active_botanicals.map((botanical, idx) => (
              <div 
                key={idx} 
                className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-xs flex items-center gap-2.5 hover:border-emerald-300 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-emerald-900 leading-snug">{botanical}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Apply directions */}
        <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Droplets className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">Application Instructions</h4>
            <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
              {formula.directions}
            </p>
          </div>
        </div>

        {/* Retake action */}
        {onRetake && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={onRetake}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-950 underline cursor-pointer"
            >
              Want to adjust ingredients? Retake assessment &rarr;
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
