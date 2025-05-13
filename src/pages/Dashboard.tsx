
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card } from '@/components/ui/card';

// Sample data for charts
const salesData = [
  { date: '05/01', sales: 1200 },
  { date: '05/02', sales: 1800 },
  { date: '05/03', sales: 1400 },
  { date: '05/04', sales: 2200 },
  { date: '05/05', sales: 2100 },
  { date: '05/06', sales: 1900 },
  { date: '05/07', sales: 2400 },
  { date: '05/08', sales: 2700 },
  { date: '05/09', sales: 2300 },
  { date: '05/10', sales: 2100 },
  { date: '05/11', sales: 1900 },
  { date: '05/12', sales: 2200 },
  { date: '05/13', sales: 2500 },
];

const inventoryData = [
  { category: 'Clothing', count: 120 },
  { category: 'Shoes', count: 80 },
  { category: 'Accessories', count: 150 },
  { category: 'Electronics', count: 60 },
];

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: 'up' | 'down';
  trendValue?: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description, 
  trend, 
  trendValue 
}) => {
  return (
    <Card className="p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <span className={`ml-2 text-sm font-medium flex items-center ${
            trend === 'up' ? 'text-secondary' : 'text-danger'
          }`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your store.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Revenue Today"
          value="$1,210.00"
          description="Daily revenue"
          trend="up"
          trendValue="12%"
        />
        <StatsCard
          title="Orders"
          value="16"
          description="Today's orders"
          trend="down"
          trendValue="3%"
        />
        <StatsCard
          title="Customers"
          value="3"
          description="New today"
        />
        <StatsCard
          title="Low Stock"
          value="5"
          description="Items to reorder"
          trend="up"
          trendValue="2"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Sales Trend (Last 14 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#2563EB" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-100 mr-3"></div>
                <div>
                  <p className="font-medium">T-Shirt</p>
                  <p className="text-sm text-gray-500">SKU: TSHIRT-001</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$19.99</p>
                <p className="text-sm text-gray-500">85 units</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-100 mr-3"></div>
                <div>
                  <p className="font-medium">Sneakers</p>
                  <p className="text-sm text-gray-500">SKU: SNKR-202</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$79.99</p>
                <p className="text-sm text-gray-500">42 units</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-100 mr-3"></div>
                <div>
                  <p className="font-medium">Watch</p>
                  <p className="text-sm text-gray-500">SKU: WTCH-505</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$99.99</p>
                <p className="text-sm text-gray-500">38 units</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-100 mr-3"></div>
                <div>
                  <p className="font-medium">Backpack</p>
                  <p className="text-sm text-gray-500">SKU: BKPK-606</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$39.99</p>
                <p className="text-sm text-gray-500">27 units</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <Card className="p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <button className="text-primary font-medium">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-3 text-gray-600 text-sm font-medium">Order ID</th>
                <th className="p-3 text-gray-600 text-sm font-medium">Customer</th>
                <th className="p-3 text-gray-600 text-sm font-medium">Date</th>
                <th className="p-3 text-gray-600 text-sm font-medium">Amount</th>
                <th className="p-3 text-gray-600 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-3 text-sm font-medium">#ORD-001</td>
                <td className="p-3 text-sm">John Smith</td>
                <td className="p-3 text-sm">May 13, 2025</td>
                <td className="p-3 text-sm font-medium">$122.99</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 text-sm font-medium">#ORD-002</td>
                <td className="p-3 text-sm">Alice Johnson</td>
                <td className="p-3 text-sm">May 13, 2025</td>
                <td className="p-3 text-sm font-medium">$75.50</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Processing
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 text-sm font-medium">#ORD-003</td>
                <td className="p-3 text-sm">Robert Davis</td>
                <td className="p-3 text-sm">May 12, 2025</td>
                <td className="p-3 text-sm font-medium">$249.99</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 text-sm font-medium">#ORD-004</td>
                <td className="p-3 text-sm">Emily Wilson</td>
                <td className="p-3 text-sm">May 12, 2025</td>
                <td className="p-3 text-sm font-medium">$45.00</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    Shipped
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 text-sm font-medium">#ORD-005</td>
                <td className="p-3 text-sm">Michael Brown</td>
                <td className="p-3 text-sm">May 11, 2025</td>
                <td className="p-3 text-sm font-medium">$189.99</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    Refunded
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
