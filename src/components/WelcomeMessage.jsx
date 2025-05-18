
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const WelcomeMessage = ({ name, discount, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 left-4 md:left-auto md:w-96 bg-primary text-white p-4 rounded-lg shadow-lg z-50 animate-in slide-in-from-top">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg mb-1">Welcome back, {name}!</h3>
          <p className="text-sm opacity-90 mb-2">
            We've missed you! Enjoy a special {discount}% discount on your next purchase.
          </p>
          <p className="text-xs opacity-80">
            This message will close in {timeLeft} seconds
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
