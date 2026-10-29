export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AssessmentData {
  id?: string;
  user_id?: string;
  age_group: string;
  skin_type: 'Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'Normal';
  primary_goal: 'Glowing Skin' | 'Acne & Blemish Control' | 'Anti-Aging & Firming' | 'Deep Hydration' | 'Calm & Soothe Redness';
  stress_level: 'Low' | 'Moderate' | 'High';
  hydration_glasses: number;
  preferred_base: 'Aloe Vera & Green Tea' | 'Rose Hydrosol & Chamomile' | 'Centella & Rice Water' | 'Jojoba & Hyaluronic Acid';
  scent_preference: 'Calming Lavender' | 'Fresh Citrus & Neroli' | 'Cooling Herbal Mint' | 'Fragrance-Free (Pure)';
  custom_product_name: string;
  created_at?: string;
}

export interface Product {
  id: string;
  title: string;
  category: 'Serums' | 'Moisturizers' | 'Cleansers' | 'Toners & Mists' | 'Herbal Teas';
  target_skin: ('All' | 'Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'Normal')[];
  target_goal: string[];
  description: string;
  key_ingredients: string[];
  benefits: string[];
  usage: string;
  image_url: string;
  price: number;
  rating: number;
}

export interface CustomFormula {
  name: string;
  batch_id: string;
  skin_type: string;
  primary_goal: string;
  base_extract: string;
  active_botanicals: string[];
  scent_profile: string;
  match_score: number;
  directions: string;
  frequency: string;
}
