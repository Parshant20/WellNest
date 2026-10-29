/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AssessmentForm } from './components/AssessmentForm';
import { ProductCatalog } from './components/ProductCatalog';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { SupabaseGuideModal } from './components/SupabaseGuideModal';
import { Footer } from './components/Footer';

import {
  getCurrentUser,
  signOutUser,
  fetchProducts,
  fetchUserAssessments,
  saveAssessmentToDatabase,
  calculateCustomFormula,
  getActiveSupabaseCredentials
} from './lib/supabase';

import { UserProfile, AssessmentData, Product, CustomFormula } from './types';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'assessment' | 'products' | 'dashboard'>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [currentFormula, setCurrentFormula] = useState<CustomFormula | null>(null);

  // Modals & status
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSupabaseGuideOpen, setIsSupabaseGuideOpen] = useState(false);
  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info'; text: string } | null>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  // Supabase state
  const { isConfigured: isSupabaseLive } = getActiveSupabaseCredentials();

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load user & products on mount
  useEffect(() => {
    const initApp = async () => {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
        loadAssessments(user.id);
      } else {
        // Check if there are local demo assessments
        loadAssessments('demo-user');
      }

      const prods = await fetchProducts();
      setProducts(prods);
    };

    initApp();
  }, []);

  const loadAssessments = async (userId: string) => {
    setIsLoadingDashboard(true);
    try {
      const userAssessments = await fetchUserAssessments(userId);
      setAssessments(userAssessments);
      if (userAssessments.length > 0) {
        const formula = calculateCustomFormula(userAssessments[0]);
        setCurrentFormula(formula);
      }
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
    setAssessments([]);
    setCurrentFormula(null);
    showToast('Signed out successfully', 'info');
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    loadAssessments(user.id);
    showToast(`Welcome, ${user.full_name || user.email}!`);
  };

  const handleSubmitAssessment = async (
    data: Omit<AssessmentData, 'id' | 'created_at'>
  ) => {
    setIsSubmittingAssessment(true);
    try {
      const effectiveUserId = currentUser?.id || 'demo-guest';
      const { data: savedRecord, error } = await saveAssessmentToDatabase(data, effectiveUserId);

      if (savedRecord) {
        const updated = [savedRecord, ...assessments];
        setAssessments(updated);
        const formula = calculateCustomFormula(savedRecord);
        setCurrentFormula(formula);

        showToast('Your custom product formulation is ready!');
        setActiveTab('dashboard');
      } else if (error) {
        showToast(error, 'info');
      }
    } finally {
      setIsSubmittingAssessment(false);
    }
  };

  const handleCredentialsChanged = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
    if (user) {
      loadAssessments(user.id);
    }
    const prods = await fetchProducts();
    setProducts(prods);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7faf8] text-[#1a2e26]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-900 text-white text-xs font-semibold shadow-xl border border-emerald-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
        onOpenSupabaseGuide={() => setIsSupabaseGuideOpen(true)}
        isSupabaseLive={isSupabaseLive}
      />

      {/* Main App Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Hero
            onStartAssessment={() => setActiveTab('assessment')}
            onExploreProducts={() => setActiveTab('products')}
            onOpenGuide={() => setIsSupabaseGuideOpen(true)}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentForm
            currentUser={currentUser}
            onSubmitAssessment={handleSubmitAssessment}
            onOpenAuth={() => setIsAuthOpen(true)}
            isSubmitting={isSubmittingAssessment}
          />
        )}

        {activeTab === 'products' && (
          <ProductCatalog
            products={products}
            currentAssessment={assessments[0] || null}
            onTakeAssessment={() => setActiveTab('assessment')}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            currentUser={currentUser}
            assessments={assessments}
            products={products}
            currentFormula={currentFormula}
            onTakeAssessment={() => setActiveTab('assessment')}
            onOpenAuth={() => setIsAuthOpen(true)}
            onSelectProduct={() => setActiveTab('products')}
            isLoading={isLoadingDashboard}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenGuide={() => setIsSupabaseGuideOpen(true)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <SupabaseGuideModal
        isOpen={isSupabaseGuideOpen}
        onClose={() => setIsSupabaseGuideOpen(false)}
        onCredentialsChanged={handleCredentialsChanged}
      />

    </div>
  );
}
