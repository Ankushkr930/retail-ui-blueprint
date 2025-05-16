
import React from 'react';
import { Home, ShoppingCart, Box, Users, BarChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MobileNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-dark text-white p-2 flex justify-around">
      <Link 
        to="/" 
        className={cn(
          "flex flex-col items-center p-2",
          isActive('/') && "text-primary"
        )}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link 
        to="/pos" 
        className={cn(
          "flex flex-col items-center p-2",
          isActive('/pos') && "text-primary"
        )}
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="text-xs mt-1">POS</span>
      </Link>
      <Link 
        to="/inventory" 
        className={cn(
          "flex flex-col items-center p-2",
          isActive('/inventory') && "text-primary"
        )}
      >
        <Box className="h-6 w-6" />
        <span className="text-xs mt-1">Inventory</span>
      </Link>
      <Link 
        to="/customers" 
        className={cn(
          "flex flex-col items-center p-2",
          isActive('/customers') && "text-primary"
        )}
      >
        <Users className="h-6 w-6" />
        <span className="text-xs mt-1">Customers</span>
      </Link>
      <Link 
        to="/reports" 
        className={cn(
          "flex flex-col items-center p-2",
          isActive('/reports') && "text-primary"
        )}
      >
        <BarChart className="h-6 w-6" />
        <span className="text-xs mt-1">Reports</span>
      </Link>
    </div>
  );
};

export default MobileNav;
