
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditCard, Banknote, Wallet } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (method: string) => void;
  amount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onComplete, 
  amount 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Select a payment method to complete the transaction
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="text-lg font-bold text-center">
            Total: ${amount.toFixed(2)}
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Button 
              onClick={() => onComplete('card')}
              className="flex items-center justify-center gap-2 h-16"
              variant="outline"
            >
              <CreditCard className="h-6 w-6" />
              <div>
                <div className="font-medium">Card Payment</div>
                <div className="text-xs text-gray-500">Credit or Debit Card</div>
              </div>
            </Button>
            
            <Button 
              onClick={() => onComplete('cash')}
              className="flex items-center justify-center gap-2 h-16"
              variant="outline"
            >
              <Banknote className="h-6 w-6" />
              <div>
                <div className="font-medium">Cash Payment</div>
                <div className="text-xs text-gray-500">Physical Cash</div>
              </div>
            </Button>
            
            <Button 
              onClick={() => onComplete('mobile')}
              className="flex items-center justify-center gap-2 h-16"
              variant="outline"
            >
              <Wallet className="h-6 w-6" />
              <div>
                <div className="font-medium">Mobile Wallet</div>
                <div className="text-xs text-gray-500">Apple Pay, Google Pay, etc.</div>
              </div>
            </Button>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
