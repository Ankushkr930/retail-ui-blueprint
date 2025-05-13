
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data for charts
const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
  { month: 'Jul', sales: 3490 },
];

const categoryData = [
  { name: 'Clothing', value: 400 },
  { name: 'Shoes', value: 300 },
  { name: 'Accessories', value: 200 },
  { name: 'Electronics', value: 100 },
];

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'];

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('sales');
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-gray-500">Analyze your business performance</p>
      </div>
      
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={reportType === 'sales' ? 'default' : 'outline'}
            onClick={() => setReportType('sales')}
          >
            Sales Report
          </Button>
          <Button 
            variant={reportType === 'inventory' ? 'default' : 'outline'}
            onClick={() => setReportType('inventory')}
          >
            Inventory Analysis
          </Button>
          <Button 
            variant={reportType === 'customers' ? 'default' : 'outline'}
            onClick={() => setReportType('customers')}
          >
            Customer Insights
          </Button>
        </div>
      </div>
      
      {reportType === 'sales' && (
        <div className="space-y-6">
          <Card className="p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Monthly Sales Overview</h3>
              <Button variant="outline" size="sm">Export</Button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#2563EB" name="Sales ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Top Selling Products</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">T-Shirt</span>
                  <span>85 units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sneakers</span>
                  <span>42 units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">Watch</span>
                  <span>38 units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '38%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">Backpack</span>
                  <span>27 units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '27%' }}></div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Sales by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          <Card className="p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Sales Data Table</h3>
              <Button variant="outline" size="sm">Export CSV</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-3 text-gray-600 text-sm font-medium">Date</th>
                    <th className="p-3 text-gray-600 text-sm font-medium">Orders</th>
                    <th className="p-3 text-gray-600 text-sm font-medium">Revenue</th>
                    <th className="p-3 text-gray-600 text-sm font-medium">Avg. Order Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-sm">May 13, 2025</td>
                    <td className="p-3 text-sm">24</td>
                    <td className="p-3 text-sm font-medium">$1,204.50</td>
                    <td className="p-3 text-sm">$50.19</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-sm">May 12, 2025</td>
                    <td className="p-3 text-sm">31</td>
                    <td className="p-3 text-sm font-medium">$1,689.99</td>
                    <td className="p-3 text-sm">$54.52</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-sm">May 11, 2025</td>
                    <td className="p-3 text-sm">18</td>
                    <td className="p-3 text-sm font-medium">$926.45</td>
                    <td className="p-3 text-sm">$51.47</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-sm">May 10, 2025</td>
                    <td className="p-3 text-sm">22</td>
                    <td className="p-3 text-sm font-medium">$1,155.30</td>
                    <td className="p-3 text-sm">$52.51</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 text-sm">May 9, 2025</td>
                    <td className="p-3 text-sm">28</td>
                    <td className="p-3 text-sm font-medium">$1,457.76</td>
                    <td className="p-3 text-sm">$52.06</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing 5 of 30 entries
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {reportType === 'inventory' && (
        <Card className="p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Inventory Report</h3>
          <p className="text-gray-500 mb-8">View detailed inventory analytics.</p>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { category: 'T-Shirts', stock: 25, reorder: 10 },
                  { category: 'Jeans', stock: 10, reorder: 5 },
                  { category: 'Sneakers', stock: 2, reorder: 5 },
                  { category: 'Hats', stock: 30, reorder: 15 },
                  { category: 'Watches', stock: 5, reorder: 3 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#2563EB" name="Current Stock" />
                <Bar dataKey="reorder" fill="#F59E0B" name="Reorder Point" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
      
      {reportType === 'customers' && (
        <Card className="p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Customer Report</h3>
          <p className="text-gray-500 mb-8">View detailed customer analytics.</p>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { month: 'Jan', new: 5, returning: 10 },
                  { month: 'Feb', new: 8, returning: 12 },
                  { month: 'Mar', new: 12, returning: 18 },
                  { month: 'Apr', new: 10, returning: 20 },
                  { month: 'May', new: 15, returning: 25 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="new" stroke="#2563EB" name="New Customers" />
                <Line type="monotone" dataKey="returning" stroke="#10B981" name="Returning Customers" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Reports;
