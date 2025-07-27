import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  // Tabs,
  // Tab,
  Alert,
} from '@mui/material';
import {
  // Settings as SettingsIcon,
  Person,
  Security,
  Business,
  Notifications,
  Backup,
  // Language,
  // Palette,
  // Store,
  // Receipt,
  // Inventory,
  // Payment,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [notifications, setNotifications] = useState({
    lowStock: true,
    expiryAlerts: true,
    salesReports: false,
    systemUpdates: true,
  });

  // const [businessSettings, setBusinessSettings] = useState({
  //   shopName: 'MedShop Pro',
  //   gstNumber: '27ABCDE1234F1Z5',
  //   address: '123 Medical Street, Mumbai, Maharashtra - 400001',
  //   phone: '+91 98765 43210',
  //   email: 'contact@medshoppro.com',
  //   currency: 'INR',
  //   timezone: 'Asia/Kolkata',
  // });

  const users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@medshoppro.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15 10:30 AM',
    },
    {
      id: 2,
      name: 'Cashier 1',
      email: 'cashier1@medshoppro.com',
      role: 'Cashier',
      status: 'active',
      lastLogin: '2024-01-15 09:15 AM',
    },
    {
      id: 3,
      name: 'Manager',
      email: 'manager@medshoppro.com',
      role: 'Manager',
      status: 'inactive',
      lastLogin: '2024-01-14 05:45 PM',
    },
  ];

  const handleNotificationChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications({
      ...notifications,
      [setting]: event.target.checked,
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your medical shop management system settings and preferences.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Settings Navigation */}
        <Card sx={{ minWidth: 300, height: 'fit-content' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <List>
              <ListItem
                onClick={() => setSelectedTab(0)}
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedTab === 0 ? 'action.selected' : 'transparent',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText primary="Business Settings" />
              </ListItem>
              <ListItem
                onClick={() => setSelectedTab(1)}
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedTab === 1 ? 'action.selected' : 'transparent',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItem>
              <ListItem
                onClick={() => setSelectedTab(2)}
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedTab === 2 ? 'action.selected' : 'transparent',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem
                onClick={() => setSelectedTab(3)}
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedTab === 3 ? 'action.selected' : 'transparent',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
              <ListItem
                onClick={() => setSelectedTab(4)}
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedTab === 4 ? 'action.selected' : 'transparent',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                <ListItemIcon>
                  <Backup />
                </ListItemIcon>
                <ListItemText primary="Backup & Restore" />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <Box sx={{ flex: '1 1 600px' }}>
          {selectedTab === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Business Information
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                      label="Shop Name"
                      value={''}
                      fullWidth
                      sx={{ flex: '1 1 300px' }}
                    />
                    <TextField
                      label="GST Number"
                      value={''}
                      fullWidth
                      sx={{ flex: '1 1 300px' }}
                    />
                  </Box>
                  <TextField
                    label="Address"
                    value={''}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: 2 }}
                  />
                  <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                    <TextField
                      label="Phone"
                      value={''}
                      sx={{ flex: '1 1 200px' }}
                    />
                    <TextField
                      label="Email"
                      value={''}
                      sx={{ flex: '1 1 300px' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                    <TextField
                      label="Currency"
                      value={''}
                      sx={{ flex: '1 1 150px' }}
                    />
                    <TextField
                      label="Timezone"
                      value={''}
                      sx={{ flex: '1 1 200px' }}
                    />
                  </Box>
                  <Button variant="contained" sx={{ mt: 3 }}>
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">
                      User Management
                    </Typography>
                    <Button variant="contained" startIcon={<Person />}>
                      Add User
                    </Button>
                  </Box>
                  <List>
                    {users.map((user) => (
                      <React.Fragment key={user.id}>
                        <ListItem>
                          <ListItemIcon>
                            <Avatar>
                              <Person />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={user.name}
                            secondary={`${user.email} • ${user.role} • Last login: ${user.lastLogin}`}
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={user.status}
                              color={user.status === 'active' ? 'success' : 'default'}
                              size="small"
                            />
                            <Button size="small" color="primary">
                              Edit
                            </Button>
                          </Box>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Notification Preferences
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Configure which notifications you want to receive.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.lowStock}
                          onChange={handleNotificationChange('lowStock')}
                        />
                      }
                      label="Low Stock Alerts"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.expiryAlerts}
                          onChange={handleNotificationChange('expiryAlerts')}
                        />
                      }
                      label="Expiry Date Alerts"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.salesReports}
                          onChange={handleNotificationChange('salesReports')}
                        />
                      }
                      label="Daily Sales Reports"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.systemUpdates}
                          onChange={handleNotificationChange('systemUpdates')}
                        />
                      }
                      label="System Updates"
                    />
                  </Box>
                  
                  <Button variant="contained" sx={{ mt: 3 }}>
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Security Settings
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Ensure your account and data are secure with these settings.
                  </Alert>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Password Policy
                      </Typography>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Require strong passwords"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Enable two-factor authentication"
                      />
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Session Management
                      </Typography>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Auto-logout after 30 minutes of inactivity"
                      />
                      <FormControlLabel
                        control={<Switch />}
                        label="Remember login sessions"
                      />
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Data Protection
                      </Typography>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Encrypt sensitive data"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Audit trail for all actions"
                      />
                    </Box>
                  </Box>
                  
                  <Button variant="contained" sx={{ mt: 3 }}>
                    Update Security Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Backup & Restore
                  </Typography>
                  
                  <Alert severity="warning" sx={{ mb: 3 }}>
                    Regular backups are essential for data protection. Configure automatic backup schedules.
                  </Alert>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Automatic Backups
                      </Typography>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Enable automatic daily backups"
                      />
                      <FormControlLabel
                        control={<Switch />}
                        label="Backup to cloud storage"
                      />
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Manual Backup
                      </Typography>
                      <Button variant="outlined" startIcon={<Backup />}>
                        Create Backup Now
                      </Button>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Restore Data
                      </Typography>
                      <Button variant="outlined" color="warning">
                        Restore from Backup
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings; 