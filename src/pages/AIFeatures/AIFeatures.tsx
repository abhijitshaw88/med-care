import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Psychology,
  CameraAlt,
  AutoAwesome,
  LocalOffer,
  ShoppingCart,
  HealthAndSafety,
  Restaurant,
  FitnessCenter,
  WhatsApp,
  QrCode,
  Search,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const AIFeatures: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [prescriptionText, setPrescriptionText] = useState('');

  const aiFeatures = [
    {
      title: 'Prescription OCR',
      description: 'Scan handwritten prescriptions and automatically extract medicine details',
      icon: <CameraAlt />,
      color: 'primary',
      status: 'active',
    },
    {
      title: 'Drug Substitutes',
      description: 'AI-powered recommendations for equivalent medicines when stock is unavailable',
      icon: <AutoAwesome />,
      color: 'secondary',
      status: 'active',
    },
    {
      title: 'Lifestyle Recommendations',
      description: 'Personalized diet and exercise suggestions based on patient conditions',
      icon: <HealthAndSafety />,
      color: 'success',
      status: 'active',
    },
    {
      title: 'Automated Ordering',
      description: 'Smart inventory monitoring with automatic purchase order generation',
      icon: <ShoppingCart />,
      color: 'warning',
      status: 'active',
    },
    {
      title: 'WhatsApp Chatbot',
      description: '24/7 customer support via WhatsApp for medicine availability and queries',
      icon: <WhatsApp />,
      color: 'info',
      status: 'coming_soon',
    },
    {
      title: 'Personalized Offers',
      description: 'AI-driven product recommendations and targeted promotions',
      icon: <LocalOffer />,
      color: 'error',
      status: 'active',
    },
  ];

  const mockSubstitutes = [
    {
      original: 'Paracetamol 500mg (Crocin)',
      substitutes: [
        { name: 'Dolo 500mg', manufacturer: 'Micro Labs', price: 12, stock: 50 },
        { name: 'Calpol 500mg', manufacturer: 'GSK', price: 15, stock: 30 },
        { name: 'PCM 500mg', manufacturer: 'Alkem', price: 10, stock: 25 },
      ],
    },
    {
      original: 'Amoxicillin 250mg (Novamox)',
      substitutes: [
        { name: 'Amoxil 250mg', manufacturer: 'GSK', price: 38, stock: 20 },
        { name: 'Amox 250mg', manufacturer: 'Alkem', price: 35, stock: 15 },
      ],
    },
  ];

  const lifestyleRecommendations = [
    {
      condition: 'Diabetes',
      recommendations: [
        'Include bitter gourd, fenugreek, and cinnamon in your diet',
        'Avoid refined carbohydrates and sugary foods',
        'Practice 30 minutes of walking daily',
        'Monitor blood sugar levels regularly',
      ],
    },
    {
      condition: 'Hypertension',
      recommendations: [
        'Reduce salt intake to less than 5g per day',
        'Include potassium-rich foods like bananas and spinach',
        'Practice stress-reducing activities like yoga',
        'Limit alcohol consumption',
      ],
    },
  ];

  const handlePrescriptionScan = () => {
    // Simulate OCR processing
    setTimeout(() => {
      setPrescriptionText('Paracetamol 500mg - 1-0-1 for 5 days\nAmoxicillin 250mg - 1-0-1 for 7 days');
      setShowPrescriptionDialog(true);
    }, 2000);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          AI-Powered Features
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Leverage artificial intelligence to enhance your medical shop operations and customer experience.
        </Typography>
      </Box>

      {/* AI Features Grid */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {aiFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card sx={{ minWidth: 300, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${feature.color}.light`, color: `${feature.color}.main` }}>
                    {feature.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Chip
                      label={feature.status === 'active' ? 'Active' : 'Coming Soon'}
                      color={feature.status === 'active' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {feature.description}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={feature.status === 'coming_soon'}
                >
                  {feature.status === 'active' ? 'Try Now' : 'Coming Soon'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Feature Tabs */}
      <Card>
        <CardContent>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="Prescription OCR" />
            <Tab label="Drug Substitutes" />
            <Tab label="Lifestyle Recommendations" />
            <Tab label="Automated Ordering" />
          </Tabs>

          {selectedTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Prescription Digitization
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Upload or scan handwritten prescriptions to automatically extract medicine details and populate billing.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<CameraAlt />}
                  onClick={handlePrescriptionScan}
                >
                  Scan Prescription
                </Button>
                <Button variant="outlined" startIcon={<QrCode />}>
                  Upload Image
                </Button>
              </Box>

              <Alert severity="info" sx={{ mb: 2 }}>
                Our AI can read handwritten prescriptions with 95% accuracy and automatically validate medicine names.
              </Alert>
            </Box>
          )}

          {selectedTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Drug Substitute Recommendations
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                When prescribed medicines are out of stock, AI suggests clinically equivalent alternatives.
              </Typography>

              {mockSubstitutes.map((item, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {item.original}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Available substitutes:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {item.substitutes.map((substitute, subIndex) => (
                        <Chip
                          key={subIndex}
                          label={`${substitute.name} - ₹${substitute.price}`}
                          variant="outlined"
                          color="primary"
                          onClick={() => {}}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {selectedTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Lifestyle & Wellness Recommendations
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                AI-powered suggestions for diet, exercise, and lifestyle modifications based on patient conditions.
              </Typography>

              {lifestyleRecommendations.map((rec, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <HealthAndSafety color="primary" />
                      <Typography variant="h6" fontWeight="bold">
                        {rec.condition}
                      </Typography>
                    </Box>
                    <List dense>
                      {rec.recommendations.map((recommendation, recIndex) => (
                        <ListItem key={recIndex}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'success.light' }}>
                              <CheckCircle sx={{ fontSize: 16 }} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={recommendation} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {selectedTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Automated Inventory Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                AI monitors stock levels and automatically generates purchase orders when items reach reorder points.
              </Typography>

              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Warning color="warning" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Low Stock Alert
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    The following items are running low and need reordering:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Paracetamol 500mg"
                        secondary="Current: 15 | Min: 50 | Suggested Order: 100"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Amoxicillin 250mg"
                        secondary="Current: 8 | Min: 30 | Suggested Order: 80"
                      />
                    </ListItem>
                  </List>
                  <Button variant="contained" startIcon={<ShoppingCart />}>
                    Generate Purchase Order
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Prescription Dialog */}
      <Dialog
        open={showPrescriptionDialog}
        onClose={() => setShowPrescriptionDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Prescription Analysis</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            AI has extracted the following medicines from your prescription:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={prescriptionText}
            onChange={(e) => setPrescriptionText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Alert severity="success">
            All medicines are available in stock and ready for billing.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPrescriptionDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AIFeatures; 