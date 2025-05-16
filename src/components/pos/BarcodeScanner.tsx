
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Barcode } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ isOpen, onClose, onScan }) => {
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');

  // Simulate barcode scanning (in a real app, this would use a camera or scanner API)
  const startScanning = () => {
    setScanning(true);
    
    // Simulate successful scan after 1.5 seconds
    setTimeout(() => {
      const mockBarcode = Math.floor(10000000000 + Math.random() * 90000000000).toString();
      setScanning(false);
      onScan(mockBarcode);
      toast({
        title: "Product Scanned",
        description: `Barcode: ${mockBarcode}`,
      });
    }, 1500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onScan(manualCode);
      setManualCode('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Barcode className="h-5 w-5" />
            Scan Product Barcode
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4 flex flex-col items-center">
          <div className="bg-gray-100 w-full h-32 mb-4 relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            {scanning ? (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-red-500 absolute animate-[barcodeScan_1.5s_ease-in-out_infinite]"></div>
                </div>
                <span className="text-gray-500">Scanning...</span>
              </>
            ) : (
              <div className="text-center text-gray-500">
                <Barcode className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p>Barcode scanning area</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-4 mt-2 w-full">
            <Button
              onClick={startScanning}
              className="flex-1"
              disabled={scanning}
            >
              {scanning ? "Scanning..." : "Scan Barcode"}
            </Button>
          </div>
          
          <div className="w-full mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or enter manually</span>
              </div>
            </div>
            
            <form onSubmit={handleManualSubmit} className="mt-4 flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Enter barcode number"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" variant="outline">
                Add
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScanner;
