
import React from 'react';
import { cn } from '@/lib/utils';

interface StockAlertBadgeProps {
  stock: number;
  threshold?: number;
}

const StockAlertBadge: React.FC<StockAlertBadgeProps> = ({ 
  stock, 
  threshold = 3 
}) => {
  if (stock >= threshold) {
    return null;
  }
  
  return (
    <div className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      "bg-danger text-white animate-pulse"
    )}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-3 w-3 mr-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
        />
      </svg>
      Low Stock
    </div>
  );
};

export default StockAlertBadge;
