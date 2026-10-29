import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile, AssessmentData, Product, CustomFormula } from '../types';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';

const STORAGE_KEY_URL = 'wellnest_custom_supabase_url';
const STORAGE_KEY_KEY = 'wellnest_custom_supabase_key';
const STORAGE_KEY_LOCAL_USER = 'wellnest_demo_user';
const STORAGE_KEY_LOCAL_ASSESSMENTS = 'wellnest_demo_assessments';

// Helper to get active credentials
export const getActiveSupabaseCredentials = () => {
  const customUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_URL) : null;
  const customKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_KEY) : null;

  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const url = customUrl || envUrl;
  const key = customKey || envKey;

  const isConfigured = Boolean(
    url &&
    key &&
    url !== 'https://your-project-id.supabase.co' &&
    key !== 'your-anon-public-key' &&
    url.startsWith('https://')
  );

  return {
    url: url || '',
    key: key || '',
    isConfigured,
    isCustom: Boolean(customUrl && customKey)
  };
};

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, key, isConfigured } = getActiveSupabaseCredentials();
  if (!isConfigured) return null;

  try {
    if (!supabaseInstance) {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
    }
    return supabaseInstance;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
};

export const resetSupabaseClient = () => {
  supabaseInstance = null;
};

export const saveCustomCredentials = (url: string, key: string) => {
  localStorage.setItem(STORAGE_KEY_URL, url.trim());
  localStorage.setItem(STORAGE_KEY_KEY, key.trim());
  resetSupabaseClient();
};

export const clearCustomCredentials = () => {
  localStorage.removeItem(STORAGE_KEY_URL);
  localStorage.removeItem(STORAGE_KEY_KEY);
  resetSupabaseClient();
};

export const testConnection = async (): Promise<{ success: boolean; message: string }> => {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase URL or Anon key is missing or placeholder.' };
  }
  try {
    // Attempt a light ping by querying products
    const { error } = await client.from('products').select('id').limit(1);
    if (error) {
      // If table doesn't exist yet, it's connected but needs SQL
      if (error.code === '42P01') {
        return { success: true, message: 'Connected to Supabase! (Note: Remember to run the SQL schema to create the tables).' };
      }
      return { success: false, message: `Connected, but received error: ${error.message}` };
    }
    return { success: true, message: 'Successfully connected to your Supabase project & database!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Connection failed' };
  }
};

// ==========================================
// Authentication APIs (Supabase + Demo Mode)
// ==========================================

export const signUpUser = async (email: string, password: string, fullName: string = ''): Promise<{ user: UserProfile | null; error: string | null }> => {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || email.split('@')[0]
        }
      }
    });

    if (error) return { user: null, error: error.message };
    if (!data.user) return { user: null, error: 'Registration succeeded, check confirmation email or log in.' };

    const profile: UserProfile = {
      id: data.user.id,
      email: data.user.email || email,
      full_name: fullName || email.split('@')[0],
      created_at: new Date().toISOString()
    };

    // Try inserting into public.profiles
    try {
      await client.from('profiles').upsert({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        updated_at: new Date().toISOString()
      });
    } catch {
      // Ignore if trigger handled it or table not ready
    }

    return { user: profile, error: null };
  }

  // Demo fallback mode (instant local account)
  const demoUser: UserProfile = {
    id: 'demo-' + Date.now(),
    email,
    full_name: fullName || email.split('@')[0],
    created_at: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY_LOCAL_USER, JSON.stringify(demoUser));
  return { user: demoUser, error: null };
};

export const signInUser = async (email: string, password: string): Promise<{ user: UserProfile | null; error: string | null }> => {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (error) return { user: null, error: error.message };
    if (!data.user) return { user: null, error: 'No user data returned from login.' };

    const profile: UserProfile = {
      id: data.user.id,
      email: data.user.email || email,
      full_name: data.user.user_metadata?.full_name || email.split('@')[0],
      created_at: data.user.created_at
    };

    return { user: profile, error: null };
  }

  // Demo fallback mode
  const demoUser: UserProfile = {
    id: 'demo-user-123',
    email,
    full_name: email.split('@')[0] || 'Demo Student',
    created_at: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY_LOCAL_USER, JSON.stringify(demoUser));
  return { user: demoUser, error: null };
};

export const signInDemoStudent = (): UserProfile => {
  const demoUser: UserProfile = {
    id: 'demo-bca-student-01',
    email: 'student.wellnest@demo.edu',
    full_name: 'Aarav Sharma (BCA Project)',
    created_at: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY_LOCAL_USER, JSON.stringify(demoUser));
  return demoUser;
};

export const signOutUser = async (): Promise<void> => {
  const client = getSupabaseClient();
  if (client) {
    await client.auth.signOut();
  }
  localStorage.removeItem(STORAGE_KEY_LOCAL_USER);
};

export const getCurrentUser = async (): Promise<UserProfile | null> => {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data: { user } } = await client.auth.getUser();
      if (user) {
        return {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          created_at: user.created_at
        };
      }
    } catch (err) {
      console.warn('Error fetching Supabase user:', err);
    }
  }

  // Check demo user
  const stored = localStorage.getItem(STORAGE_KEY_LOCAL_USER);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

// ==========================================
// Product Catalog & Recommendations
// ==========================================

export const fetchProducts = async (): Promise<Product[]> => {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client.from('products').select('*');
      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    } catch (err) {
      console.warn('Could not load products from Supabase, using sample dataset:', err);
    }
  }

  return SAMPLE_PRODUCTS;
};

// ==========================================
// Assessment Storage & Retrieval
// ==========================================

export const saveAssessmentToDatabase = async (
  assessment: Omit<AssessmentData, 'id' | 'created_at'>,
  userId: string
): Promise<{ data: AssessmentData | null; error: string | null }> => {
  const client = getSupabaseClient();
  const newRecord: AssessmentData = {
    ...assessment,
    id: 'asm-' + Math.random().toString(36).substring(2, 9),
    user_id: userId,
    created_at: new Date().toISOString()
  };

  if (client) {
    try {
      const { data, error } = await client
        .from('assessments')
        .insert([{
          user_id: userId,
          age_group: assessment.age_group,
          skin_type: assessment.skin_type,
          primary_goal: assessment.primary_goal,
          stress_level: assessment.stress_level,
          hydration_glasses: assessment.hydration_glasses,
          preferred_base: assessment.preferred_base,
          scent_preference: assessment.scent_preference,
          custom_product_name: assessment.custom_product_name
        }])
        .select()
        .single();

      if (error) {
        console.warn('Supabase assessment insert failed, storing locally:', error.message);
      } else if (data) {
        return { data: data as AssessmentData, error: null };
      }
    } catch (err: any) {
      console.warn('Error saving assessment to Supabase:', err);
    }
  }

  // Store in LocalStorage fallback
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY_LOCAL_ASSESSMENTS);
    const existing: AssessmentData[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updated = [newRecord, ...existing];
    localStorage.setItem(STORAGE_KEY_LOCAL_ASSESSMENTS, JSON.stringify(updated));
    return { data: newRecord, error: null };
  } catch (err: any) {
    return { data: newRecord, error: null };
  }
};

export const fetchUserAssessments = async (userId: string): Promise<AssessmentData[]> => {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client
        .from('assessments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as AssessmentData[];
      }
    } catch (err) {
      console.warn('Failed to fetch assessments from Supabase:', err);
    }
  }

  // Check demo localStorage
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY_LOCAL_ASSESSMENTS);
    if (existingRaw) {
      const parsed: AssessmentData[] = JSON.parse(existingRaw);
      return parsed.filter(a => a.user_id === userId || !a.user_id);
    }
  } catch {
    // fallback
  }

  return [];
};

// ==========================================
// Custom Formulation Algorithm
// ==========================================

export const calculateCustomFormula = (assessment: AssessmentData): CustomFormula => {
  const botanicalsMap: Record<string, string[]> = {
    'Glowing Skin': ['Kakadu Plum (Vitamin C)', 'Organic Licorice Root', 'Gold Jojoba Lipids', 'Ginseng Extract'],
    'Acne & Blemish Control': ['Salicylic Willow Bark', 'Tea Tree Leaf Distillate', 'Zinc PCA', 'Blue Tansy Oil'],
    'Anti-Aging & Firming': ['Plant Bakuchiol 1.5%', 'Copper Peptides', 'Sea Kelp Bioferment', 'CoQ10'],
    'Deep Hydration': ['Multimolecular Hyaluronic Acid', 'Snow Mushroom Extract', 'Plant Squalane', 'Ceramide NP'],
    'Calm & Soothe Redness': ['Madecassoside (Tiger Grass)', 'German Blue Chamomile', 'Colloidal Oat Lipids', 'Calendula Flower']
  };

  const activeBotanicals = botanicalsMap[assessment.primary_goal] || [
    'Organic Aloe Vera',
    'Green Tea Bioflavonoids',
    'Hyaluronic Acid'
  ];

  // Calculate dynamic batch number
  const prefix = assessment.skin_type.substring(0, 2).toUpperCase();
  const code = Math.floor(1000 + Math.random() * 9000);
  const batch_id = `WN-${prefix}-${code}`;

  let routineFrequency = 'Apply 3-4 drops morning and night';
  if (assessment.skin_type === 'Sensitive') {
    routineFrequency = 'Apply 2-3 drops at night; increase to twice daily after patch test';
  } else if (assessment.skin_type === 'Oily') {
    routineFrequency = 'Apply 2-3 drops morning and night onto slightly damp skin';
  }

  return {
    name: assessment.custom_product_name || `${assessment.skin_type} Botanical Infusion`,
    batch_id,
    skin_type: assessment.skin_type,
    primary_goal: assessment.primary_goal,
    base_extract: assessment.preferred_base,
    active_botanicals: activeBotanicals,
    scent_profile: assessment.scent_preference,
    match_score: 98,
    directions: `Gently press 3 to 4 drops into clean face and décolletage. Follow with moisturizer to seal active botanical hydration.`,
    frequency: routineFrequency
  };
};

export const filterRecommendedProducts = (products: Product[], assessment: AssessmentData): Product[] => {
  return products.filter(product => {
    const matchesSkin = product.target_skin.includes('All') || product.target_skin.includes(assessment.skin_type);
    const matchesGoal = product.target_goal.includes(assessment.primary_goal);
    return matchesSkin || matchesGoal;
  });
};
