
import React from 'react';
import { Home, ShoppingCart, Box, Users, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-dark text-white p-2 flex justify-around">
      <Link to="/" className="flex flex-col items-center p-2">
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/pos" className="flex flex-col items-center p-2">
        <ShoppingCart className="h-6 w-6" />
        <span className="text-xs mt-1">POS</span>
      </Link>
      <Link to="/inventory" className="flex flex-col items-center p-2">
        <Box className="h-6 w-6" />
        <span className="text-xs mt-1">Inventory</span>
      </Link>
      <Link to="/customers" className="flex flex-col items-center p-2">
        <Users className="h-6 w-6" />
        <span className="text-xs mt-1">Customers</span>
      </Link>
      <Link to="/reports" className="flex flex-col items-center p-2">
        <BarChart className="h-6 w-6" />
        <span className="text-xs mt-1">Reports</span>
      </Link>
    </div>
  );
};

export default MobileNav;
