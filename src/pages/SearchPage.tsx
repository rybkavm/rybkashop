import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { HiOutlineSearch, HiOutlineArrowLeft } from "react-icons/hi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  if (!query.trim()) {
    return (
      <main className="pt-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <HiOutlineSearch className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Поиск товаров</h1>
            <p className="text-muted-foreground mb-6">
              Введите запрос в строку поиска
            </p>
            <Link to="/catalog" className="btn-primary inline-block">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
            Вернуться в каталог
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            Результаты поиска: "{query}"
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length === 0
              ? "Ничего не найдено"
              : `Найдено ${filteredProducts.length} ${
                  filteredProducts.length === 1
                    ? "товар"
                    : filteredProducts.length < 5
                    ? "товара"
                    : "товаров"
                }`}
          </p>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-6">
              <HiOutlineSearch className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-4">Ничего не найдено</h2>
            <p className="text-muted-foreground mb-6">
              Попробуйте изменить поисковый запрос
            </p>
            <Link to="/catalog" className="btn-primary inline-block">
              Смотреть все товары
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
