import { Link } from "react-router-dom";
import { HiOutlineHeart, HiHeart, HiOutlineShoppingCart, HiOutlineStar } from "react-icons/hi";
import { Product } from "@/data/mockData";
import { useStore } from "@/store/useStore";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleFavorite, isFavorite, addToCart, getCartItemQuantity } = useStore();
  const isLiked = isFavorite(product.id);
  const cartQuantity = getCartItemQuantity(product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="product-card group relative overflow-hidden">
        {/* Discount badge */}
        {product.oldPrice && (
          <span className="absolute top-3 left-3 badge-sale z-10">
            -{discountPercent}%
          </span>
        )}

        {/* Like button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full glass-button like-btn ${
            isLiked ? "liked" : ""
          }`}
          aria-label={isLiked ? "Убрать из избранного" : "Добавить в избранное"}
        >
          {isLiked ? (
            <HiHeart className="w-5 h-5 text-rose-500" />
          ) : (
            <HiOutlineHeart className="w-5 h-5" />
          )}
        </button>

        {/* Image */}
        <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-white/5">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="space-y-1.5 md:space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <HiOutlineStar className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400 fill-amber-400" />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Name */}
          <h3 className="font-medium text-foreground line-clamp-2 min-h-[2rem] md:min-h-[2.5rem] text-sm md:text-base group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 md:gap-2">
            {product.oldPrice ? (
              <>
                <span className="price-sale text-sm md:text-base">{product.price.toLocaleString()} ₽</span>
                <span className="price-old text-xs md:text-sm">{product.oldPrice.toLocaleString()} ₽</span>
              </>
            ) : (
              <span className="price text-sm md:text-base">{product.price.toLocaleString()} ₽</span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className={`w-full mt-2 md:mt-3 flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-xl font-medium text-sm md:text-base transition-all ${
              cartQuantity > 0
                ? "bg-success/90 text-white hover:bg-success"
                : "btn-primary"
            }`}
          >
            <HiOutlineShoppingCart className="w-4 h-4 md:w-5 md:h-5 hidden md:block" />
            {cartQuantity > 0 ? (
              <span>В корзине ({cartQuantity})</span>
            ) : (
              <span>В корзину</span>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
