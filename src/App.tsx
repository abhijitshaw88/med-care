import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

// Theme
import { theme } from './theme/theme';

// Components
import Layout from './components/Layout/Layout';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Billing from './pages/Billing/Billing';
import Inventory from './pages/Inventory/Inventory';
import Customers from './pages/Customers/Customers';
import Reports from './pages/Reports/Reports';
import AIFeatures from './pages/AIFeatures/AIFeatures';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/ai-features" element={<AIFeatures />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
