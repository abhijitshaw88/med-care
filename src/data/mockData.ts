// Types
export interface Product {
  id: string;
  name: string;
  salt: string;
  manufacturer: string;
  category: string;
  batch: string;
  mrp: number;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minStock: number;
  maxStock: number;
  expiryDate: string;
  rackLocation: string;
  barcode: string;
  status: 'active' | 'low_stock' | 'out_of_stock';
  image?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalPurchases: number;
  lastVisit: string;
  prescriptions: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface Transaction {
  id: string;
  customer: Customer;
  amount: number;
  items: number;
  status: 'completed' | 'pending' | 'cancelled';
  time: string;
  paymentMethod: 'cash' | 'upi' | 'card' | 'credit';
  products: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  total: number;
}

export interface SalesData {
  date: string;
  sales: number;
  profit: number;
  orders: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface GSTData {
  month: string;
  gstCollected: number;
  gstPaid: number;
  netGST: number;
}

export interface TopProduct {
  name: string;
  sales: number;
  quantity: number;
  profit: number;
}

// Mock Data
export const products: Product[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
  {
    id: '5',
    name: 'Metformin 500mg',
    salt: 'Metformin',
    manufacturer: 'USV',
    category: 'Diabetes',
    batch: 'BATCH005',
    mrp: 25,
    costPrice: 12,
    sellingPrice: 20,
    currentStock: 80,
    minStock: 30,
    maxStock: 120,
    expiryDate: '2025-01-15',
    rackLocation: 'C1-A1',
    barcode: '8901234567894',
    status: 'active',
  },
  {
    id: '6',
    name: 'Amlodipine 5mg',
    salt: 'Amlodipine',
    manufacturer: 'Cipla',
    category: 'Cardiovascular',
    batch: 'BATCH006',
    mrp: 35,
    costPrice: 18,
    sellingPrice: 28,
    currentStock: 45,
    minStock: 20,
    maxStock: 80,
    expiryDate: '2024-11-30',
    rackLocation: 'C2-B1',
    barcode: '8901234567895',
    status: 'active',
  },
];

export const customers: Customer[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
    name: 'Mike Johnson',
    phone: '+91 76543 21098',
    email: 'mike.johnson@email.com',
    address: '789 Oak Rd, Bangalore, Karnataka',
    totalPurchases: 15600,
    lastVisit: '2024-01-12',
    prescriptions: 8,
    status: 'active',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    phone: '+91 65432 10987',
    email: 'sarah.wilson@email.com',
    address: '321 Pine St, Chennai, Tamil Nadu',
    totalPurchases: 7200,
    lastVisit: '2024-01-08',
    prescriptions: 2,
    status: 'active',
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: '1',
    customer: customers[0],
    amount: 1250,
    items: 5,
    status: 'completed',
    time: '2 min ago',
    paymentMethod: 'upi',
    products: [],
  },
  {
    id: '2',
    customer: customers[1],
    amount: 890,
    items: 3,
    status: 'pending',
    time: '5 min ago',
    paymentMethod: 'cash',
    products: [],
  },
  {
    id: '3',
    customer: customers[2],
    amount: 2100,
    items: 8,
    status: 'completed',
    time: '12 min ago',
    paymentMethod: 'card',
    products: [],
  },
  {
    id: '4',
    customer: customers[3],
    amount: 750,
    items: 4,
    status: 'completed',
    time: '18 min ago',
    paymentMethod: 'upi',
    products: [],
  },
];

export const salesData: SalesData[] = [
  { date: 'Mon', sales: 4000, profit: 2400, orders: 156 },
  { date: 'Tue', sales: 3000, profit: 1398, orders: 178 },
  { date: 'Wed', sales: 2000, profit: 9800, orders: 165 },
  { date: 'Thu', sales: 2780, profit: 3908, orders: 210 },
  { date: 'Fri', sales: 1890, profit: 4800, orders: 185 },
  { date: 'Sat', sales: 2390, profit: 3800, orders: 225 },
  { date: 'Sun', sales: 3490, profit: 4300, orders: 198 },
];

export const categoryData: CategoryData[] = [
  { name: 'Antibiotics', value: 35, color: '#8884d8' },
  { name: 'Pain Relief', value: 25, color: '#82ca9d' },
  { name: 'Vitamins', value: 20, color: '#ffc658' },
  { name: 'Diabetes', value: 15, color: '#ff7300' },
  { name: 'Others', value: 5, color: '#00C49F' },
];

export const gstData: GSTData[] = [
  { month: 'Jan', gstCollected: 8100, gstPaid: 5400, netGST: 2700 },
  { month: 'Feb', gstCollected: 9360, gstPaid: 6300, netGST: 3060 },
  { month: 'Mar', gstCollected: 8640, gstPaid: 5850, netGST: 2790 },
  { month: 'Apr', gstCollected: 10980, gstPaid: 7200, netGST: 3780 },
  { month: 'May', gstCollected: 9900, gstPaid: 6750, netGST: 3150 },
  { month: 'Jun', gstCollected: 12060, gstPaid: 8100, netGST: 3960 },
];

export const topProducts: TopProduct[] = [
  { name: 'Paracetamol 500mg', sales: 12500, quantity: 1250, profit: 4000 },
  { name: 'Amoxicillin 250mg', sales: 8900, quantity: 445, profit: 3200 },
  { name: 'Vitamin D3 1000IU', sales: 7600, quantity: 80, profit: 2800 },
  { name: 'Omeprazole 20mg', sales: 6800, quantity: 95, profit: 2400 },
];

export const lowStockItems = [
  { name: 'Paracetamol 500mg', current: 15, min: 50, percentage: 30 },
  { name: 'Amoxicillin 250mg', current: 8, min: 30, percentage: 27 },
  { name: 'Vitamin D3', current: 12, min: 40, percentage: 30 },
  { name: 'Omeprazole 20mg', current: 5, min: 25, percentage: 20 },
];

export const categories = ['All', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Gastrointestinal', 'Diabetes', 'Cardiovascular'];

export const paymentMethods = [
  { id: 'cash', label: 'Cash', icon: '💵' },
  { id: 'upi', label: 'UPI', icon: '📱' },
  { id: 'card', label: 'Card', icon: '💳' },
  { id: 'credit', label: 'Credit', icon: '📋' },
]; 