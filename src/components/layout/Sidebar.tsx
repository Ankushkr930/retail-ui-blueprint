
import React, { useState } from 'react';
import { Home, ShoppingCart, Box, Users, BarChart, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, to, active = false }) => {
  return (
    <li 
      className={cn(
        "flex items-center px-4 py-3 my-1 cursor-pointer rounded-md transition-all",
        "hover:bg-white/10",
        active && "border-l-4 border-primary bg-white/5"
      )}
    >
      <Link to={to} className="flex items-center w-full">
        <Icon className="mr-3 h-5 w-5" />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', to: '/' },
    { icon: ShoppingCart, label: 'POS', to: '/pos' },
    { icon: Box, label: 'Inventory', to: '/inventory' },
    { icon: Users, label: 'Customers', to: '/customers' },
    { icon: BarChart, label: 'Reports', to: '/reports' },
  ];

  return (
    <aside 
      className={cn(
        "bg-slate-dark text-white flex flex-col h-screen transition-all duration-300 z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="font-bold text-xl">RetailPOS</div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:bg-white/10 text-white"
        >
          {collapsed ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-grow mt-6">
        <ul>
          {menuItems.map((item) => (
            <MenuItem 
              key={item.label}
              icon={item.icon}
              label={collapsed ? '' : item.label}
              to={item.to}
              active={location.pathname === item.to || 
                    (item.to === '/' && location.pathname === '/index')}
            />
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-white/10">
        {!collapsed && (
          <div className="text-xs text-white/60">
            RetailPOS v1.0
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
