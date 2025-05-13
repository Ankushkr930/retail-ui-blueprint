
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface PaymentSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: string;
  transactionId: string;
  amount: number;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ 
  isOpen, 
  onClose, 
  paymentMethod,
  transactionId,
  amount
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-center">
            <CheckCircle className="h-6 w-6 text-secondary" />
            Payment Complete
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 text-center">
          <div className="mb-4">
            <div className="text-3xl font-bold text-secondary mb-2">${amount.toFixed(2)}</div>
            <div className="text-gray-500">Transaction Successful</div>
          </div>
          
          <div className="bg-gray-50 rounded-md p-4 mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500 text-left">Payment Method:</div>
              <div className="font-medium text-right capitalize">{paymentMethod}</div>
              
              <div className="text-gray-500 text-left">Transaction ID:</div>
              <div className="font-medium text-right">{transactionId}</div>
              
              <div className="text-gray-500 text-left">Date & Time:</div>
              <div className="font-medium text-right">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="text-green-600 bg-green-50 rounded-md p-2 text-sm">
            Receipt has been emailed to the customer
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} className="w-full">
            New Sale
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccess;
