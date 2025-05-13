import React from 'react';
import { Trash } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  return (
    <div className="py-3 flex items-center border-b border-gray-200 last:border-b-0">
      <div className="h-16 w-16 bg-gray-100 rounded mr-3 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h4 className="font-medium text-sm">{name}</h4>
        <div className="text-sm text-gray-600">${price.toFixed(2)}</div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={onDecrease}
          className="h-6 w-6 flex items-center justify-center rounded bg-gray-100 text-gray-700"
        >
          -
        </button>
        <span className="text-sm font-medium w-4 text-center">{quantity}</span>
        <button 
          onClick={onIncrease}
          className="h-6 w-6 flex items-center justify-center rounded bg-gray-100 text-gray-700"
        >
          +
        </button>
      </div>
      
      <div className="ml-4 text-sm font-bold w-16 text-right">
        ${(price * quantity).toFixed(2)}
      </div>
      
      <button 
        onClick={onRemove}
        className="ml-2 text-danger hover:text-red-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
