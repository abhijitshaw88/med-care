import {
  Search,
  Add,
  Edit,
  Delete,
  Person,
  MedicalServices,
} from '@mui/icons-material';
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
  Avatar,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
// import { motion } from 'framer-motion';

// Mock data
const customers = [
  {
    id: 1,
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john.doe@email.com',
    address: '123 Main St, Mumbai, Maharashtra',
    totalPurchases: 12500,
    lastVisit: '2024-01-15',
    prescriptions: 5,
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '+91 87654 32109',
    email: 'jane.smith@email.com',
    address: '456 Park Ave, Delhi, Delhi',
    totalPurchases: 8900,
    lastVisit: '2024-01-10',
    prescriptions: 3,
    status: 'active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    phone: '+91 76543 21098',
    email: 'mike.johnson@email.com',
    address: '789 Oak Rd, Bangalore, Karnataka',
    totalPurchases: 15600,
    lastVisit: '2024-01-12',
    prescriptions: 8,
    status: 'active',
  },
];

const Customers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Customer Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your customer database, track purchase history, and maintain prescription records.
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search customers..."
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
            <Button variant="contained" startIcon={<Add />}>
              Add Customer
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardContent>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} sx={{ mb: 3 }}>
            <Tab label={`All Customers (${filteredCustomers.length})`} />
            <Tab label="Recent Visits" />
            <Tab label="High Value" />
          </Tabs>

          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Total Purchases</TableCell>
                  <TableCell>Last Visit</TableCell>
                  <TableCell>Prescriptions</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar>
                          <Person />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {customer.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {customer.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {customer.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {customer.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        ₹{customer.totalPurchases.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(customer.lastVisit).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<MedicalServices />}
                        label={customer.prescriptions}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={customer.status}
                        color="success"
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
    </Box>
  );
};

export default Customers; 