
import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryRowProps {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  image?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isEven: boolean;
}

const InventoryRow: React.FC<InventoryRowProps> = ({
  id,
  name,
  sku,
  price,
  stock,
  image,
  onEdit,
  onDelete,
  isEven
}) => {
  // Determine stock level color
  const getStockLevelClass = () => {
    if (stock < 5) return "text-danger";
    if (stock < 20) return "text-accent";
    return "text-secondary";
  };

  return (
    <tr className={isEven ? "bg-gray-50" : "bg-white"}>
      <td className="p-3">
        <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>
      </td>
      <td className="p-3 font-medium">{name}</td>
      <td className="p-3 font-mono text-sm">{sku}</td>
      <td className="p-3 font-medium">${price.toFixed(2)}</td>
      <td className="p-3">
        <span className={cn("font-medium", getStockLevelClass())}>
          {stock}
        </span>
        {stock < 3 && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-danger text-white animate-pulse">
            !
          </span>
        )}
      </td>
      <td className="p-3">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onEdit(id)}
            className="p-1 text-primary hover:text-primary-hover"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => onDelete(id)}
            className="p-1 text-danger hover:text-red-700"
          >
            <Trash size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryRow;
