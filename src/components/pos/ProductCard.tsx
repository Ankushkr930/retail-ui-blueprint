
import React from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  stock, 
  image, 
  onAddToCart 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 bg-gray-200 relative">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Product Image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{name}</h3>
        <div className="mt-1 flex justify-between items-center">
          <span className="text-xl font-bold">${price.toFixed(2)}</span>
          <span className={cn(
            "text-sm",
            stock <= 0 ? "text-danger" :
            stock < 5 ? "text-danger" :
            stock < 20 ? "text-accent" :
            "text-secondary"
          )}>
            {stock <= 0 ? 'Out of Stock' : `${stock} in stock`}
          </span>
        </div>
        <button 
          onClick={onAddToCart}
          disabled={stock <= 0}
          className={cn(
            "mt-3 w-full py-2 px-4 rounded-md text-white font-medium",
            stock <= 0 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-primary hover:bg-primary-hover"
          )}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
