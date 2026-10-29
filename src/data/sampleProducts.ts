import { Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Matcha & Niacinamide Clarifying Elixir',
    category: 'Serums',
    target_skin: ['Oily', 'Combination'],
    target_goal: ['Acne & Blemish Control', 'Glowing Skin'],
    description: 'A light, fast-absorbing botanical serum infused with ceremonial grade Japanese matcha and 5% niacinamide to balance sebum and minimize pores.',
    key_ingredients: ['Japanese Matcha Extract', 'Niacinamide (Vitamin B3)', 'Zinc PCA', 'Organic Aloe Leaf Juice'],
    benefits: ['Reduces excess shine without stripping moisture', 'Tightens and unclogs enlarged pores', 'Calms visible redness and active flare-ups'],
    usage: 'Dispense 3-4 drops onto cleansed skin in the morning and evening before your moisturizer.',
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    price: 24,
    rating: 4.8
  },
  {
    id: 'prod-2',
    title: 'Rose Damascena Dew Drop Hydrator',
    category: 'Toners & Mists',
    target_skin: ['Dry', 'Sensitive', 'Normal'],
    target_goal: ['Deep Hydration', 'Glowing Skin', 'Calm & Soothe Redness'],
    description: 'Pure organic Bulgarian rose water steam-distilled and enriched with multimolecular hyaluronic acid to lock in dewy hydration all day.',
    key_ingredients: ['Organic Rose Damascena Hydrosol', 'Triple Hyaluronic Acid', 'Glycerin', 'White Tea Extract'],
    benefits: ['Instantly quenches parched skin', 'Restores natural skin barrier moisture', 'Imparts a fresh, rosy luminous radiance'],
    usage: 'Spritz generously over face after cleansing or throughout the day for a refreshing moisture reset.',
    image_url: 'https://images.unsplash.com/photo-1608248597359-00994ef08fbb?auto=format&fit=crop&w=800&q=80',
    price: 19,
    rating: 4.9
  },
  {
    id: 'prod-3',
    title: 'Centella Asiatica Cica Recovery Balm',
    category: 'Moisturizers',
    target_skin: ['Sensitive', 'Dry', 'Combination'],
    target_goal: ['Calm & Soothe Redness', 'Deep Hydration'],
    description: 'A deeply comforting barrier cream powered by Madagascar Tiger Grass (Centella) and ceramides to repair stressed, sensitive, or reactive skin.',
    key_ingredients: ['Centella Asiatica (Cica) Extract', 'Ceramide NP', 'Madecassoside', 'Organic Shea Butter'],
    benefits: ['Soothes stinging, irritation, and flare-ups', 'Fortifies a compromised lipid barrier', 'Hypoallergenic and non-comedogenic'],
    usage: 'Smooth a dime-sized amount gently over face and neck morning and night as the final step.',
    image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    price: 28,
    rating: 4.9
  },
  {
    id: 'prod-4',
    title: 'Bakuchiol & Golden Jojoba Youth Nectar',
    category: 'Serums',
    target_skin: ['Dry', 'Normal', 'Combination'],
    target_goal: ['Anti-Aging & Firming', 'Glowing Skin'],
    description: 'A gentle, 100% natural plant alternative to retinol formulated with babchi seed bakuchiol and cold-pressed cold jojoba oil.',
    key_ingredients: ['Bakuchiol 1.5%', 'Cold-Pressed Golden Jojoba', 'Rosehip Seed Oil', 'Vitamin E (Tocopherol)'],
    benefits: ['Smooths fine lines and supports skin elasticity', 'Non-photosensitizing — safe for daytime wear', 'Fades dullness for a natural sunlit glow'],
    usage: 'Warm 2-3 drops between palms and gently press onto slightly damp skin at night.',
    image_url: 'https://images.unsplash.com/photo-1608248597316-2b4742a03e19?auto=format&fit=crop&w=800&q=80',
    price: 34,
    rating: 4.7
  },
  {
    id: 'prod-5',
    title: 'Gentle Chamomile & Oat Cloud Cleanser',
    category: 'Cleansers',
    target_skin: ['All', 'Sensitive', 'Dry', 'Normal'],
    target_goal: ['Calm & Soothe Redness', 'Deep Hydration'],
    description: 'A sulfate-free, pH-balanced milky gel that dissolves impurities and environmental pollutants while honoring your skin microbiome.',
    key_ingredients: ['Colloidal Oat Flour', 'German Chamomile Extract', 'Coconut-derived Glucosides', 'Calendula Oil'],
    benefits: ['Cleanses deeply without stripping or tightness', 'Leaves skin silky soft, supple, and calm', 'Safe for sensitive skin and eye contours'],
    usage: 'Massage 1-2 pumps onto damp skin with lukewarm water in circular motions, then rinse thoroughly.',
    image_url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    price: 21,
    rating: 4.8
  },
  {
    id: 'prod-6',
    title: 'Tranquil Slumber Herbal Wellness Tea',
    category: 'Herbal Teas',
    target_skin: ['All'],
    target_goal: ['Calm & Soothe Redness', 'Glowing Skin'],
    description: 'An organic caffeine-free infusion of whole Egyptian chamomile flowers, lavender buds, and lemon balm crafted to ease mind and promote restorative beauty sleep.',
    key_ingredients: ['Organic Chamomile Blossoms', 'French Lavender Buds', 'Lemon Balm Leaves', 'Spearmint Leaf'],
    benefits: ['Encourages deep, uninterrupted sleep', 'Soothes daily oxidative stress and tension', 'Promotes cellular overnight rejuvenation'],
    usage: 'Steep 1 tablespoon in 8 oz boiling water for 6-8 minutes. Enjoy 30 minutes before bedtime.',
    image_url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    price: 16,
    rating: 4.9
  }
];
