import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Avatar,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Inventory as InventoryIcon,
  Warning,
  TrendingUp,
  TrendingDown,
  FilterList,
  QrCode,
  LocalOffer,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { products, categories } from '../../data/mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Helper functions
const getStockPercentage = (current: number, max: number) => {
  return Math.round((current / max) * 100);
};

const getStockColor = (percentage: number) => {
  if (percentage <= 20) return 'error';
  if (percentage <= 50) return 'warning';
  return 'success';
};

const getExpiryStatus = (expiryDate: string) => {
  const daysUntilExpiry = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilExpiry < 0) return { label: 'Expired', color: 'error' as const };
  if (daysUntilExpiry <= 30) return { label: 'Expiring Soon', color: 'warning' as const };
  return { label: 'Valid', color: 'success' as const };
};

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tabValue, setTabValue] = useState(0);
  const [addProductDialog, setAddProductDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.salt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesTab = tabValue === 0 || 
                      (tabValue === 1 && product.status === 'low_stock') ||
                      (tabValue === 2 && new Date(product.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const stats = {
    total: products.length,
    lowStock: products.filter(p => p.status === 'low_stock').length,
    expiringSoon: products.filter(p => new Date(p.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length,
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Inventory Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track stock levels, manage products, and monitor expiry dates.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <motion.div whileHover={{ y: -4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Products
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                  <InventoryIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {stats.lowStock}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Low Stock Items
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.main' }}>
                  <Warning />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="error.main">
                    {stats.expiringSoon}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expiring Soon
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.light', color: 'error.main' }}>
                  <TrendingDown />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
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
              sx={{ flex: 1, minWidth: 200 }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddProductDialog(true)}
            >
              Add Product
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="All Products" />
            <Tab label="Low Stock" />
            <Tab label="Expiring Soon" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <InventoryTable products={filteredProducts} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <InventoryTable products={filteredProducts} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <InventoryTable products={filteredProducts} />
          </TabPanel>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog
        open={addProductDialog}
        onClose={() => setAddProductDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Add New Product
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, pt: 1 }}>
            <TextField fullWidth label="Product Name" />
            <TextField fullWidth label="Salt Composition" />
            <TextField fullWidth label="Manufacturer" />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category">
                {categories.slice(1).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField fullWidth label="MRP" type="number" />
            <TextField fullWidth label="Cost Price" type="number" />
            <TextField fullWidth label="Selling Price" type="number" />
            <TextField fullWidth label="Current Stock" type="number" />
            <TextField fullWidth label="Min Stock" type="number" />
            <TextField fullWidth label="Max Stock" type="number" />
            <TextField fullWidth label="Batch Number" />
            <TextField fullWidth label="Expiry Date" type="date" InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Rack Location" />
            <TextField fullWidth label="Barcode" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddProductDialog(false)}>
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

const InventoryTable = ({ products }: { products: any[] }) => {
  const theme = useTheme();

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Stock Level</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => {
            const stockPercentage = getStockPercentage(product.currentStock, product.maxStock);
            const stockColor = getStockColor(stockPercentage);
            const expiryStatus = getExpiryStatus(product.expiryDate);
            
            return (
              <TableRow key={product.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="500">
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {product.manufacturer}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={product.category} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Box sx={{ minWidth: 100 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {product.currentStock}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stockPercentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={stockPercentage}
                      color={stockColor}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="500">
                    ₹{product.sellingPrice}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    MRP: ₹{product.mrp}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(product.expiryDate).toLocaleDateString()}
                  </Typography>
                  <Chip
                    label={expiryStatus.label}
                    color={expiryStatus.color}
                    size="small"
                    sx={{ mt: 0.5 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={product.status.replace('_', ' ')}
                    color={product.status === 'active' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" color="primary">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Inventory; 