
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CustomerCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  lastPurchase: string;
  avatar?: string;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  id,
  name,
  email,
  phone,
  loyaltyPoints,
  lastPurchase,
  avatar
}) => {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Determine loyalty tier
  const getLoyaltyTier = () => {
    if (loyaltyPoints >= 501) return { tier: 'Gold', color: 'bg-amber-500' };
    if (loyaltyPoints >= 101) return { tier: 'Silver', color: 'bg-gray-400' };
    return { tier: 'Bronze', color: 'bg-amber-700' };
  };
  
  const loyalty = getLoyaltyTier();
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start">
        <div className="relative">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              {getInitials(name)}
            </div>
          )}
          <div className={cn(
            "absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white",
            loyalty.color
          )}>
            {loyalty.tier === 'Gold' && (
              <span className="flex h-full items-center justify-center text-white text-xs">
                ★
              </span>
            )}
          </div>
        </div>
        
        <div className="ml-4 flex-1">
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="mt-1 text-sm text-gray-600">
            <div>{email}</div>
            <div>{phone}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-500">Loyalty Points</div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 font-medium">{loyaltyPoints}</span>
            <span className="ml-2 text-xs text-gray-500">{loyalty.tier}</span>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500">Last Purchase</div>
          <div className="font-medium">{lastPurchase}</div>
        </div>
      </div>
      
      <div className="mt-4">
        <Button variant="outline" className="w-full">
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default CustomerCard;
