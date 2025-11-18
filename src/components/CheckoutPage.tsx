import { useState } from 'react';
import { CreditCard, Wallet, Building2, CheckCircle, Tag } from 'lucide-react';
import Input from './Input';
import Button from './Button';

interface CheckoutPageProps {
  items: any[];
  onClose: () => void;
  onPlaceOrder: () => void;
}

export default function CheckoutPage({ items, onClose, onPlaceOrder }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const subtotal = items.reduce((total, item) => {
    const price = item.product.discount_price || item.product.price;
    return total + price * item.quantity;
  }, 0);

  const discount = isCouponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'student10') {
      setIsCouponApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={onClose} className="text-sm text-gray-600 hover:text-black mb-4">
            ← Back to Shopping
          </button>
          <h1 className="text-4xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" required />
                <Input label="Last Name" placeholder="Doe" required />
                <Input label="Email" type="email" placeholder="john@university.edu" className="md:col-span-2" required />
                <Input label="Phone" type="tel" placeholder="+1 (555) 123-4567" className="md:col-span-2" required />
                <Input label="Address" placeholder="123 Main St" className="md:col-span-2" required />
                <Input label="City" placeholder="Boston" required />
                <Input label="State" placeholder="MA" required />
                <Input label="ZIP Code" placeholder="02108" />
                <Input label="Country" placeholder="United States" />
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                  <span className="text-sm font-medium">I have a student ID (Get extra 5% off!)</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <CreditCard className="mx-auto mb-2" size={24} />
                  <span className="text-sm font-medium">Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Wallet className="mx-auto mb-2" size={24} />
                  <span className="text-sm font-medium">PayPal</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Building2 className="mx-auto mb-2" size={24} />
                  <span className="text-sm font-medium">Bank</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <Input label="Card Number" placeholder="1234 5678 9012 3456" required />
                  <Input label="Cardholder Name" placeholder="John Doe" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry Date" placeholder="MM/YY" required />
                    <Input label="CVV" placeholder="123" type="password" required />
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <Button variant="secondary" fullWidth>
                    Continue with PayPal
                  </Button>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <Input label="Account Number" placeholder="1234567890" required />
                  <Input label="Routing Number" placeholder="987654321" required />
                  <Input label="Account Holder Name" placeholder="John Doe" required />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm line-clamp-1">{item.product.name}</h3>
                      <p className="text-xs text-gray-600">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                      <p className="font-bold text-sm mt-1">
                        ${((item.product.discount_price || item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={isCouponApplied}
                  />
                  <Button
                    onClick={applyCoupon}
                    disabled={isCouponApplied}
                    className="whitespace-nowrap"
                  >
                    {isCouponApplied ? <CheckCircle size={18} /> : 'Apply'}
                  </Button>
                </div>

                {isCouponApplied && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <Tag size={16} className="text-green-600" />
                    <span className="text-sm text-green-800 font-medium">Coupon applied!</span>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold pt-4 border-t mt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button fullWidth size="lg" onClick={onPlaceOrder}>
                Place Order
              </Button>

              <p className="text-xs text-center text-gray-600">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
