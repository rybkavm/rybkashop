import { Link } from "react-router-dom";
import { products } from "@/data/mockData";
import { useStore } from "@/store/useStore";
import ProductCard from "@/components/ProductCard";
import { HiOutlineHeart, HiOutlineArrowLeft } from "react-icons/hi";

const FavoritesPage = () => {
  const { favorites, clearFavorites } = useStore();

  // Get favorite products
  const favoriteProducts = favorites
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (favoriteProducts.length === 0) {
    return (
      <main className="pt-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
              <HiOutlineHeart className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Избранное пусто</h1>
            <p className="text-muted-foreground mb-6">
              Добавляйте понравившиеся товары в избранное
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-2"
            >
              <HiOutlineArrowLeft className="w-5 h-5" />
              Продолжить покупки
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Избранное</h1>
            <p className="text-muted-foreground">
              {favoriteProducts.length}{" "}
              {favoriteProducts.length === 1
                ? "товар"
                : favoriteProducts.length < 5
                ? "товара"
                : "товаров"}
            </p>
          </div>
          <button
            onClick={clearFavorites}
            className="text-destructive hover:underline text-sm font-medium"
          >
            Очистить избранное
          </button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {favoriteProducts.map(
            (product) => product && <ProductCard key={product.id} product={product} />
          )}
        </div>
      </div>
    </main>
  );
};

export default FavoritesPage;
