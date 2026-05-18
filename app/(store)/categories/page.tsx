import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import PageHero from '@/components/PageHero';

export const revalidate = 0; // Ensure fresh data on every visit

export default async function CategoriesPage() {
  const { data: categoriesData } = await supabase
    .from('categories')
    .select(`
      id,
      name,
      slug,
      description,
      image_url,
      position
    `)
    .eq('status', 'active')
    .order('position', { ascending: true });

  // Palette to cycle through for visual variety since DB doesn't have colors.
  // All gradients now stay within the warm bronze/caramel/gold family so the
  // category grid feels cohesive with the rest of the site.
  const palette = [
    { color: 'from-[#bd956a] to-[#8e623b]', icon: 'ri-store-2-line' },
    { color: 'from-[#c3b19b] to-[#8e623b]', icon: 'ri-shopping-bag-3-line' },
    { color: 'from-[#d4af37] to-[#8e623b]', icon: 'ri-t-shirt-line' },
    { color: 'from-[#bd956a] to-[#5e3f1f]', icon: 'ri-home-smile-line' },
    { color: 'from-[#d4af37] to-[#bd956a]', icon: 'ri-heart-line' },
    { color: 'from-[#8e623b] to-[#5e3f1f]', icon: 'ri-star-smile-line' },
  ];

  const categories = categoriesData?.map((c, i) => {
    const style = palette[i % palette.length];
    return {
      ...c,
      image: c.image_url || 'https://via.placeholder.com/600x400?text=Category',
      color: style.color,
      icon: style.icon,
      // Optional: Fetch product count if needed, currently skipping for performance/simplicity
      productCount: 'Browse',
    };
  }) || [];

  return (
    <div className="min-h-screen bg-brand-cream">
      <PageHero
        title="Shop by Category"
        subtitle="Browse our jewelry categories"
        backgroundImage="/page-hero-4.png"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group bg-brand-cream border border-brand-taupe/40 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-2xl hover:border-brand-caramel transition-all cursor-pointer"
              >
                <div className="relative h-28 sm:h-40 md:h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                </div>
                <div className="p-3 sm:p-5 md:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <i className={`${category.icon} text-base sm:text-xl md:text-2xl text-brand-cream`}></i>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-brand-ink truncate">{category.name}</h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-brand-ink/50">Collection</p>
                    </div>
                  </div>
                  <p className="text-brand-ink/70 leading-relaxed text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">
                    {category.description || 'Explore our exclusive collection in this category.'}
                  </p>
                  <div className="flex items-center text-brand-bronze font-medium text-xs sm:text-sm group-hover:gap-2 transition-all">
                    <span>Browse</span>
                    <i className="ri-arrow-right-line ml-1.5 sm:ml-2"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-ice rounded-xl">
            <i className="ri-inbox-line text-5xl text-brand-taupe mb-4"></i>
            <p className="text-xl text-brand-ink/60">No categories found.</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-brand-caramel to-brand-bronze py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-cream mb-3 sm:mb-4">Can&apos;t Find What You&apos;re Looking For?</h2>
          <p className="text-base sm:text-lg md:text-xl text-brand-cream/90 mb-6 sm:mb-8 leading-relaxed">
            Try our advanced search or contact our team for personalised product recommendations
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-brand-cream text-brand-bronze px-5 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base hover:bg-white transition-colors whitespace-nowrap"
            >
              <i className="ri-search-line"></i>
              Search All Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-bronze text-brand-cream border border-brand-cream/30 px-5 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base hover:bg-[#5e3f1f] transition-colors whitespace-nowrap"
            >
              <i className="ri-customer-service-line"></i>
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
