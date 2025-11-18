import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

const heroSlides = [
  {
    title: 'Wear What Students Love',
    subtitle: 'Get 20% off with your student ID',
    gradient: 'from-blue-400 via-purple-400 to-pink-400',
    badge: '20% OFF',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Fresh Campus Style',
    subtitle: 'New arrivals for the modern student',
    gradient: 'from-orange-400 via-red-400 to-pink-400',
    badge: 'NEW IN',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Study in Comfort',
    subtitle: 'Premium hoodies & loungewear',
    gradient: 'from-green-400 via-teal-400 to-blue-400',
    badge: 'TRENDING',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = heroSlides[currentSlide];

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-r ${current.gradient} transition-all duration-1000 animate-gradient`} />

      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
          <div className="text-white space-y-6 animate-slide-in-left">
            <Badge variant="sale" className="text-sm px-4 py-2 inline-block">
              {current.badge}
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              {current.title}
            </h1>

            <p className="text-xl md:text-2xl opacity-90">
              {current.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group">
                Shop Now
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button variant="outline" size="lg" className="bg-white bg-opacity-20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black">
                Explore Collections
              </Button>
            </div>

            <div className="flex gap-2 pt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative h-full animate-slide-in-right">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={current.image}
                alt="Fashion model"
                className="h-[500px] w-auto object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  );
}
