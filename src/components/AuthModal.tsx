import React, { useState } from 'react';
import { X, Mail, Lock, User, Leaf, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { signInUser, signUpUser, signInDemoStudent, getActiveSupabaseCredentials } from '../lib/supabase';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const { isConfigured } = getActiveSupabaseCredentials();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const { user, error } = await signUpUser(email, password, fullName);
        if (error) {
          setErrorMessage(error);
        } else if (user) {
          setSuccessMessage('Account registered successfully!');
          setTimeout(() => {
            onAuthSuccess(user);
            onClose();
          }, 800);
        }
      } else {
        const { user, error } = await signInUser(email, password);
        if (error) {
          setErrorMessage(error);
        } else if (user) {
          onAuthSuccess(user);
          onClose();
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUser = signInDemoStudent();
    onAuthSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-emerald-950/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full border border-emerald-100 shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Modal Header */}
        <div className="bg-emerald-50/70 p-6 border-b border-emerald-100 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-emerald-700 hover:text-emerald-950 hover:bg-emerald-100/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-emerald-950 font-['Outfit']">WellNest Auth</span>
          </div>

          <p className="text-xs text-emerald-800/80">
            {mode === 'signin'
              ? 'Log in to view your custom formulas and assessment history.'
              : 'Create a new wellness account powered by Supabase Auth.'}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-lg border border-emerald-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isConfigured ? 'Live Supabase Auth Active' : 'Supabase Demo Auth Active (No setup needed to test)'}</span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-emerald-100">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMessage(null); }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              mode === 'signin'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-emerald-600/70 bg-emerald-50/30 hover:text-emerald-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMessage(null); }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              mode === 'signup'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-emerald-600/70 bg-emerald-50/30 hover:text-emerald-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-emerald-50/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.edu"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-emerald-50/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-emerald-50/30"
                />
              </div>
              <span className="text-[10px] text-emerald-600 mt-0.5 block">Minimum 6 characters</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create My Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Option for evaluators */}
          <div className="pt-3 border-t border-emerald-100 text-center">
            <p className="text-[11px] text-emerald-700/80 mb-2">
              Evaluating the project? Use one-click student login:
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Instant Demo Account (1-Click)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
