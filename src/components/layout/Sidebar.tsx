
import React, { useState } from 'react';
import { Home, ShoppingCart, Box, Users, BarChart, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, active = false, onClick }) => {
  return (
    <li 
      className={cn(
        "flex items-center px-4 py-3 my-1 cursor-pointer rounded-md transition-all",
        "hover:bg-white/10",
        active && "border-l-4 border-primary bg-white/5"
      )}
      onClick={onClick}
    >
      <Icon className="mr-3 h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: ShoppingCart, label: 'POS' },
    { icon: Box, label: 'Inventory' },
    { icon: Users, label: 'Customers' },
    { icon: BarChart, label: 'Reports' },
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
              active={activeItem === item.label}
              onClick={() => handleItemClick(item.label)}
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
