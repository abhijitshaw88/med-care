import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  // Grid,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button,
  IconButton,
  // useTheme,
  // useMediaQuery,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShoppingCart,
  People,
  Inventory,
  CheckCircle,
  Schedule,
  Warning,
  MoreVert,
  Add,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  // BarChart,
  // Bar,
} from 'recharts';
import { motion } from 'framer-motion';
import {
  salesData,
  categoryData,
  recentTransactions,
  lowStockItems,
} from '../../data/mockData';

const StatCard = ({ title, value, change, icon, color }: any) => {
  const isPositive = change >= 0;
  
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: `${color}.light`,
                color: `${color}.main`,
                width: 48,
                height: 48,
              }}
            >
              {icon}
            </Avatar>
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPositive ? (
              <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
            ) : (
              <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
            )}
            <Typography
              variant="body2"
              color={isPositive ? 'success.main' : 'error.main'}
              fontWeight="500"
            >
              {isPositive ? '+' : ''}{change}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              from last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Dashboard = () => {
  // const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hi, Admin! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your medical shop today
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <StatCard
          title="Today's Sales"
          value="₹45,250"
          change={12.5}
          icon={<AttachMoney />}
          color="success"
        />
        <StatCard
          title="Total Orders"
          value="156"
          change={-2.3}
          icon={<ShoppingCart />}
          color="primary"
        />
        <StatCard
          title="Active Customers"
          value="1,234"
          change={8.7}
          icon={<People />}
          color="info"
        />
        <StatCard
          title="Inventory Items"
          value="2,847"
          change={-1.2}
          icon={<Inventory />}
          color="warning"
        />
      </Box>

      {/* Charts Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}>
        <motion.div whileHover={{ y: -2 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Sales & Profit Trend
                </Typography>
                <Chip label="This Week" color="primary" size="small" />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#2563eb"
                    strokeWidth={3}
                    name="Sales"
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Profit"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ y: -2 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Sales by Category
                </Typography>
                <Chip label="This Month" color="secondary" size="small" />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Bottom Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        <motion.div whileHover={{ y: -2 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Recent Transactions
                </Typography>
                <Button size="small" color="primary" startIcon={<Add />}>
                  View All
                </Button>
              </Box>
              <List sx={{ p: 0 }}>
                {recentTransactions.map((transaction, index) => (
                  <React.Fragment key={transaction.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: transaction.status === 'completed' ? 'success.light' : 'warning.light',
                            color: transaction.status === 'completed' ? 'success.main' : 'warning.main',
                          }}
                        >
                          {transaction.status === 'completed' ? <CheckCircle /> : <Schedule />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={transaction.customer.name}
                        secondary={`${transaction.items} items • ${transaction.time}`}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body1" fontWeight="bold" color="primary">
                          ₹{transaction.amount.toLocaleString()}
                        </Typography>
                        <Chip
                          label={transaction.status}
                          size="small"
                          color={transaction.status === 'completed' ? 'success' : 'warning'}
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </ListItem>
                    {index < recentTransactions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ y: -2 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Low Stock Alerts
                </Typography>
                <Chip
                  icon={<Warning />}
                  label={`${lowStockItems.length} items`}
                  color="warning"
                  size="small"
                />
              </Box>
              <List sx={{ p: 0 }}>
                {lowStockItems.map((item, index) => (
                  <React.Fragment key={item.name}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Current: ${item.current} | Min: ${item.min}`}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 120 }}>
                        <Box sx={{ width: 80 }}>
                          <LinearProgress
                            variant="determinate"
                            value={item.percentage}
                            color="warning"
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" fontWeight="500">
                          {item.percentage}%
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < lowStockItems.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 3 }}>
                <Button variant="outlined" color="warning" fullWidth>
                  Generate Purchase Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Dashboard; 