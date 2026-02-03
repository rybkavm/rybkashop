import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import { categories } from "@/data/mockData";
import { useStore } from "@/store/useStore";
import SearchDropdown from "./SearchDropdown";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    getCartCount,
    getFavoritesCount,
    user,
    openAuthModal,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const cartCount = getCartCount();
  const favoritesCount = getFavoritesCount();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-strong py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              <span className="text-gradient">Rybka</span>Shop
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Главная
              </Link>
              <div className="relative group">
                <button className="nav-link flex items-center gap-1">
                  Категории
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 min-w-[280px] grid grid-cols-2 gap-2 shadow-lg border border-gray-200">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.id}`}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-800"
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-sm">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                to="/catalog"
                className={`nav-link ${
                  location.pathname === "/catalog" ? "active" : ""
                }`}
              >
                Каталог
              </Link>
            </nav>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <SearchDropdown className="w-full" />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Favorites */}
              <Link
                to="/favorites"
                className="relative p-2 rounded-xl hover:bg-white/20 transition-colors"
                aria-label="Избранное"
              >
                <HiOutlineHeart className="w-6 h-6" />
                {favoritesCount > 0 && (
                  <span className="counter-badge">{favoritesCount}</span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-xl hover:bg-white/20 transition-colors"
                aria-label="Корзина"
              >
                <HiOutlineShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="counter-badge">{cartCount}</span>
                )}
              </Link>

              {/* User */}
              {user ? (
                <Link
                  to="/profile"
                  className="hidden sm:flex items-center gap-2 p-2 rounded-xl hover:bg-white/20 transition-colors"
                  title="Личный кабинет"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => openAuthModal("login")}
                  className="hidden sm:flex p-2 rounded-xl hover:bg-white/20 transition-colors"
                  aria-label="Войти"
                >
                  <HiOutlineUser className="w-6 h-6" />
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-xl hover:bg-white/20 transition-colors"
                aria-label="Меню"
              >
                {isMobileMenuOpen ? (
                  <HiOutlineX className="w-6 h-6" />
                ) : (
                  <HiOutlineMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm glass-strong transition-transform duration-300 overflow-hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full max-h-screen overflow-y-auto pt-20 pb-8 px-6">
            {/* Search */}
            <div className="mb-6 flex-shrink-0">
              <SearchDropdown 
                inputClassName="py-3" 
                onClose={closeMobileMenu}
              />
            </div>

            {/* Profile link for logged-in users */}
            {user && (
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors flex-shrink-0"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-white">👤 Личный кабинет</span>
                  <p className="text-sm text-white/80">{user.name}</p>
                </div>
              </Link>
            )}

            {/* Navigation */}
            <nav className="flex flex-col gap-2 flex-shrink-0">
              <Link
                to="/"
                className={`nav-link text-lg ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                className={`nav-link text-lg ${
                  location.pathname === "/catalog" ? "active" : ""
                }`}
              >
                Каталог
              </Link>
              <Link
                to="/favorites"
                className={`nav-link text-lg ${
                  location.pathname === "/favorites" ? "active" : ""
                }`}
              >
                Избранное ({favoritesCount})
              </Link>
              <Link
                to="/cart"
                className={`nav-link text-lg ${
                  location.pathname === "/cart" ? "active" : ""
                }`}
              >
                Корзина ({cartCount})
              </Link>
            </nav>

            {/* Categories */}
            <div className="mt-6 flex-shrink-0">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 px-4">
                Категории
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth button */}
            {!user && (
              <div className="mt-auto pt-6 flex-shrink-0">
                <button
                  onClick={() => {
                    closeMobileMenu();
                    openAuthModal("login");
                  }}
                  className="btn-primary w-full"
                >
                  Войти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
