import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { HiOutlineFilter, HiOutlineX } from "react-icons/hi";

type SortOption = "popular" | "price_asc" | "price_desc" | "rating";

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showSaleOnly, setShowSaleOnly] = useState(
    searchParams.get("sale") === "true"
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    // Filter sale items
    if (showSaleOnly) {
      result = result.filter((p) => p.oldPrice);
    }

    // Sort
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [selectedCategory, sortBy, showSaleOnly]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setShowSaleOnly(false);
    setSortBy("popular");
  };

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) + (showSaleOnly ? 1 : 0);

  return (
    <main className="pt-24 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Каталог</h1>
          <p className="text-muted-foreground">
            Найдено товаров: {filteredProducts.length}
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Mobile filter button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden glass-button flex items-center gap-2 px-4 py-2 rounded-xl"
          >
            <HiOutlineFilter className="w-5 h-5" />
            Фильтры
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Category pills - desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`glass-button px-4 py-2 rounded-full text-sm ${
                selectedCategory === null ? "bg-primary text-white" : ""
              }`}
            >
              Все товары
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`glass-button px-4 py-2 rounded-full text-sm flex items-center gap-1 ${
                  selectedCategory === cat.id ? "bg-primary text-white" : ""
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort and sale filter */}
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setShowSaleOnly(!showSaleOnly)}
              className={`glass-button px-4 py-2 rounded-full text-sm ${
                showSaleOnly ? "bg-rose-500 text-white" : ""
              }`}
            >
              🔥 Скидки
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="glass-input px-4 py-2 rounded-xl text-sm bg-transparent"
            >
              <option value="popular">По популярности</option>
              <option value="rating">По рейтингу</option>
              <option value="price_asc">Сначала дешёвые</option>
              <option value="price_desc">Сначала дорогие</option>
            </select>
          </div>
        </div>

        {/* Active filters */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-muted-foreground">Активные фильтры:</span>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="glass-button px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {categories.find((c) => c.id === selectedCategory)?.name}
                <HiOutlineX className="w-4 h-4" />
              </button>
            )}
            {showSaleOnly && (
              <button
                onClick={() => setShowSaleOnly(false)}
                className="glass-button px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                Только скидки
                <HiOutlineX className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={clearFilters}
              className="text-primary hover:underline text-sm ml-2"
            >
              Сбросить все
            </button>
          </div>
        )}

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <h2 className="text-xl font-bold mb-2">Товары не найдены</h2>
            <p className="text-muted-foreground mb-4">
              Попробуйте изменить фильтры
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter modal */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isFilterOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsFilterOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 glass-strong rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto transition-transform duration-300 ${
            isFilterOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Фильтры</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 hover:bg-white/20 rounded-xl"
            >
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Категории</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`glass-button px-4 py-3 rounded-xl text-sm text-left ${
                  selectedCategory === null ? "bg-primary text-white" : ""
                }`}
              >
                Все товары
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`glass-button px-4 py-3 rounded-xl text-sm flex items-center gap-2 ${
                    selectedCategory === cat.id ? "bg-primary text-white" : ""
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Apply button */}
          <button
            onClick={() => setIsFilterOpen(false)}
            className="btn-primary w-full"
          >
            Показать {filteredProducts.length} товаров
          </button>
        </div>
      </div>
    </main>
  );
};

export default CatalogPage;
