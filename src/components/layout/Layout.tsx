
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen bg-gray-light overflow-hidden">
      {!isMobile && <Sidebar />}
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
          {children}
        </div>
      </main>
      
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Layout;
