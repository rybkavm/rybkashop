import { useState } from "react";
import { Link } from "react-router-dom";
import { getProductById } from "@/data/mockData";
import { useStore } from "@/store/useStore";
import {
  HiOutlineTrash,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineArrowLeft,
  HiOutlineGift,
} from "react-icons/hi";
import { toast } from "sonner";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, appliedPromoCode, applyPromoCode, clearPromoCode } = useStore();
  const [promoInput, setPromoInput] = useState("");

  // Get cart items with product details
  const cartItems = cart
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate totals
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item?.product.price || 0) * (item?.quantity || 0);
  }, 0);
  const totalOldPrice = cartItems.reduce((sum, item) => {
    const price = item?.product.oldPrice || item?.product.price || 0;
    return sum + price * (item?.quantity || 0);
  }, 0);
  const savings = totalOldPrice - totalPrice;

  // Calculate promo discount (10% only on non-discounted items)
  const promoDiscount = appliedPromoCode ? cartItems.reduce((sum, item) => {
    // Apply 10% discount only to items without existing discount
    if (item && !item.product.oldPrice) {
      return sum + (item.product.price * item.quantity * 0.1);
    }
    return sum;
  }, 0) : 0;

  const finalPrice = totalPrice - promoDiscount;

  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      toast.error("Введите промокод");
      return;
    }
    const success = applyPromoCode(promoInput);
    if (success) {
      toast.success("Промокод успешно применён! Скидка 10% на товары без скидки.");
      setPromoInput("");
    } else {
      toast.error("Промокод недействителен или уже был использован");
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="pt-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <HiOutlineShoppingCart className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
            <p className="text-muted-foreground mb-6">
              Добавьте товары, чтобы оформить заказ
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
    <main className="pt-24 min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 overflow-hidden">
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
            <h1 className="text-3xl font-bold text-foreground">Корзина</h1>
            <p className="text-muted-foreground">
              {totalItems} {totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-destructive hover:underline text-sm font-medium"
          >
            Очистить корзину
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(
              (item) =>
                item && (
                  <div
                    key={item.productId}
                    className="glass-card p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4"
                  >
                    {/* Top row on mobile: Image + Details */}
                    <div className="flex gap-3 sm:contents">
                      {/* Image */}
                      <Link
                        to={`/product/${item.product.id}`}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0 bg-white/5"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-medium text-sm sm:text-base text-foreground hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mt-1 sm:mt-2">
                          {item.product.oldPrice ? (
                            <>
                              <span className="font-bold text-sm sm:text-base text-rose-500">
                                {item.product.price.toLocaleString()} ₽
                              </span>
                              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                                {item.product.oldPrice.toLocaleString()} ₽
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-sm sm:text-base">
                              {item.product.price.toLocaleString()} ₽
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls - separate row on mobile */}
                    <div className="flex items-center justify-between sm:mt-auto sm:pt-0 pt-2 border-t sm:border-t-0 border-white/10">
                      <div className="glass-button flex items-center rounded-xl">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-l-xl transition-colors"
                          aria-label="Уменьшить"
                        >
                          <HiOutlineMinus className="w-4 h-4" />
                        </button>
                        <span className="px-3 sm:px-4 font-medium min-w-[2rem] text-center text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-r-xl transition-colors"
                          aria-label="Увеличить"
                        >
                          <HiOutlinePlus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                        aria-label="Удалить"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="glass-strong rounded-3xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Итого</h2>

              {/* Promo code input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  <HiOutlineGift className="inline w-4 h-4 mr-1" />
                  Промокод
                </label>
                {appliedPromoCode ? (
                  <div className="flex items-center justify-between px-3 py-2.5 bg-success/10 rounded-xl border border-success/30">
                    <span className="text-success font-medium text-sm">✓ {appliedPromoCode}</span>
                    <button 
                      onClick={clearPromoCode}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Отменить
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Введите промокод"
                      className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="btn-primary px-3 py-2 text-sm whitespace-nowrap"
                    >
                      Применить
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товары ({totalItems})</span>
                  <span>{totalOldPrice.toLocaleString()} ₽</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Скидка на товары</span>
                    <span>-{savings.toLocaleString()} ₽</span>
                  </div>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Промокод (10%)</span>
                    <span>-{Math.round(promoDiscount).toLocaleString()} ₽</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-4 flex justify-between">
                  <span className="font-bold text-lg">К оплате</span>
                  <span className="font-bold text-lg text-primary">
                    {Math.round(finalPrice).toLocaleString()} ₽
                  </span>
                </div>
              </div>

              <button className="btn-primary w-full text-lg py-4">
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
