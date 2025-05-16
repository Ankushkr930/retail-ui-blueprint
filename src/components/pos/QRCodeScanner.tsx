
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface QRCodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ isOpen, onClose, onComplete }) => {
  const [scanning, setScanning] = useState(false);

  // Simulate QR code scanning (in a real app, this would use a camera API)
  const startScanning = () => {
    setScanning(true);
    
    // Simulate successful scan after 2 seconds
    setTimeout(() => {
      const mockPaymentData = {
        provider: "Mobile Pay",
        id: Math.random().toString(36).substring(2, 10).toUpperCase(),
        timestamp: new Date().toISOString()
      };
      
      setScanning(false);
      toast({
        title: "QR Code Scanned Successfully",
        description: "Payment information captured",
      });
      onComplete(JSON.stringify(mockPaymentData));
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Scan QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 flex flex-col items-center">
          <div className="bg-gray-100 w-64 h-64 mb-4 relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            {scanning ? (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-primary absolute animate-[qrScan_2s_ease-in-out_infinite]"></div>
                </div>
                <span className="text-gray-500">Scanning...</span>
              </>
            ) : (
              <div className="text-center text-gray-500">
                <QrCode className="h-16 w-16 mx-auto mb-2 text-gray-400" />
                <p>QR code scanning area</p>
                <p className="text-xs">Camera will activate when scanning starts</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-4 mt-4 w-full">
            <Button
              onClick={startScanning}
              className="flex-1"
              disabled={scanning}
            >
              {scanning ? "Scanning..." : "Start Scan"}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Position the QR code within the frame to scan.
            Make sure the code is well-lit and clearly visible.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeScanner;
