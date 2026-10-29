import React, { useState } from 'react';
import { Product, AssessmentData } from '../types';
import { Star, Droplets, Leaf, Filter, Check, X, Sparkles, ShoppingBag } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  currentAssessment?: AssessmentData | null;
  onSelectProduct?: (product: Product) => void;
  onTakeAssessment?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currentAssessment,
  onTakeAssessment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkinFilter, setSelectedSkinFilter] = useState<string>('All');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Toners & Mists', 'Herbal Teas'];
  const skinFilters = ['All', 'Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSkin = selectedSkinFilter === 'All' || p.target_skin.includes('All') || p.target_skin.includes(selectedSkinFilter as any);
    return matchCat && matchSkin;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title & Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            Botanical Formulations
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-['Outfit'] mt-2">
            Wellness Product Catalog
          </h1>
          <p className="text-sm text-emerald-800/80 mt-1 max-w-xl">
            Explore 100% clean, non-toxic wellness creations. Each formula is powered by active plant botanicals and certified organic extracts.
          </p>
        </div>

        {currentAssessment && (
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="text-xs">
              <span className="text-emerald-700 block">Matched to your profile:</span>
              <strong className="text-emerald-950">{currentAssessment.skin_type} Skin &bull; {currentAssessment.primary_goal}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-xs mb-8 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider mr-1 hidden lg:inline">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skin Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-900">Skin Filter:</span>
            <select
              value={selectedSkinFilter}
              onChange={(e) => setSelectedSkinFilter(e.target.value)}
              className="text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {skinFilters.map((skin) => (
                <option key={skin} value={skin}>
                  {skin === 'All' ? 'All Skin Types' : `${skin} Skin`}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isRecommended = currentAssessment && (
            product.target_skin.includes('All') || 
            product.target_skin.includes(currentAssessment.skin_type) ||
            product.target_goal.includes(currentAssessment.primary_goal)
          );

          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-emerald-100/90 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col overflow-hidden group"
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden bg-emerald-50">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-900 text-[11px] font-bold shadow-xs">
                    {product.category}
                  </span>
                  {isRecommended && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-bold shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-300" />
                      Personal Match
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-950 text-xs font-bold shadow-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-emerald-950 font-['Outfit'] mb-1.5 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-emerald-800/80 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Target skin pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.target_skin.map((t, i) => (
                      <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Price & Action */}
                <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-emerald-700 block">Formulation Price</span>
                    <span className="text-lg font-bold text-emerald-950 font-['Outfit']">${product.price}</span>
                  </div>

                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-700 text-emerald-900 hover:text-white text-xs font-bold transition-all border border-emerald-200 hover:border-emerald-700 cursor-pointer"
                  >
                    View Formula & Ingredients
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-emerald-100 p-8">
          <Leaf className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-emerald-950">No products found for this filter</h3>
          <p className="text-xs text-emerald-700 mt-1">Try resetting the category or skin type filter above.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedSkinFilter('All'); }}
            className="mt-4 px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 bg-emerald-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-emerald-100 shadow-2xl p-6 sm:p-8 animate-fadeIn">
            
            <div className="flex items-start justify-between pb-4 border-b border-emerald-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{activeModalProduct.category}</span>
                <h2 className="text-2xl font-bold text-emerald-950 font-['Outfit'] mt-1">{activeModalProduct.title}</h2>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="p-2 rounded-full text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-6 space-y-6">
              <div className="h-56 rounded-2xl overflow-hidden bg-emerald-50">
                <img
                  src={activeModalProduct.image_url}
                  alt={activeModalProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">About This Formulation</h4>
                <p className="text-sm text-emerald-900/80 leading-relaxed">{activeModalProduct.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">Key Active Ingredients</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalProduct.key_ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-medium text-emerald-950">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">Proven Wellness Benefits</h4>
                <ul className="space-y-1.5">
                  {activeModalProduct.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-emerald-900">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-950">How to Use in Your Daily Routine</h4>
                <p className="text-xs text-teal-900/90 mt-1 leading-relaxed">{activeModalProduct.usage}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xl font-bold text-emerald-950 font-['Outfit']">${activeModalProduct.price}</span>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
