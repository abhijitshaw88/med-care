import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Paper,
  InputAdornment,
  Autocomplete,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Search,
  Add,
  Remove,
  Delete,
  ShoppingCart,
  Payment,
  Receipt,
  QrCode,
  LocalOffer,
  Person,
  Phone,
  Email,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data
const products = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    salt: 'Paracetamol',
    manufacturer: 'Cipla',
    mrp: 15,
    sellingPrice: 12,
    stock: 150,
    category: 'Pain Relief',
    barcode: '8901234567890',
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    salt: 'Amoxicillin',
    manufacturer: 'Sun Pharma',
    mrp: 45,
    sellingPrice: 38,
    stock: 80,
    category: 'Antibiotics',
    barcode: '8901234567891',
  },
  {
    id: 3,
    name: 'Vitamin D3 1000IU',
    salt: 'Cholecalciferol',
    manufacturer: 'HealthVit',
    mrp: 120,
    sellingPrice: 95,
    stock: 60,
    category: 'Vitamins',
    barcode: '8901234567892',
  },
  {
    id: 4,
    name: 'Omeprazole 20mg',
    salt: 'Omeprazole',
    manufacturer: 'Dr. Reddy\'s',
    mrp: 85,
    sellingPrice: 72,
    stock: 40,
    category: 'Gastrointestinal',
    barcode: '8901234567893',
  },
];

const paymentMethods = [
  { id: 'cash', label: 'Cash', icon: '💵' },
  { id: 'upi', label: 'UPI', icon: '📱' },
  { id: 'card', label: 'Card', icon: '💳' },
  { id: 'credit', label: 'Credit', icon: '📋' },
];

interface CartItem {
  product: any;
  quantity: number;
  total: number;
}

const Billing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.salt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.barcode.includes(searchQuery)
  );

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.product.sellingPrice }
          : item
      ));
    } else {
      setCart([...cart, {
        product,
        quantity: 1,
        total: product.sellingPrice,
      }]);
    }
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.product.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity, total: newQuantity * item.product.sellingPrice }
          : item
      ));
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + item.total, 0);
  const getGST = () => getSubtotal() * 0.18;
  const getTotal = () => getSubtotal() + getGST();

  const handlePayment = () => {
    setShowPaymentDialog(true);
  };

  const handleCompletePayment = () => {
    // Here you would integrate with actual payment gateway
    setShowPaymentDialog(false);
    setCart([]);
    setActiveStep(0);
    setCustomerInfo({ name: '', phone: '', email: '' });
    setSelectedPaymentMethod('');
  };

  const steps = ['Cart Review', 'Customer Info', 'Payment'];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Billing & POS
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Process sales, manage inventory, and generate invoices.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Left Side - Product Search and List */}
        <Box sx={{ flex: '1 1 800px' }}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Search products by name, salt, or barcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {filteredProducts.map((product) => (
                  <Box sx={{ flex: '1 1 300px', minWidth: 250 }} key={product.id}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { boxShadow: 3 },
                        }}
                        onClick={() => addToCart(product)}
                      >
                        <CardContent>
                          <Typography variant="h6" noWrap>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {product.salt}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {product.manufacturer}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="h6" color="primary" fontWeight="bold">
                              ₹{product.sellingPrice}
                            </Typography>
                            <Chip
                              label={`Stock: ${product.stock}`}
                              size="small"
                              color={product.stock < 20 ? 'error' : 'success'}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Side - Cart and Payment */}
        <Box sx={{ flex: '0 0 400px' }}>
          <Card sx={{ height: 'fit-content', position: 'sticky', top: 100 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCart sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Cart ({cart.length} items)
                </Typography>
              </Box>

              {cart.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ShoppingCart sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography color="text.secondary">
                    Your cart is empty
                  </Typography>
                </Box>
              ) : (
                <>
                  <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                        >
                          <ListItem>
                            <ListItemText
                              primary={item.product.name}
                              secondary={`₹${item.product.sellingPrice} × ${item.quantity}`}
                            />
                            <ListItemSecondaryAction>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton
                                  size="small"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Remove />
                                </IconButton>
                                <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                                  {item.quantity}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Add />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => removeFromCart(item.product.id)}
                                >
                                  <Delete />
                                </IconButton>
                              </Box>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </List>

                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Subtotal:</Typography>
                      <Typography>₹{getSubtotal().toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>GST (18%):</Typography>
                      <Typography>₹{getGST().toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Total:
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="primary">
                        ₹{getTotal().toFixed(2)}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handlePayment}
                      disabled={cart.length === 0}
                    >
                      Proceed to Payment
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Payment Dialog */}
      <Dialog
        open={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Complete Payment</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <List>
                {cart.map((item) => (
                  <ListItem key={item.product.id}>
                    <ListItemText
                      primary={item.product.name}
                      secondary={`₹${item.product.sellingPrice} × ${item.quantity}`}
                    />
                    <Typography>₹{item.total.toFixed(2)}</Typography>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total Amount:</Typography>
                <Typography variant="h6" color="primary">
                  ₹{getTotal().toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 100%' }}>
                  <TextField
                    fullWidth
                    label="Customer Name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  />
                </Box>
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Select Payment Method
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {paymentMethods.map((method) => (
                  <Box sx={{ flex: '1 1 200px' }} key={method.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedPaymentMethod === method.id ? 2 : 1,
                        borderColor: selectedPaymentMethod === method.id ? 'primary.main' : 'divider',
                      }}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          {method.icon}
                        </Typography>
                        <Typography variant="body1">
                          {method.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentDialog(false)}>
            Cancel
          </Button>
          {activeStep > 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={() => setActiveStep(activeStep + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleCompletePayment}
              disabled={!selectedPaymentMethod}
            >
              Complete Payment
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Billing; 