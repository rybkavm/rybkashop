import { useParams, Link } from "react-router-dom";
import { getCategoryById, getProductsByCategory, categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { HiOutlineArrowLeft } from "react-icons/hi";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = parseInt(id || "0");
  const category = getCategoryById(categoryId);
  const categoryProducts = getProductsByCategory(categoryId);

  if (!category) {
    return (
      <main className="pt-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <h1 className="text-2xl font-bold mb-4">Категория не найдена</h1>
            <Link to="/" className="btn-primary inline-block">
              На главную
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Get other categories for quick navigation
  const otherCategories = categories.filter((c) => c.id !== categoryId);

  return (
    <main className="pt-24 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Главная
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
            Каталог
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="glass-strong rounded-3xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{category.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/catalog"
                className="btn-glass flex items-center gap-2"
              >
                <HiOutlineArrowLeft className="w-5 h-5" />
                Все товары
              </Link>
            </div>
          </div>
        </div>

        {/* Quick category navigation */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="glass-button px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-sm"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Products count */}
        <p className="text-muted-foreground mb-6">
          Найдено товаров: <span className="font-medium text-foreground">{categoryProducts.length}</span>
        </p>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <span className="text-6xl mb-4 block">📦</span>
            <h2 className="text-xl font-bold mb-2">Товары скоро появятся</h2>
            <p className="text-muted-foreground">
              В этой категории пока нет товаров
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
