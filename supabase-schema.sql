-- ========================================================
-- WellNest Wellness Website Database Schema
-- Suitable for BCA Minor Project (Supabase / PostgreSQL)
-- ========================================================

-- 1. Create PROFILES table to store user details linked to Supabase Auth
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) for Profiles
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Users can view their own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update their own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

create policy "Users can insert their own profile" 
  on public.profiles for insert 
  with check (auth.uid() = id);

-- 2. Create ASSESSMENTS table to store wellness assessments
create table if not exists public.assessments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  age_group text not null,
  skin_type text not null,
  primary_goal text not null,
  stress_level text not null,
  hydration_glasses integer default 8,
  preferred_base text not null,
  scent_preference text not null,
  custom_product_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security for Assessments
alter table public.assessments enable row level security;

-- Policies for Assessments
create policy "Users can read own assessments" 
  on public.assessments for select 
  using (auth.uid() = user_id);

create policy "Users can insert own assessments" 
  on public.assessments for insert 
  with check (auth.uid() = user_id);

create policy "Users can delete own assessments" 
  on public.assessments for delete 
  using (auth.uid() = user_id);

-- 3. Create PRODUCTS table to store wellness product catalog
create table if not exists public.products (
  id text primary key,
  title text not null,
  category text not null,
  target_skin text[] not null,
  target_goal text[] not null,
  description text not null,
  key_ingredients text[] not null,
  benefits text[] not null,
  usage text not null,
  image_url text not null,
  price numeric(10, 2) not null default 0,
  rating numeric(3, 1) not null default 5.0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security for Products
alter table public.products enable row level security;

-- Anyone can view products (public read access)
create policy "Allow public read access to products" 
  on public.products for select 
  using (true);

-- 4. Seed initial wellness products
insert into public.products (id, title, category, target_skin, target_goal, description, key_ingredients, benefits, usage, image_url, price, rating)
values
  ('prod-1', 'Matcha & Niacinamide Clarifying Elixir', 'Serums', array['Oily', 'Combination'], array['Acne & Blemish Control', 'Glowing Skin'], 'A light, fast-absorbing botanical serum with ceremonial matcha and 5% niacinamide.', array['Japanese Matcha Extract', 'Niacinamide (Vitamin B3)', 'Zinc PCA', 'Aloe Leaf Juice'], array['Reduces excess shine', 'Tightens enlarged pores', 'Calms visible redness'], 'Dispense 3-4 drops onto cleansed skin morning and evening.', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', 24.00, 4.8),
  ('prod-2', 'Rose Damascena Dew Drop Hydrator', 'Toners & Mists', array['Dry', 'Sensitive', 'Normal'], array['Deep Hydration', 'Glowing Skin', 'Calm & Soothe Redness'], 'Pure organic Bulgarian rose water steam-distilled and enriched with multimolecular hyaluronic acid.', array['Organic Rose Hydrosol', 'Triple Hyaluronic Acid', 'Glycerin', 'White Tea Extract'], array['Instantly quenches parched skin', 'Restores natural moisture barrier', 'Imparts fresh dewy radiance'], 'Spritz over face after cleansing or throughout the day.', 'https://images.unsplash.com/photo-1608248597359-00994ef08fbb?auto=format&fit=crop&w=800&q=80', 19.00, 4.9),
  ('prod-3', 'Centella Asiatica Cica Recovery Balm', 'Moisturizers', array['Sensitive', 'Dry', 'Combination'], array['Calm & Soothe Redness', 'Deep Hydration'], 'A deeply comforting barrier cream powered by Madagascar Tiger Grass and ceramides.', array['Centella Asiatica Extract', 'Ceramide NP', 'Madecassoside', 'Shea Butter'], array['Soothes stinging and irritation', 'Fortifies compromised lipid barrier', 'Hypoallergenic'], 'Smooth a dime-sized amount gently over face and neck as final step.', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', 28.00, 4.9),
  ('prod-4', 'Bakuchiol & Golden Jojoba Youth Nectar', 'Serums', array['Dry', 'Normal', 'Combination'], array['Anti-Aging & Firming', 'Glowing Skin'], 'A gentle 100% natural plant alternative to retinol with babchi seed bakuchiol.', array['Bakuchiol 1.5%', 'Cold-Pressed Golden Jojoba', 'Rosehip Seed Oil', 'Vitamin E'], array['Smooths fine lines gently', 'Non-photosensitizing for day wear', 'Fades dullness for glowing skin'], 'Warm 2-3 drops between palms and gently press onto damp skin at night.', 'https://images.unsplash.com/photo-1608248597316-2b4742a03e19?auto=format&fit=crop&w=800&q=80', 34.00, 4.7),
  ('prod-5', 'Gentle Chamomile & Oat Cloud Cleanser', 'Cleansers', array['All', 'Sensitive', 'Dry', 'Normal'], array['Calm & Soothe Redness', 'Deep Hydration'], 'A sulfate-free, pH-balanced milky gel that cleanses without stripping moisture.', array['Colloidal Oat Flour', 'German Chamomile Extract', 'Coconut Glucosides', 'Calendula Oil'], array['Cleanses without stripping', 'Leaves skin silky soft and calm', 'Gentle on sensitive eyes'], 'Massage 1-2 pumps onto damp skin with lukewarm water, then rinse.', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80', 21.00, 4.8),
  ('prod-6', 'Tranquil Slumber Herbal Wellness Tea', 'Herbal Teas', array['All'], array['Calm & Soothe Redness', 'Glowing Skin'], 'An organic caffeine-free infusion of whole Egyptian chamomile flowers and lavender buds.', array['Organic Chamomile Blossoms', 'French Lavender Buds', 'Lemon Balm Leaves', 'Spearmint Leaf'], array['Encourages deep restful sleep', 'Soothes daily stress and tension', 'Promotes overnight skin repair'], 'Steep 1 tablespoon in 8 oz boiling water for 6-8 minutes before bed.', 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80', 16.00, 4.9)
on conflict (id) do nothing;

-- 5. Optional trigger to automatically create profile row on user sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, created_at, updated_at)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), now(), now());
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
