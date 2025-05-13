
import React, { useState } from 'react';
import CustomerCard from '@/components/customers/CustomerCard';
import { Button } from '@/components/ui/button';

// Sample customer data
const sampleCustomers = [
  { 
    id: '1', 
    name: 'John Smith', 
    email: 'john.smith@example.com', 
    phone: '(555) 123-4567', 
    loyaltyPoints: 650, 
    lastPurchase: 'May 11, 2025', 
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  { 
    id: '2', 
    name: 'Emily Johnson', 
    email: 'emily.j@example.com', 
    phone: '(555) 234-5678', 
    loyaltyPoints: 320, 
    lastPurchase: 'May 10, 2025', 
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  { 
    id: '3', 
    name: 'Michael Brown', 
    email: 'michael.brown@example.com', 
    phone: '(555) 345-6789', 
    loyaltyPoints: 85, 
    lastPurchase: 'May 9, 2025', 
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  { 
    id: '4', 
    name: 'Sarah Davis', 
    email: 'sarah.d@example.com', 
    phone: '(555) 456-7890', 
    loyaltyPoints: 150, 
    lastPurchase: 'May 8, 2025', 
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  { 
    id: '5', 
    name: 'Robert Wilson', 
    email: 'robert.w@example.com', 
    phone: '(555) 567-8901', 
    loyaltyPoints: 420, 
    lastPurchase: 'May 7, 2025', 
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  { 
    id: '6', 
    name: 'Jennifer Taylor', 
    email: 'jennifer.t@example.com', 
    phone: '(555) 678-9012', 
    loyaltyPoints: 550, 
    lastPurchase: 'May 7, 2025', 
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
  },
];

const Customers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter customers based on search query
  const filteredCustomers = sampleCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-gray-500">Manage your customer relationships</p>
        </div>
        <Button className="bg-primary">Add Customer</Button>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map(customer => (
          <CustomerCard
            key={customer.id}
            id={customer.id}
            name={customer.name}
            email={customer.email}
            phone={customer.phone}
            loyaltyPoints={customer.loyaltyPoints}
            lastPurchase={customer.lastPurchase}
            avatar={customer.avatar}
          />
        ))}
        
        {filteredCustomers.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No customers found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
