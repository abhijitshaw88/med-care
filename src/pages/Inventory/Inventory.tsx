import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  LinearProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Warning,
  CheckCircle,
  Schedule,
  LocalOffer,
  Inventory as InventoryIcon,
  QrCode,
  FilterList,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock data
const inventoryItems = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    salt: 'Paracetamol',
    manufacturer: 'Cipla',
    category: 'Pain Relief',
    batch: 'BATCH001',
    mrp: 15,
    costPrice: 8,
    sellingPrice: 12,
    currentStock: 150,
    minStock: 50,
    maxStock: 200,
    expiryDate: '2024-12-31',
    rackLocation: 'A1-B2',
    barcode: '8901234567890',
    status: 'active',
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    salt: 'Amoxicillin',
    manufacturer: 'Sun Pharma',
    category: 'Antibiotics',
    batch: 'BATCH002',
    mrp: 45,
    costPrice: 25,
    sellingPrice: 38,
    currentStock: 8,
    minStock: 30,
    maxStock: 100,
    expiryDate: '2024-06-15',
    rackLocation: 'A2-C1',
    barcode: '8901234567891',
    status: 'low_stock',
  },
  {
    id: 3,
    name: 'Vitamin D3 1000IU',
    salt: 'Cholecalciferol',
    manufacturer: 'HealthVit',
    category: 'Vitamins',
    batch: 'BATCH003',
    mrp: 120,
    costPrice: 60,
    sellingPrice: 95,
    currentStock: 60,
    minStock: 40,
    maxStock: 150,
    expiryDate: '2025-03-20',
    rackLocation: 'B1-A3',
    barcode: '8901234567892',
    status: 'active',
  },
  {
    id: 4,
    name: 'Omeprazole 20mg',
    salt: 'Omeprazole',
    manufacturer: 'Dr. Reddy\'s',
    category: 'Gastrointestinal',
    batch: 'BATCH004',
    mrp: 85,
    costPrice: 45,
    sellingPrice: 72,
    currentStock: 5,
    minStock: 25,
    maxStock: 80,
    expiryDate: '2024-08-10',
    rackLocation: 'B2-D1',
    barcode: '8901234567893',
    status: 'low_stock',
  },
];

const categories = ['All', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Gastrointestinal', 'Diabetes', 'Cardiovascular'];

const Inventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.salt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.barcode.includes(searchQuery);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = filteredItems.filter(item => item.currentStock <= item.minStock);
  const expiringItems = filteredItems.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  });

  const getStockPercentage = (current: number, max: number) => (current / max) * 100;
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'low_stock': return 'warning';
      case 'out_of_stock': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle />;
      case 'low_stock': return <Warning />;
      case 'out_of_stock': return <Schedule />;
      default: return <Inventory />;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Inventory Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your pharmaceutical inventory, track stock levels, and monitor expiry dates.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <motion.div whileHover={{ y: -4 }}>
          <Card sx={{ minWidth: 200 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                 <InventoryIcon color="primary" />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {inventoryItems.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Products
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <Card sx={{ minWidth: 200 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Warning color="warning" />
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {lowStockItems.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Low Stock Items
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <Card sx={{ minWidth: 200 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Schedule color="error" />
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="error.main">
                    {expiringItems.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expiring Soon
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: '1 1 300px' }}
            />
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? 'primary' : 'default'}
                  variant={selectedCategory === category ? 'filled' : 'outlined'}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowAddDialog(true)}
            >
              Add Product
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardContent>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} sx={{ mb: 3 }}>
            <Tab label={`All Products (${filteredItems.length})`} />
            <Tab label={`Low Stock (${lowStockItems.length})`} />
            <Tab label={`Expiring Soon (${expiringItems.length})`} />
          </Tabs>

          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Expiry</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(selectedTab === 0 ? filteredItems : 
                  selectedTab === 1 ? lowStockItems : expiringItems).map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.salt} • {item.manufacturer}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Batch: {item.batch}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.category} size="small" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 100 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">
                            {item.currentStock}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            /{item.maxStock}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={getStockPercentage(item.currentStock, item.maxStock)}
                          color={item.currentStock <= item.minStock ? 'warning' : 'primary'}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          ₹{item.sellingPrice}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          MRP: ₹{item.mrp}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </Typography>
                      {new Date(item.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                        <Chip
                          label="Expiring Soon"
                          size="small"
                          color="warning"
                          sx={{ mt: 0.5 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {item.rackLocation}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(item.status)}
                        label={item.status.replace('_', ' ')}
                        color={getStatusColor(item.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter the product details to add it to your inventory.
          </Typography>
          {/* Add form fields here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory; 