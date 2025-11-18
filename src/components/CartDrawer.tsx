import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Button from './Button';

interface CartItem {
  id: string;
  product: any;
  size: string;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const subtotal = items.reduce((total, item) => {
    const price = item.product.discount_price || item.product.price;
    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={onClose} />

      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag size={24} />
              <h2 className="text-2xl font-bold">Cart ({items.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some products to get started!</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold line-clamp-1">{item.product.name}</h3>

                      <div className="flex gap-2 text-xs text-gray-600">
                        <span>Size: {item.size}</span>
                        <span>•</span>
                        <span>Color: {item.color}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 bg-white rounded hover:bg-gray-200 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 bg-white rounded hover:bg-gray-200 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-bold">
                            ${((item.product.discount_price || item.product.price) * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-6 space-y-4 bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 50 && subtotal > 0 && (
                  <p className="text-xs text-gray-600">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>

              <div className="flex justify-between text-lg font-bold pt-4 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button fullWidth size="lg" onClick={onCheckout}>
                Proceed to Checkout
              </Button>

              <button
                onClick={onClose}
                className="w-full text-center text-sm text-gray-600 hover:text-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
