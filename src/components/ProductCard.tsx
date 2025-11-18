import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import Badge from './Badge';

interface Product {
  id: string;
  name: string;
  price: number;
  discount_price?: number;
  images: string[];
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100" onClick={() => onClick(product)}>
        <img
          src={isFlipped && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge variant={product.badge.toLowerCase() === 'sale' ? 'sale' : 'new'}>
              {product.badge}
            </Badge>
          </div>
        )}

        {discountPercent > 0 && (
          <div className="absolute top-4 right-4">
            <Badge variant="sale">-{discountPercent}%</Badge>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={18}
            className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`}
          />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-12 group-hover:translate-y-0 px-6 py-3 bg-black text-white rounded-lg flex items-center gap-2 transition-all duration-300 hover:bg-gray-800 shadow-lg"
        >
          <ShoppingCart size={18} />
          <span className="font-semibold">Add to Cart</span>
        </button>
      </div>

      <div className="p-4" onClick={() => onClick(product)}>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          {product.discount_price ? (
            <>
              <span className="text-xl font-bold">${product.discount_price}</span>
              <span className="text-sm text-gray-500 line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-xl font-bold">${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
