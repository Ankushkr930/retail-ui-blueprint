
import React from 'react';
import { Home, ShoppingCart, Box, Users, BarChart } from 'lucide-react';

const MobileNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-dark text-white p-2 flex justify-around">
      <button className="flex flex-col items-center p-2">
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button className="flex flex-col items-center p-2">
        <ShoppingCart className="h-6 w-6" />
        <span className="text-xs mt-1">POS</span>
      </button>
      <button className="flex flex-col items-center p-2">
        <Box className="h-6 w-6" />
        <span className="text-xs mt-1">Inventory</span>
      </button>
      <button className="flex flex-col items-center p-2">
        <Users className="h-6 w-6" />
        <span className="text-xs mt-1">Customers</span>
      </button>
      <button className="flex flex-col items-center p-2">
        <BarChart className="h-6 w-6" />
        <span className="text-xs mt-1">Reports</span>
      </button>
    </div>
  );
};

export default MobileNav;
