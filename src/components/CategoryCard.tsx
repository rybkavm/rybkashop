import { Link } from "react-router-dom";
import { Category } from "@/data/mockData";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.id}`}>
      <div className="category-card h-full">
        <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
          {category.icon}
        </span>
        <h3 className="font-semibold text-foreground text-center">{category.name}</h3>
        <p className="text-sm text-muted-foreground text-center">{category.description}</p>
        <span className="mt-2 text-xs text-primary font-medium">
          {category.productCount} товаров
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
