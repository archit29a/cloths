import { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import Button from './Button';

const mockProducts = [
  {
    id: '1',
    name: 'Classic Black Hoodie',
    price: 49.99,
    discount_price: 39.99,
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8532551/pexels-photo-8532551.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    badge: 'SALE'
  },
  {
    id: '2',
    name: 'White Basic Tee',
    price: 24.99,
    images: [
      'https://images.pexels.com/photos/8532551/pexels-photo-8532551.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    badge: 'NEW'
  },
  {
    id: '3',
    name: 'Denim Jacket',
    price: 79.99,
    discount_price: 59.99,
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    badge: 'SALE'
  },
  {
    id: '4',
    name: 'Cargo Pants',
    price: 54.99,
    images: [
      'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: '5',
    name: 'Graphic Oversized Hoodie',
    price: 64.99,
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8532551/pexels-photo-8532551.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    badge: 'TRENDING'
  },
  {
    id: '6',
    name: 'Striped Long Sleeve',
    price: 34.99,
    discount_price: 27.99,
    images: [
      'https://images.pexels.com/photos/8532551/pexels-photo-8532551.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    badge: 'SALE'
  }
];

interface ProductListingProps {
  onProductClick: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function ProductListing({ onProductClick, onAddToCart }: ProductListingProps) {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Gray', 'Blue', 'Red', 'Green'];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">All Products</h2>
            <p className="text-gray-600">{mockProducts.length} items found</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-6`}>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold mb-4">Price Range</h3>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold mb-4">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedSizes.includes(size)
                        ? 'bg-black text-white'
                        : 'bg-white border border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold mb-4">Color</h3>
              <div className="space-y-2">
                {colors.map((color) => (
                  <label key={color} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => toggleColor(color)}
                      className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <span className="group-hover:text-black transition-colors">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button variant="outline" fullWidth onClick={() => {
              setSelectedSizes([]);
              setSelectedColors([]);
              setPriceRange([0, 100]);
            }}>
              Clear All Filters
            </Button>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onClick={onProductClick}
                />
              ))}
            </div>

            <div className="flex justify-center mt-12 gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    page === 1
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
