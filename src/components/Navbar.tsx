import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
}

export default function Navbar({ cartItemCount, onCartClick, onCategoryClick }: NavbarProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const categories = ['Hoodies', 'T-Shirts', 'Jackets', 'Pants', 'Accessories', 'Sale'];

  return (
    <nav className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onCategoryClick('all')}>
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">StudentCloset</span>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryClick(category.toLowerCase())}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
                >
                  {category}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center transition-all duration-300 ${isSearchExpanded ? 'w-64' : 'w-10'}`}>
              {isSearchExpanded ? (
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                  onBlur={() => setIsSearchExpanded(false)}
                />
              ) : (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User size={20} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 animate-dropdown">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors">
                    My Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors">
                    Orders
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors">
                    Wishlist
                  </button>
                  <hr className="my-2" />
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 transition-colors">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryClick(category.toLowerCase());
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
