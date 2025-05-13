
import React, { useState } from 'react';
import InventoryRow from '@/components/inventory/InventoryRow';
import StockAlertBadge from '@/components/inventory/StockAlertBadge';
import { Button } from '@/components/ui/button';

// Sample inventory data
const sampleInventory = [
  { id: '1', name: 'T-Shirt', sku: 'TSHIRT-001', price: 19.99, stock: 25, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200&auto=format&fit=crop' },
  { id: '2', name: 'Jeans', sku: 'JEANS-101', price: 49.99, stock: 10, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&auto=format&fit=crop' },
  { id: '3', name: 'Sneakers', sku: 'SNKR-202', price: 79.99, stock: 2, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&auto=format&fit=crop' },
  { id: '4', name: 'Hat', sku: 'HAT-303', price: 14.99, stock: 30, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&auto=format&fit=crop' },
  { id: '5', name: 'Sunglasses', sku: 'SUNG-404', price: 24.99, stock: 15, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&auto=format&fit=crop' },
  { id: '6', name: 'Watch', sku: 'WTCH-505', price: 99.99, stock: 5, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200&auto=format&fit=crop' },
  { id: '7', name: 'Backpack', sku: 'BKPK-606', price: 39.99, stock: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&auto=format&fit=crop' },
  { id: '8', name: 'Jacket', sku: 'JCKT-707', price: 89.99, stock: 7, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&auto=format&fit=crop' },
];

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState(sampleInventory);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter inventory based on search query
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get low stock items count
  const lowStockCount = inventory.filter(item => item.stock < 5).length;
  
  // Handler for edit action
  const handleEdit = (id: string) => {
    console.log(`Edit item with ID: ${id}`);
    // Here you would typically open a modal for editing
  };
  
  // Handler for delete action
  const handleDelete = (id: string) => {
    console.log(`Delete item with ID: ${id}`);
    // Here you would typically show a confirmation dialog
    if (confirm('Are you sure you want to delete this item?')) {
      setInventory(prevInventory => 
        prevInventory.filter(item => item.id !== id)
      );
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-gray-500">
            {inventory.length} items in stock, {lowStockCount} items low on stock
          </p>
        </div>
        <Button className="bg-primary">Add Product</Button>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item, index) => (
              <InventoryRow
                key={item.id}
                id={item.id}
                name={item.name}
                sku={item.sku}
                price={item.price}
                stock={item.stock}
                image={item.image}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isEven={index % 2 === 0}
              />
            ))}
            
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
