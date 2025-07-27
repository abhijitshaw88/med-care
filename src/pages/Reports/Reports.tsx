import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  TrendingDown,
  Download,
  Print,
  DateRange,
  AttachMoney,
  ShoppingCart,
  Inventory,
  Receipt,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data
const salesData = [
  { month: 'Jan', sales: 45000, profit: 12000, orders: 156 },
  { month: 'Feb', sales: 52000, profit: 14000, orders: 178 },
  { month: 'Mar', sales: 48000, profit: 13000, orders: 165 },
  { month: 'Apr', sales: 61000, profit: 18000, orders: 210 },
  { month: 'May', sales: 55000, profit: 15000, orders: 185 },
  { month: 'Jun', sales: 67000, profit: 20000, orders: 225 },
];

const topProducts = [
  { name: 'Paracetamol 500mg', sales: 12500, quantity: 1250, profit: 4000 },
  { name: 'Amoxicillin 250mg', sales: 8900, quantity: 445, profit: 3200 },
  { name: 'Vitamin D3 1000IU', sales: 7600, quantity: 80, profit: 2800 },
  { name: 'Omeprazole 20mg', sales: 6800, quantity: 95, profit: 2400 },
];

const gstData = [
  { month: 'Jan', gstCollected: 8100, gstPaid: 5400, netGST: 2700 },
  { month: 'Feb', gstCollected: 9360, gstPaid: 6300, netGST: 3060 },
  { month: 'Mar', gstCollected: 8640, gstPaid: 5850, netGST: 2790 },
  { month: 'Apr', gstCollected: 10980, gstPaid: 7200, netGST: 3780 },
  { month: 'May', gstCollected: 9900, gstPaid: 6750, netGST: 3150 },
  { month: 'Jun', gstCollected: 12060, gstPaid: 8100, netGST: 3960 },
];

const Reports: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateRange, setDateRange] = useState('month');

  const StatCard = ({ title, value, change, icon, color }: any) => (
    <motion.div whileHover={{ y: -4 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="text.secondary" gutterBottom variant="body2">
                {title}
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {change > 0 ? (
                  <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                ) : (
                  <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                )}
                <Typography
                  variant="body2"
                  color={change > 0 ? 'success.main' : 'error.main'}
                >
                  {Math.abs(change)}% from last period
                </Typography>
              </Box>
            </Box>
            <Box sx={{ color: `${color}.main` }}>
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Reports & Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive reports for sales, inventory, GST compliance, and financial analysis.
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 250px' }}>
          <StatCard
            title="Total Sales"
            value="₹3,28,000"
            change={12.5}
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px' }}>
          <StatCard
            title="Total Orders"
            value="1,119"
            change={8.3}
            icon={<ShoppingCart sx={{ fontSize: 40 }} />}
            color="primary"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px' }}>
          <StatCard
            title="Gross Profit"
            value="₹92,000"
            change={15.2}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="info"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px' }}>
          <StatCard
            title="GST Collected"
            value="₹59,040"
            change={12.8}
            icon={<Receipt sx={{ fontSize: 40 }} />}
            color="warning"
          />
        </Box>
      </Box>

      {/* Date Range Selector */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={(e) => setDateRange(e.target.value)}
              >
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" startIcon={<Download />}>
              Export Report
            </Button>
            <Button variant="outlined" startIcon={<Print />}>
              Print Report
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Card>
        <CardContent>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="Sales Report" />
            <Tab label="GST Report" />
            <Tab label="Inventory Report" />
            <Tab label="Top Products" />
          </Tabs>

          {selectedTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Sales Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#2196f3"
                    strokeWidth={2}
                    name="Sales"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#4caf50"
                    strokeWidth={2}
                    name="Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}

          {selectedTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                GST Summary
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gstData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="gstCollected" fill="#2196f3" name="GST Collected" />
                  <Bar dataKey="gstPaid" fill="#ff9800" name="GST Paid" />
                  <Bar dataKey="netGST" fill="#4caf50" name="Net GST" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          )}

          {selectedTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Inventory Status
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>Total Items</TableCell>
                      <TableCell>Low Stock</TableCell>
                      <TableCell>Out of Stock</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Pain Relief</TableCell>
                      <TableCell>45</TableCell>
                      <TableCell>
                        <Chip label="3" color="warning" size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label="0" color="success" size="small" />
                      </TableCell>
                      <TableCell>₹12,500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Antibiotics</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>
                        <Chip label="5" color="warning" size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label="1" color="error" size="small" />
                      </TableCell>
                      <TableCell>₹18,900</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vitamins</TableCell>
                      <TableCell>28</TableCell>
                      <TableCell>
                        <Chip label="2" color="warning" size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label="0" color="success" size="small" />
                      </TableCell>
                      <TableCell>₹15,600</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {selectedTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Top Selling Products
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Sales Value</TableCell>
                      <TableCell>Quantity Sold</TableCell>
                      <TableCell>Profit</TableCell>
                      <TableCell>Performance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={product.name}>
                        <TableCell>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {product.name}
                            </Typography>
                            <Chip
                              label={`#${index + 1}`}
                              size="small"
                              color="primary"
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>₹{product.sales.toLocaleString()}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>₹{product.profit.toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip
                            label="High"
                            color="success"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports; 