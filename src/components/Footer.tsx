import { Link } from "react-router-dom";
import { FaTelegram, FaGithub } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi";

const Footer = () => {
  return (
<footer className="glass-strong mt-8 py-4 md:py-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {/* Creator Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Создатель</h3>
            <p className="text-sm text-foreground font-medium">Рыбка Виктор</p>
            <div className="flex gap-3">
              <a
                href="https://t.me/rvmgitclone"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button p-2 rounded-lg hover:scale-110 transition-all"
                aria-label="Telegram"
              >
                <FaTelegram className="w-5 h-5 text-[#0088cc]" />
              </a>
              <a
                href="https://github.com/rybkavm"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button p-2 rounded-lg hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Контакты</h3>
            <a
              href="tel:+79385043377"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="glass-button p-1.5 rounded-lg">
                <HiOutlinePhone className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">+7 938 504 33 77</span>
            </a>
            <p className="text-xs text-muted-foreground">
              Горячая линия 24/7
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Быстрые ссылки</h3>
            <nav className="flex flex-col gap-1">
              <Link
                to="/catalog"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Каталог товаров
              </Link>
              <Link
                to="/favorites"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Избранное
              </Link>
              <Link
                to="/cart"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Корзина
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <Link to="/" className="text-lg font-bold">
              <span className="text-gradient">Rybka</span>Shop
            </Link>
            <p className="text-xs text-muted-foreground text-center">
              © 2024 RybkaShop. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
