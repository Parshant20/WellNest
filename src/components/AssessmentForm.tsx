import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Droplets, Heart, HelpCircle, ShieldAlert, Leaf } from 'lucide-react';
import { AssessmentData, UserProfile } from '../types';

interface AssessmentFormProps {
  currentUser: UserProfile | null;
  onSubmitAssessment: (assessment: Omit<AssessmentData, 'id' | 'created_at'>) => Promise<void>;
  onOpenAuth: () => void;
  isSubmitting: boolean;
}

const AGE_GROUPS = [
  { value: '16-20', label: '16–20 years', desc: 'Teenage / Early College' },
  { value: '21-30', label: '21–30 years', desc: 'Young Adult / Active' },
  { value: '31-45', label: '31–45 years', desc: 'Adult / Preventive Care' },
  { value: '46+', label: '46+ years', desc: 'Mature / Deep Nourishment' },
];

const SKIN_TYPES: { value: AssessmentData['skin_type']; label: string; desc: string; icon: string }[] = [
  { value: 'Oily', label: 'Oily Skin', desc: 'Excess shine, visible pores, prone to congestion', icon: '✨' },
  { value: 'Dry', label: 'Dry Skin', desc: 'Feels tight, flakiness, craves moisture & oils', icon: '🌾' },
  { value: 'Combination', label: 'Combination', desc: 'Oily T-zone (forehead, nose) & dry cheeks', icon: '⚖️' },
  { value: 'Sensitive', label: 'Sensitive Skin', desc: 'Easily irritated, prone to stinging or redness', icon: '🌸' },
  { value: 'Normal', label: 'Normal / Balanced', desc: 'Comfortable balance, neither too oily nor dry', icon: '🌿' },
];

const WELLNESS_GOALS: { value: AssessmentData['primary_goal']; label: string; desc: string; heroIngredient: string }[] = [
  { 
    value: 'Glowing Skin', 
    label: 'Radiant Glow & Luminosity', 
    desc: 'Fade dullness, even out tone, and restore natural sunlight radiance.',
    heroIngredient: 'Kakadu Plum (Vitamin C) & Licorice'
  },
  { 
    value: 'Acne & Blemish Control', 
    label: 'Clear Skin & Pore Purifying', 
    desc: 'Balance sebum production, clear congested pores, and calm breakouts.',
    heroIngredient: 'Organic Tea Tree & Zinc PCA'
  },
  { 
    value: 'Anti-Aging & Firming', 
    label: 'Firming & Smooth Fine Lines', 
    desc: 'Enhance elasticity, boost collagen synthesis, and smooth expression lines.',
    heroIngredient: 'Plant Bakuchiol & Copper Peptides'
  },
  { 
    value: 'Deep Hydration', 
    label: 'Deep Barrier Hydration', 
    desc: 'Replenish moisture reservoirs, banish flakiness, and lock in dewiness.',
    heroIngredient: 'Triple Hyaluronic Acid & Squalane'
  },
  { 
    value: 'Calm & Soothe Redness', 
    label: 'Soothing Redness & Recovery', 
    desc: 'Provide immediate relief from sensitivity, reactive flushing, and tightness.',
    heroIngredient: 'Centella Asiatica (Cica) & Oat'
  },
];

const BOTANICAL_BASES: { value: AssessmentData['preferred_base']; label: string; benefits: string }[] = [
  { value: 'Aloe Vera & Green Tea', label: 'Aloe Vera & Green Tea Water', benefits: 'Ultra-lightweight, antioxidant rich, balances oil' },
  { value: 'Rose Hydrosol & Chamomile', label: 'Bulgarian Rose & Chamomile Mist', benefits: 'Hydrating, softening, calms delicate capillaries' },
  { value: 'Centella & Rice Water', label: 'Tiger Grass (Cica) & Rice Water', benefits: 'Barrier repairing, brightening, ultra-soothing' },
  { value: 'Jojoba & Hyaluronic Acid', label: 'Golden Jojoba & Hyaluronic Emulsion', benefits: 'Rich moisture locking, mimics natural skin lipids' },
];

const SCENT_PROFILES: { value: AssessmentData['scent_preference']; label: string; desc: string }[] = [
  { value: 'Calming Lavender', label: 'French Lavender & Vanilla', desc: 'Relaxing, promotes sleep and nighttime destress' },
  { value: 'Fresh Citrus & Neroli', label: 'Sweet Orange & Neroli Blossom', desc: 'Energizing, uplifting mood and morning clarity' },
  { value: 'Cooling Herbal Mint', label: 'Garden Spearmint & Eucalyptus', desc: 'Crisp, refreshing, cooling sensation' },
  { value: 'Fragrance-Free (Pure)', label: '100% Fragrance-Free (Pure Extract)', desc: 'Zero essential oils; ideal for ultra-sensitive skin' },
];

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  currentUser,
  onSubmitAssessment,
  onOpenAuth,
  isSubmitting,
}) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  // Form states
  const [ageGroup, setAgeGroup] = useState<string>('21-30');
  const [skinType, setSkinType] = useState<AssessmentData['skin_type']>('Combination');
  const [primaryGoal, setPrimaryGoal] = useState<AssessmentData['primary_goal']>('Glowing Skin');
  const [stressLevel, setStressLevel] = useState<AssessmentData['stress_level']>('Moderate');
  const [hydrationGlasses, setHydrationGlasses] = useState<number>(8);
  const [preferredBase, setPreferredBase] = useState<AssessmentData['preferred_base']>('Aloe Vera & Green Tea');
  const [scentPreference, setScentPreference] = useState<AssessmentData['scent_preference']>('Calming Lavender');
  const [customProductName, setCustomProductName] = useState<string>('');

  // Default custom name generation based on goal
  const defaultName = `${currentUser?.full_name ? currentUser.full_name.split(' ')[0] + "'s" : "My"} ${primaryGoal === 'Glowing Skin' ? 'Radiant Glow Dew' : primaryGoal === 'Deep Hydration' ? 'Hydra-Infusion Nectar' : primaryGoal === 'Acne & Blemish Control' ? 'Clarifying Herbal Elixir' : primaryGoal === 'Anti-Aging & Firming' ? 'Youth Botanical Serum' : 'Calming Cica Recovery Dew'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = customProductName.trim() || defaultName;

    await onSubmitAssessment({
      age_group: ageGroup,
      skin_type: skinType,
      primary_goal: primaryGoal,
      stress_level: stressLevel,
      hydration_glasses: hydrationGlasses,
      preferred_base: preferredBase,
      scent_preference: scentPreference,
      custom_product_name: finalName
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Interactive Formulation Tool
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-['Outfit'] mt-2">
          Design Your Own Wellness Product
        </h1>
        <p className="text-sm sm:text-base text-emerald-800/80 max-w-xl mx-auto mt-2">
          Answer 4 simple questions so we can formulate a tailored wellness bottle and select ideal companion products stored safely in your profile.
        </p>

        {/* Guest Warning / Friendly Info */}
        {!currentUser && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl max-w-lg mx-auto text-xs text-amber-900 flex items-center justify-between">
            <span>You are currently in guest mode. Your assessment will be saved locally.</span>
            <button
              onClick={onOpenAuth}
              className="font-bold underline text-emerald-800 hover:text-emerald-950 ml-2"
            >
              Login with Supabase
            </button>
          </div>
        )}
      </div>

      {/* Step Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Step {step} of {totalSteps}: {
              step === 1 ? 'Age & Skin Profile' :
              step === 2 ? 'Wellness Goals & Lifestyle' :
              step === 3 ? 'Choose Botanical Ingredients' :
              'Name Your Custom Formula'
            }
          </span>
          <span className="text-xs font-semibold text-emerald-800">
            {Math.round((step / totalSteps) * 100)}% Completed
          </span>
        </div>
        <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-lg p-6 sm:p-10">
        <form onSubmit={handleSubmit}>

          {/* STEP 1: Age & Skin Type */}
          {step === 1 && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Question: Age Group */}
              <div>
                <label className="block text-base font-bold text-emerald-950 font-['Outfit'] mb-3">
                  1. Which age group describes you best?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {AGE_GROUPS.map((group) => {
                    const isSelected = ageGroup === group.value;
                    return (
                      <button
                        type="button"
                        key={group.value}
                        onClick={() => setAgeGroup(group.value)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/30'
                            : 'bg-white border-emerald-100 hover:border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-emerald-950">{group.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <span className="text-xs text-emerald-700/80">{group.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question: Skin Type */}
              <div>
                <label className="block text-base font-bold text-emerald-950 font-['Outfit'] mb-3">
                  2. What is your skin type?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SKIN_TYPES.map((type) => {
                    const isSelected = skinType === type.value;
                    return (
                      <button
                        type="button"
                        key={type.value}
                        onClick={() => setSkinType(type.value)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/30'
                            : 'bg-white border-emerald-100 hover:border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{type.icon}</span>
                            <span className="font-bold text-sm text-emerald-950">{type.label}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <p className="text-xs text-emerald-700/80 leading-snug">{type.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Wellness Goal & Lifestyle */}
          {step === 2 && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Primary Wellness Goal */}
              <div>
                <label className="block text-base font-bold text-emerald-950 font-['Outfit'] mb-1">
                  3. What is your #1 primary wellness goal?
                </label>
                <p className="text-xs text-emerald-700/80 mb-3">This drives the concentrated active ingredients chosen for your product.</p>
                <div className="space-y-2.5">
                  {WELLNESS_GOALS.map((goal) => {
                    const isSelected = primaryGoal === goal.value;
                    return (
                      <div
                        key={goal.value}
                        onClick={() => setPrimaryGoal(goal.value)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/30'
                            : 'bg-white border-emerald-100 hover:border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="font-bold text-sm text-emerald-950">{goal.label}</span>
                            <p className="text-xs text-emerald-800/80">{goal.desc}</p>
                            <span className="inline-block text-[11px] text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded-md mt-1">
                              Target Key Actives: {goal.heroIngredient}
                            </span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-emerald-300'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stress Level & Hydration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-sm font-bold text-emerald-950 mb-2">
                    Daily Stress Level:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Low', 'Moderate', 'High'] as const).map((lvl) => (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => setStressLevel(lvl)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          stressLevel === lvl
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-emerald-50/50 text-emerald-900 border-emerald-200 hover:bg-emerald-100/50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-emerald-950 mb-2">
                    Daily Water Intake (Glasses): <strong className="text-emerald-700">{hydrationGlasses} glasses</strong>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={2}
                      max={16}
                      value={hydrationGlasses}
                      onChange={(e) => setHydrationGlasses(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
                      <Droplets className="w-4 h-4" />
                      <span>{hydrationGlasses * 250} ml</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Formulation Customizer */}
          {step === 3 && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Botanical Base */}
              <div>
                <label className="block text-base font-bold text-emerald-950 font-['Outfit'] mb-1">
                  4. Select your preferred botanical base hydrosol
                </label>
                <p className="text-xs text-emerald-700/80 mb-3">The hydrating organic medium that forms the foundation of your bottle.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BOTANICAL_BASES.map((base) => {
                    const isSelected = preferredBase === base.value;
                    return (
                      <button
                        type="button"
                        key={base.value}
                        onClick={() => setPreferredBase(base.value)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/30'
                            : 'bg-white border-emerald-100 hover:border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-emerald-950">{base.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <p className="text-xs text-emerald-800/80">{base.benefits}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scent Profile */}
              <div>
                <label className="block text-base font-bold text-emerald-950 font-['Outfit'] mb-1">
                  5. Choose your natural aromatherapy scent
                </label>
                <p className="text-xs text-emerald-700/80 mb-3">Distilled from 100% natural cold-pressed botanicals or pure fragrance-free.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SCENT_PROFILES.map((scent) => {
                    const isSelected = scentPreference === scent.value;
                    return (
                      <button
                        type="button"
                        key={scent.value}
                        onClick={() => setScentPreference(scent.value)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/30'
                            : 'bg-white border-emerald-100 hover:border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-emerald-950">{scent.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <p className="text-xs text-emerald-800/80">{scent.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Name Your Product & Summary */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div>
                <label className="block text-base font-bold text-emerald-950 font-['Outfit'] mb-1">
                  6. Give your custom wellness product a name
                </label>
                <p className="text-xs text-emerald-700/80 mb-3">
                  This will be printed on your digital bottle label and saved to your Supabase dashboard!
                </p>
                
                <div className="relative">
                  <input
                    type="text"
                    value={customProductName}
                    onChange={(e) => setCustomProductName(e.target.value)}
                    placeholder={defaultName}
                    className="w-full px-4 py-3.5 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 text-emerald-950 text-base font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomProductName(defaultName)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-700 font-semibold bg-white px-2.5 py-1 rounded-lg border border-emerald-200 hover:bg-emerald-50"
                  >
                    Use Suggested
                  </button>
                </div>
              </div>

              {/* Recipe Summary Box */}
              <div className="bg-emerald-50/70 rounded-2xl p-6 border border-emerald-100">
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  Recipe Formulation Snapshot
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-emerald-700 block">Skin Type</span>
                    <strong className="text-emerald-950 text-sm">{skinType}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-700 block">Goal</span>
                    <strong className="text-emerald-950 text-sm">{primaryGoal}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-700 block">Hydrosol Base</span>
                    <strong className="text-emerald-950 text-sm">{preferredBase.split('&')[0]}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-700 block">Aroma</span>
                    <strong className="text-emerald-950 text-sm">{scentPreference.split('&')[0]}</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Form Navigation Controls */}
          <div className="mt-10 pt-6 border-t border-emerald-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-emerald-200 text-emerald-900 text-sm font-semibold hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-md transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-base font-bold shadow-lg shadow-emerald-800/20 hover:shadow-emerald-800/30 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5 text-emerald-300" />
                <span>{isSubmitting ? 'Formulating & Saving...' : 'Generate My Custom Product'}</span>
              </button>
            )}
          </div>

        </form>
      </div>

    </div>
  );
};
