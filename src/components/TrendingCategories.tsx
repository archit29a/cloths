import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Hoodies',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
    itemCount: 48
  },
  {
    name: 'T-Shirts',
    image: 'https://images.pexels.com/photos/8532551/pexels-photo-8532551.jpeg?auto=compress&cs=tinysrgb&w=600',
    itemCount: 72
  },
  {
    name: 'Jackets',
    image: 'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=600',
    itemCount: 36
  },
  {
    name: 'Pants',
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600',
    itemCount: 54
  },
  {
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600',
    itemCount: 92
  },
  {
    name: 'Sneakers',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
    itemCount: 64
  }
];

interface TrendingCategoriesProps {
  onCategoryClick: (category: string) => void;
}

export default function TrendingCategories({ onCategoryClick }: TrendingCategoriesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Trending Categories</h2>
          <p className="text-gray-600 text-lg">Discover what students are wearing this season</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryClick(category.name.toLowerCase())}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold mb-2 transform group-hover:scale-110 transition-transform">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90 mb-4">{category.itemCount} items</p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-sm font-semibold">Shop Now</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
