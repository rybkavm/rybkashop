import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HiOutlineHome } from "react-icons/hi";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="pt-24 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="glass-card p-12 text-center max-w-md mx-auto">
          <span className="text-8xl mb-6 block">🔍</span>
          <h1 className="text-4xl font-bold mb-4 text-gradient">404</h1>
          <p className="text-xl text-foreground mb-2">Страница не найдена</p>
          <p className="text-muted-foreground mb-8">
            К сожалению, запрашиваемая страница не существует
          </p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <HiOutlineHome className="w-5 h-5" />
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
