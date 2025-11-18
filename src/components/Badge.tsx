import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'sale' | 'new' | 'trending' | 'soldout';
  className?: string;
}

export default function Badge({ children, variant = 'new', className = '' }: BadgeProps) {
  const variants = {
    sale: 'bg-red-500 text-white',
    new: 'bg-green-500 text-white',
    trending: 'bg-orange-500 text-white',
    soldout: 'bg-gray-400 text-white'
  };

  return (
    <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
