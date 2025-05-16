
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendReceipt = (type: 'email' | 'sms') => {
    setIsSending(true);
    
    // This would connect to your backend in a real implementation
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Receipt Sent",
        description: type === 'email' 
          ? `Receipt sent to ${email}` 
          : `Receipt sent to ${phone}`,
      });
    }, 1500);
  };

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
          
          <div className="space-y-3 mb-4">
            <div className="text-left font-medium">Send Digital Receipt</div>
            
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="customer@example.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                onClick={() => sendReceipt('email')}
                disabled={!email || isSending}
                className="flex items-center gap-1"
              >
                <Mail className="h-4 w-4" />
                {isSending ? 'Sending...' : 'Email'}
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="tel"
                placeholder="+1 123 456 7890"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button 
                onClick={() => sendReceipt('sms')}
                disabled={!phone || isSending}
                className="flex items-center gap-1"
              >
                <Send className="h-4 w-4" />
                {isSending ? 'Sending...' : 'SMS'}
              </Button>
            </div>
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
