import { Link } from "react-router-dom";
import { categories, getPopularProducts, getSaleProducts, products } from "@/data/mockData";
import { useStore } from "@/store/useStore";
import PromoSlider from "@/components/PromoSlider";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";

const Index = () => {
  const { viewHistory } = useStore();
  
  const popularProducts = getPopularProducts(8);
  const saleProducts = getSaleProducts(4);
  
  // Get recently viewed products
  const recentlyViewed = viewHistory
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  // Get random recommendations
  const recommendations = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  return (
    <main className="pt-20 md:pt-24">
      {/* Hero Section with Promo Slider */}
      <section className="container mx-auto px-4 mb-12">
        <PromoSlider />
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">Категории</h2>
          <Link
            to="/catalog"
            className="text-primary hover:underline font-medium"
          >
            Все товары →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Sale Products */}
      {saleProducts.length > 0 && (
        <section className="container mx-auto px-4 mb-12">
          <div className="glass-strong rounded-3xl p-6 md:p-8 bg-gradient-hero">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="badge-sale mb-2 inline-block">SALE</span>
                <h2 className="section-title mb-0">Товары со скидкой</h2>
              </div>
              <Link
                to="/catalog?sale=true"
                className="text-primary hover:underline font-medium hidden sm:block"
              >
                Все скидки →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Products */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">🔥 Популярные товары</h2>
          <Link
            to="/catalog"
            className="text-primary hover:underline font-medium"
          >
            Смотреть все →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="container mx-auto px-4 mb-12">
          <h2 className="section-title">👀 Вы смотрели</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyViewed.map(
              (product) =>
                product && <ProductCard key={product.id} product={product} />
            )}
          </div>
        </section>
      )}

      {/* Recommendations */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="section-title">✨ Рекомендуем для вас</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
