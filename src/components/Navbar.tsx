import React from 'react';
import { Leaf, User, LogIn, LogOut, Database, Sparkles, BookOpen, Layers } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'assessment' | 'products' | 'dashboard';
  setActiveTab: (tab: 'home' | 'assessment' | 'products' | 'dashboard') => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenSupabaseGuide: () => void;
  isSupabaseLive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onSignOut,
  onOpenSupabaseGuide,
  isSupabaseLive,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-emerald-950 font-['Outfit']">WellNest</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Custom Wellness
                </span>
              </div>
              <p className="text-xs text-emerald-700/70 font-medium hidden sm:block">Design Your Own Wellness Product</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1 bg-emerald-50/70 p-1.5 rounded-full border border-emerald-100/80">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'home'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-emerald-700 hover:text-emerald-900 hover:bg-white/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('assessment')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'assessment'
                  ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                  : 'text-emerald-800 hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              Design Product
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'products'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-emerald-700 hover:text-emerald-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              Wellness Catalog
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-emerald-700 hover:text-emerald-900 hover:bg-white/50'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600" />
              Dashboard
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Supabase connection indicator button */}
            <button
              onClick={onOpenSupabaseGuide}
              title="Click to view Supabase database setup & SQL"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                isSupabaseLive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <Database className={`w-3.5 h-3.5 ${isSupabaseLive ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span className="hidden lg:inline">{isSupabaseLive ? 'Supabase Connected' : 'Supabase (Demo/Setup)'}</span>
              <span className="lg:hidden">SQL</span>
            </button>

            {/* User auth state */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-emerald-100/70 hover:bg-emerald-200/70 rounded-full border border-emerald-200 text-emerald-950 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {currentUser.full_name?.charAt(0) || currentUser.email.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold max-w-[110px] truncate hidden sm:inline">
                    {currentUser.full_name || currentUser.email.split('@')[0]}
                  </span>
                </button>
                <button
                  onClick={onSignOut}
                  title="Sign out"
                  className="p-2 text-emerald-700 hover:text-emerald-950 hover:bg-emerald-50 rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all hover:shadow"
              >
                <LogIn className="w-4 h-4" />
                <span>Login / Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2.5 border-t border-emerald-100/80">
          <button
            onClick={() => setActiveTab('home')}
            className={`text-xs font-medium py-1 px-3 rounded-full ${
              activeTab === 'home' ? 'bg-emerald-700 text-white font-semibold' : 'text-emerald-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('assessment')}
            className={`text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1 ${
              activeTab === 'assessment' ? 'bg-emerald-700 text-white font-semibold' : 'text-emerald-800'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            Design
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`text-xs font-medium py-1 px-3 rounded-full ${
              activeTab === 'products' ? 'bg-emerald-700 text-white font-semibold' : 'text-emerald-800'
            }`}
          >
            Catalog
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`text-xs font-medium py-1 px-3 rounded-full ${
              activeTab === 'dashboard' ? 'bg-emerald-700 text-white font-semibold' : 'text-emerald-800'
            }`}
          >
            Dashboard
          </button>
        </div>

      </div>
    </header>
  );
};
