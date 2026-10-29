import React, { useState } from 'react';
import { X, Copy, Check, Database, Key, Server, ExternalLink, CheckCircle2, AlertCircle, RefreshCw, Terminal } from 'lucide-react';
import { SUPABASE_SQL_CODE, SETUP_STEPS } from '../data/supabaseSql';
import { 
  getActiveSupabaseCredentials, 
  saveCustomCredentials, 
  clearCustomCredentials, 
  testConnection 
} from '../lib/supabase';

interface SupabaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCredentialsChanged: () => void;
}

export const SupabaseGuideModal: React.FC<SupabaseGuideModalProps> = ({
  isOpen,
  onClose,
  onCredentialsChanged,
}) => {
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState<'instructions' | 'sql' | 'credentials'>('instructions');

  const credentials = getActiveSupabaseCredentials();
  const [supabaseUrl, setSupabaseUrl] = useState(credentials.url || '');
  const [supabaseKey, setSupabaseKey] = useState(credentials.key || '');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_CODE);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl || !supabaseKey) {
      setSaveMessage('Please provide both Project URL and Anon API Key.');
      return;
    }
    saveCustomCredentials(supabaseUrl, supabaseKey);
    setSaveMessage('Credentials saved successfully in browser memory!');
    onCredentialsChanged();
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleClearCredentials = () => {
    clearCustomCredentials();
    setSupabaseUrl('');
    setSupabaseKey('');
    setTestResult(null);
    setSaveMessage('Reverted to out-of-the-box local demo mode.');
    onCredentialsChanged();
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleRunTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testConnection();
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err?.message || 'Connection failed' });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-emerald-950/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-emerald-100 shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Database className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-['Outfit']">Supabase Database & Backend Guide</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 border border-emerald-500 uppercase">
                  BCA Project Specs
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Modern PostgreSQL backend replacing PHP, MySQL, and XAMPP.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-emerald-100 bg-emerald-50/50 px-6">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'instructions'
                ? 'border-emerald-700 text-emerald-950 bg-white'
                : 'border-transparent text-emerald-700 hover:text-emerald-900'
            }`}
          >
            Setup Instructions (4 Steps)
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sql'
                ? 'border-emerald-700 text-emerald-950 bg-white'
                : 'border-transparent text-emerald-700 hover:text-emerald-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>Database SQL Code (Tables & RLS)</span>
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'credentials'
                ? 'border-emerald-700 text-emerald-950 bg-white'
                : 'border-transparent text-emerald-700 hover:text-emerald-900'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live Connection & Keys</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Instructions */}
          {activeTab === 'instructions' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <p className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Why Supabase for this BCA Minor Project?
                </p>
                <p className="text-emerald-800 leading-relaxed">
                  Traditional web setups required Apache, PHP, and local XAMPP servers that often failed to run on evaluation computers. WellNest uses Supabase (PostgreSQL in the cloud), providing instant JWT Authentication, automatic REST APIs, and Row Level Security (RLS) directly in the browser!
                </p>
              </div>

              <div className="space-y-4">
                {SETUP_STEPS.map((step) => (
                  <div 
                    key={step.step}
                    className="p-4 rounded-2xl border border-emerald-100 bg-white shadow-xs flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 font-['Outfit']">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">{step.title}</h4>
                      <p className="text-xs text-emerald-800/85 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('sql')}
                  className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: View SQL Code</span>
                  <Terminal className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SQL Script */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-emerald-950">Complete Supabase PostgreSQL Script</h3>
                  <p className="text-xs text-emerald-700">Creates profiles, assessments, products tables and sample rows.</p>
                </div>
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 overflow-x-auto text-emerald-300 font-mono text-xs leading-relaxed max-h-96">
                <pre>{SUPABASE_SQL_CODE}</pre>
              </div>

              <p className="text-[11px] text-emerald-700">
                Tip: Also saved in your project root as <code>/supabase-schema.sql</code> for viva/examiner presentation!
              </p>
            </div>
          )}

          {/* TAB 3: Credentials & Live Connection */}
          {activeTab === 'credentials' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                  Active Connection Status
                </h4>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${credentials.isConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-xs font-semibold text-emerald-900">
                    {credentials.isConfigured
                      ? `Connected to Supabase (${credentials.isCustom ? 'Custom Browser Keys' : 'Environment Variables'})`
                      : 'Running in Zero-Setup Offline Demo Mode'}
                  </span>
                </div>
              </div>

              {saveMessage && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-medium border border-emerald-200">
                  {saveMessage}
                </div>
              )}

              <form onSubmit={handleSaveCredentials} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">
                    Supabase Project URL (VITE_SUPABASE_URL)
                  </label>
                  <input
                    type="url"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://your-project-id.supabase.co"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">
                    Supabase Anon Public API Key (VITE_SUPABASE_ANON_KEY)
                  </label>
                  <input
                    type="password"
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                  <span className="text-[10px] text-emerald-700 mt-0.5 block">
                    Found in Supabase Dashboard &rarr; Project Settings &rarr; API. Safe for client-side use.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Save & Connect
                  </button>

                  <button
                    type="button"
                    onClick={handleRunTest}
                    disabled={isTesting}
                    className="px-4 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                  </button>

                  {credentials.isCustom && (
                    <button
                      type="button"
                      onClick={handleClearCredentials}
                      className="px-3.5 py-2.5 rounded-xl text-rose-700 hover:bg-rose-50 text-xs font-medium transition-colors"
                    >
                      Reset to Demo
                    </button>
                  )}
                </div>
              </form>

              {/* Test Result Feedback */}
              {testResult && (
                <div className={`p-4 rounded-2xl border text-xs ${
                  testResult.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{testResult.success ? 'Supabase Connection Verified!' : 'Connection Check Failed'}</span>
                  </div>
                  <p>{testResult.message}</p>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
          <span>WellNest &bull; BCA Minor Project Submission</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white hover:bg-emerald-100 border border-emerald-200 font-semibold text-emerald-900 transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
