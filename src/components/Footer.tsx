import React from 'react';
import { Leaf, Database, Sparkles, Heart, ShieldCheck, Github } from 'lucide-react';

interface FooterProps {
  onOpenGuide: () => void;
  onNavigateTab: (tab: 'home' | 'assessment' | 'products' | 'dashboard') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide, onNavigateTab }) => {
  return (
    <footer className="bg-white border-t border-emerald-100 text-emerald-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-['Outfit'] text-emerald-950">WellNest</span>
            </div>
            <p className="text-xs text-emerald-800/80 leading-relaxed">
              Design your own custom botanical wellness products with personalized skin matching, clean ingredients, and cloud database persistence.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>BCA Minor Project System</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-emerald-800">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-emerald-950 hover:underline">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('assessment')} className="hover:text-emerald-950 hover:underline">
                  Design Your Product (Assessment)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('products')} className="hover:text-emerald-950 hover:underline">
                  Sample Wellness Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('dashboard')} className="hover:text-emerald-950 hover:underline">
                  User Dashboard & Formulas
                </button>
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">Tech Architecture</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-emerald-900">
              <span className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200">React 19 + TypeScript</span>
              <span className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200">Supabase (PostgreSQL)</span>
              <span className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200">Supabase Auth</span>
              <span className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200">Tailwind CSS</span>
              <span className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200">Vite Build Tool</span>
            </div>
          </div>

          {/* BCA & Supabase guide */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>Database Documentation</span>
            </h4>
            <p className="text-[11px] text-emerald-800 leading-snug">
              Need to inspect SQL table schemas, RLS policies, or connect your Supabase project?
            </p>
            <button
              onClick={onOpenGuide}
              className="mt-1 w-full py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Open SQL & Setup Guide
            </button>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-700/80">
          <p>&copy; {new Date().getFullYear()} WellNest &bull; BCA Minor Project Submission. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-emerald-600 fill-current" /> for healthy skin
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
