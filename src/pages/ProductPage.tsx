import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getProductById,
  getSimilarProducts,
  getCategoryById,
  products,
} from "@/data/mockData";
import { useStore } from "@/store/useStore";
import ProductCard from "@/components/ProductCard";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineShoppingCart,
  HiOutlineStar,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineArrowLeft,
} from "react-icons/hi";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0");
  const product = getProductById(productId);

  const {
    addToHistory,
    viewHistory,
    toggleFavorite,
    isFavorite,
    addToCart,
    getCartItemQuantity,
    updateQuantity,
  } = useStore();

  // Add to viewing history
  useEffect(() => {
    if (product) {
      addToHistory(product.id);
    }
  }, [product, addToHistory]);

  if (!product) {
    return (
      <main className="pt-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
            <Link to="/" className="btn-primary inline-block">
              На главную
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const category = getCategoryById(product.categoryId);
  const similarProducts = getSimilarProducts(product.id, 4);
  const isLiked = isFavorite(product.id);
  const cartQuantity = getCartItemQuantity(product.id);

  // Recently viewed (excluding current product)
  const recentlyViewed = viewHistory
    .filter((vid) => vid !== product.id)
    .map((vid) => products.find((p) => p.id === vid))
    .filter(Boolean)
    .slice(0, 4);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <main className="pt-24 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm flex-wrap">
          <Link
            to="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Главная
          </Link>
          <span className="text-muted-foreground">/</span>
          {category && (
            <>
              <Link
                to={`/category/${category.id}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
              <span className="text-muted-foreground">/</span>
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Back button */}
        <Link
          to={category ? `/category/${category.id}` : "/catalog"}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
          Назад к товарам
        </Link>

        {/* Product details */}
        <div className="glass-strong rounded-3xl p-6 md:p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative">
              {product.oldPrice && (
                <span className="absolute top-4 left-4 badge-sale z-10 text-sm">
                  -{discountPercent}%
                </span>
              )}
              <div className="aspect-square rounded-2xl overflow-hidden bg-white/5">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {/* Category */}
              {category && (
                <Link
                  to={`/category/${category.id}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Link>
              )}

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <HiOutlineStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} отзывов)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                {product.oldPrice ? (
                  <>
                    <span className="text-3xl font-bold text-rose-500">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      {product.oldPrice.toLocaleString()} ₽
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-foreground">
                    {product.price.toLocaleString()} ₽
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {cartQuantity > 0 ? (
                  <div className="flex items-center gap-4">
                    <div className="glass-button flex items-center rounded-xl">
                      <button
                        onClick={() => updateQuantity(product.id, cartQuantity - 1)}
                        className="p-3 hover:bg-white/20 rounded-l-xl transition-colors"
                        aria-label="Уменьшить количество"
                      >
                        <HiOutlineMinus className="w-5 h-5" />
                      </button>
                      <span className="px-4 font-medium min-w-[3rem] text-center">
                        {cartQuantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, cartQuantity + 1)}
                        className="p-3 hover:bg-white/20 rounded-r-xl transition-colors"
                        aria-label="Увеличить количество"
                      >
                        <HiOutlinePlus className="w-5 h-5" />
                      </button>
                    </div>
                    <Link to="/cart" className="btn-primary flex items-center gap-2">
                      <HiOutlineShoppingCart className="w-5 h-5" />
                      Перейти в корзину
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product.id)}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <HiOutlineShoppingCart className="w-5 h-5" />
                    Добавить в корзину
                  </button>
                )}

                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`glass-button flex items-center justify-center gap-2 px-6 py-3 like-btn ${
                    isLiked ? "liked" : ""
                  }`}
                >
                  {isLiked ? (
                    <HiHeart className="w-5 h-5 text-rose-500" />
                  ) : (
                    <HiOutlineHeart className="w-5 h-5" />
                  )}
                  <span>{isLiked ? "В избранном" : "В избранное"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="section-title">Похожие товары</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="mb-12">
            <h2 className="section-title">Вы смотрели</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recentlyViewed.map(
                (p) => p && <ProductCard key={p.id} product={p} />
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductPage;
