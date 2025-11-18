import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrendingCategories from './components/TrendingCategories';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';
import Toast from './components/Toast';

interface CartItem {
  id: string;
  product: any;
  size: string;
  color: string;
  quantity: number;
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const handleAddToCart = (product: any, size?: string, color?: string, quantity: number = 1) => {
    const cartItem: CartItem = {
      id: `${product.id}-${size || 'M'}-${color || 'Black'}-${Date.now()}`,
      product,
      size: size || 'M',
      color: color || 'Black',
      quantity
    };

    setCartItems([...cartItems, cartItem]);
    showToast('Added to cart!', 'success');

    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const handleCategoryClick = (category: string) => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = () => {
    showToast('Order placed successfully!', 'success');
    setCartItems([]);
    setIsCheckout(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isCheckout) {
    return (
      <>
        <CheckoutPage
          items={cartItems}
          onClose={() => setIsCheckout(false)}
          onPlaceOrder={handlePlaceOrder}
        />
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        cartItemCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onCategoryClick={handleCategoryClick}
      />

      <HeroSection />

      <TrendingCategories onCategoryClick={handleCategoryClick} />

      <div id="products-section">
        <ProductListing
          onProductClick={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
        />
      </div>

      <Footer />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckout(true);
        }}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
