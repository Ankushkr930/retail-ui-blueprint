
import React, { useState } from 'react';
import ProductCard from '@/components/pos/ProductCard';
import CartItem from '@/components/pos/CartItem';
import { Button } from '@/components/ui/button';
import PaymentModal from '@/components/pos/PaymentModal';
import PaymentSuccess from '@/components/pos/PaymentSuccess';
import { toast } from '@/components/ui/use-toast';

// Sample product data
const sampleProducts = [
  { id: '1', name: 'T-Shirt', price: 19.99, stock: 25, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop' },
  { id: '2', name: 'Jeans', price: 49.99, stock: 10, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop' },
  { id: '3', name: 'Sneakers', price: 79.99, stock: 8, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop' },
  { id: '4', name: 'Hat', price: 14.99, stock: 30, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&auto=format&fit=crop' },
  { id: '5', name: 'Sunglasses', price: 24.99, stock: 15, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop' },
  { id: '6', name: 'Watch', price: 99.99, stock: 5, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop' },
  { id: '7', name: 'Backpack', price: 39.99, stock: 12, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop' },
  { id: '8', name: 'Jacket', price: 89.99, stock: 7, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop' },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const POS: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  
  // Filter products based on search query
  const filteredProducts = sampleProducts.filter(
    product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );
  
  // Add product to cart
  const addToCart = (product: typeof sampleProducts[0]) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product exists in cart, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Product doesn't exist in cart, add new item
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }];
      }
    });
  };
  
  // Increase item quantity
  const increaseQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  // Decrease item quantity
  const decreaseQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };
  
  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Handle payment completion
  const handlePaymentComplete = (method: string) => {
    setPaymentModalOpen(false);
    
    // Generate a random transaction ID
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setTransactionId(randomId);
    setPaymentMethod(method);
    
    // Show loading state
    toast({
      title: "Processing payment...",
      description: "Please wait while we process your payment.",
    });
    
    // Simulate payment processing
    setTimeout(() => {
      setSuccessModalOpen(true);
    }, 1500);
  };

  // Handle new sale after successful payment
  const handleNewSale = () => {
    setSuccessModalOpen(false);
    setCartItems([]);
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Products Section */}
      <div className="flex-1 p-4 lg:p-6 overflow-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              image={product.image}
              onAddToCart={() => addToCart(product)}
            />
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
      
      {/* Cart Section */}
      <div className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <div className="text-sm text-gray-500">{cartItems.length} items</div>
        </div>
        
        <div className="flex-grow overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))
          )}
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-medium">Tax (7%)</span>
            <span>${(cartTotal * 0.07).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>${(cartTotal * 1.07).toFixed(2)}</span>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary-hover py-3"
            disabled={cartItems.length === 0}
            onClick={() => setPaymentModalOpen(true)}
          >
            Complete Sale
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onComplete={handlePaymentComplete}
        amount={cartTotal * 1.07}
      />

      {/* Success Modal */}
      <PaymentSuccess
        isOpen={isSuccessModalOpen}
        onClose={handleNewSale}
        paymentMethod={paymentMethod}
        transactionId={transactionId}
        amount={cartTotal * 1.07}
      />
    </div>
  );
};

export default POS;
