import { useState } from 'react';
import { X, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

interface ProductDetailProps {
  product: any;
  onClose: () => void;
  onAddToCart: (product: any, size: string, color: string, quantity: number) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Gray', 'Navy'];

  const images = product.images.length > 0 ? product.images : [
    'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8532551/pexels-photo-8532551.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    onAddToCart(product, selectedSize, selectedColor, quantity);
  };

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto animate-modal-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <div
              className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant={product.badge.toLowerCase() === 'sale' ? 'sale' : 'new'}>
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(127 reviews)</span>
              </div>

              <div className="flex items-center gap-3">
                {product.discount_price ? (
                  <>
                    <span className="text-3xl font-bold">${product.discount_price}</span>
                    <span className="text-xl text-gray-500 line-through">${product.price}</span>
                    <Badge variant="sale">-{discountPercent}% OFF</Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold">${product.price}</span>
                )}
              </div>

              <p className="text-sm text-green-600 font-medium mt-2">
                Student Discount Applied! Save 20%
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Select Color</h3>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedColor === color
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Button fullWidth size="lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button fullWidth size="lg" variant="secondary">
                Buy Now
              </Button>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors flex items-center justify-center gap-2">
                  <Heart size={18} />
                  <span className="font-semibold">Wishlist</span>
                </button>
                <button className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  <span className="font-semibold">Share</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Truck size={20} />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield size={20} />
                <span>1 year warranty included</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw size={20} />
                <span>30-day return policy</span>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-2">Product Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium quality clothing designed for students who value both style and comfort.
                Made with high-quality materials that ensure durability and long-lasting wear.
                Perfect for campus life, study sessions, or casual hangouts with friends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
