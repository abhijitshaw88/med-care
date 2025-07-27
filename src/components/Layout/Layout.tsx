import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Badge,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  ShoppingCart,
  Inventory,
  People,
  Assessment,
  Psychology,
  Settings,
  Notifications,
  Search,
  Mic,
  Brightness4,
  Brightness7,
  LocalPharmacy,
  TrendingUp,
  CalendarToday,
  Message,
  Person,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const drawerWidth = 280;
const rightDrawerWidth = 320;

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Billing & POS', icon: <ShoppingCart />, path: '/billing' },
  { text: 'Inventory', icon: <Inventory />, path: '/inventory' },
  { text: 'Customers', icon: <People />, path: '/customers' },
  { text: 'Reports', icon: <Assessment />, path: '/reports' },
  { text: 'AI Features', icon: <Psychology />, path: '/ai-features' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const Sidebar = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 40,
            height: 40,
          }}
        >
          <LocalPharmacy />
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold" color="primary">
            MedShop
          </Typography>
          <Chip
            label="Pro"
            size="small"
            color="secondary"
            sx={{ fontSize: '0.7rem', height: 20 }}
          />
        </Box>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <motion.div
            key={item.text}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  mb: 0.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>

      {/* Theme Toggle */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Brightness4 />}
          sx={{ borderRadius: 2 }}
        >
          Dark Mode
        </Button>
      </Box>
    </Box>
  );

  const RightSidebar = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      {/* Profile Section */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Profile
            </Typography>
            <Button size="small" variant="outlined">
              Edit
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ width: 48, height: 48 }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="600">
                Admin User
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: #ADM-001
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip label="Admin" size="small" color="primary" />
            <Chip label="Online" size="small" color="success" />
          </Box>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Today's Overview
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Sales
              </Typography>
              <Typography variant="body2" fontWeight="600">
                ₹45,250
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Orders
              </Typography>
              <Typography variant="body2" fontWeight="600">
                156
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Customers
              </Typography>
              <Typography variant="body2" fontWeight="600">
                23
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recent Activity
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.main' }}>
                <ShoppingCart sx={{ fontSize: 16 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight="500">
                  New sale completed
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  2 minutes ago
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'warning.main' }}>
                <Inventory sx={{ fontSize: 16 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight="500">
                  Low stock alert
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  5 minutes ago
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'info.main' }}>
                <People sx={{ fontSize: 16 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight="500">
                  New customer registered
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  12 minutes ago
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px - ${rightDrawerOpen ? rightDrawerWidth : 0}px)` },
          ml: { lg: `${drawerWidth}px` },
          display: { lg: 'none' },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            MedShop Pro
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Search />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Desktop App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px - ${rightDrawerOpen ? rightDrawerWidth : 0}px)` },
          ml: { lg: `${drawerWidth}px` },
          display: { xs: 'none', lg: 'block' },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
            </Typography>
            <Chip label="Online" color="success" size="small" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <Search />
            </IconButton>
            <IconButton color="inherit">
              <Mic />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar sx={{ width: 32, height: 32 }}>
              <Person />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px - ${rightDrawerOpen ? rightDrawerWidth : 0}px)` },
          mt: { xs: 7, lg: 8 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </Box>

      {/* Right Sidebar */}
      {!isTablet && (
        <Box
          component="nav"
          sx={{ width: rightDrawerWidth, flexShrink: 0 }}
        >
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: rightDrawerWidth,
                bgcolor: 'background.paper',
                borderLeft: '1px solid',
                borderColor: 'divider',
              },
            }}
            open
          >
            <RightSidebar />
          </Drawer>
        </Box>
      )}
    </Box>
  );
};

export default Layout; 