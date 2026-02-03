import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import { products, Product } from "@/data/mockData";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchDropdownProps {
  className?: string;
  inputClassName?: string;
  onClose?: () => void;
}

const SearchDropdown = ({ className = "", inputClassName = "", onClose }: SearchDropdownProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter products based on search query
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchTerm = debouncedQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    ).slice(0, 4); // Show max 4 results in dropdown

    setResults(filtered);
  }, [debouncedQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
      onClose?.();
    }
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
    onClose?.();
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Поиск товаров..."
            className={`glass-input w-full pl-10 pr-10 py-2.5 text-sm ${inputClassName}`}
          />
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <HiOutlineX className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden z-50 shadow-lg border border-gray-200">
          <div className="p-2">
            {results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={handleResultClick}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 line-clamp-1 text-sm">
                    {product.name}
                  </p>
                  <div className="flex items-baseline gap-2">
                    {product.oldPrice ? (
                      <>
                        <span className="text-sm font-bold text-rose-500">
                          {product.price.toLocaleString()} ₽
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          {product.oldPrice.toLocaleString()} ₽
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-gray-900">
                        {product.price.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {query.trim().length >= 2 && (
            <div className="border-t border-gray-200 p-2">
              <button
                onClick={handleSubmit}
                className="w-full p-3 text-center text-primary hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium"
              >
                Показать все результаты →
              </button>
            </div>
          )}
        </div>
      )}

      {/* No results message */}
      {isOpen && debouncedQuery.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-2xl p-4 text-center z-50 shadow-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
