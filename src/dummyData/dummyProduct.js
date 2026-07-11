// dummyData.js

export const productsKatalog = [
  {
    id: 1,
    name: 'Short Sleeve T-Shirt',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'White Formal Shirt',
    price: 65.00,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: 'Blue Jeans Pants',
    price: 89.90,
    image_url: 'https://images.unsplash.com/photo-1542272617-08f1a4c0c082?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    name: 'Gray Hoodie',
    price: 120.00,
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 5,
    name: 'Knit Sweater',
    price: 99.00,
    image_url: 'https://images.unsplash.com/photo-1620799140188-3b2a5f8b5f84?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 6,
    name: 'Jacket Denim',
    price: 150.00,
    image_url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=400'
  }
];

// dummyDataPublic.js

// Maklumat Pengguna (untuk kegunaan umum, berbeza dengan data admin)


// Data Produk untuk Paparan Awam (6 item seperti dalam design)


// ======================================================
// DATABASE DUMMY DATA (Berdasarkan MySQL Schema)
// ======================================================

// 1. USERS TABLE
export const users = [
  {
    id: 1,
    username: 'admin_kopi',
    email: 'admin@kopikain.com',
    password_hash: 'hashed_password_123',
    role: 'admin',
    created_at: '2024-01-15 08:00:00'
  },
  {
    id: 2,
    username: 'customer_public',
    email: 'customer@example.com',
    password_hash: 'hashed_password_456',
    role: 'user',
    created_at: '2024-02-01 10:30:00'
  },
  {
    id: 3,
    username: 'john_doe',
    email: 'john@example.com',
    password_hash: 'hashed_password_789',
    role: 'user',
    created_at: '2024-02-05 14:15:00'
  },
  {
    id: 4,
    username: 'sarah_smith',
    email: 'sarah@example.com',
    password_hash: 'hashed_password_101',
    role: 'user',
    created_at: '2024-02-10 09:45:00'
  }
];

// 2. PRODUCTS TABLE
export const products = [
  {
    id: 1,
    name: 'Short Sleeve T-Shirt',
    description: 'Comfortable and stylish short sleeve t-shirt made from premium cotton',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
    is_active: true,
    created_at: '2024-01-20 11:00:00'
  },
  {
    id: 2,
    name: 'White Formal Shirt',
    description: 'Elegant white formal shirt perfect for business meetings and events',
    price: 65.00,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400',
    is_active: true,
    created_at: '2024-01-22 14:30:00'
  },
  {
    id: 3,
    name: 'Blue Jeans Pants',
    description: 'Classic blue denim jeans with comfortable fit',
    price: 89.90,
    image_url: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVhbnN8ZW58MHx8MHx8fDA%3D',
    is_active: true,
    created_at: '2024-01-25 16:45:00'
  },
  {
    id: 4,
    name: 'Gray Hoodie',
    description: 'Cozy gray hoodie for casual wear and outdoor activities',
    price: 120.00,
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400',
    is_active: true,
    created_at: '2024-02-01 10:20:00'
  },
  {
    id: 5,
    name: 'Knit Sweater',
    description: 'Warm knit sweater made from quality wool blend fabric',
    price: 99.00,
    image_url: 'https://images.unsplash.com/photo-1620799140188-3b2a5f8b5f84?auto=format&fit=crop&q=80&w=400',
    is_active: true,
    created_at: '2024-02-03 13:15:00'
  },
  {
    id: 6,
    name: 'Jacket Denim',
    description: 'Trendy denim jacket suitable for all seasons',
    price: 150.00,
    image_url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=400',
    is_active: true,
    created_at: '2024-02-05 15:50:00'
  }
];

// 3. PRODUCT VARIANTS TABLE
export const productVariants = [
  // Product 1 variants (Short Sleeve T-Shirt)
  { id: 1, product_id: 1, size: 'S', color: 'White', stock: 25, updated_at: '2024-02-20 10:00:00' },
  { id: 2, product_id: 1, size: 'M', color: 'White', stock: 30, updated_at: '2024-02-20 10:00:00' },
  { id: 3, product_id: 1, size: 'L', color: 'White', stock: 20, updated_at: '2024-02-20 10:00:00' },
  { id: 4, product_id: 1, size: 'XL', color: 'White', stock: 15, updated_at: '2024-02-20 10:00:00' },
  { id: 5, product_id: 1, size: 'M', color: 'Black', stock: 28, updated_at: '2024-02-20 10:00:00' },

  // Product 2 variants (White Formal Shirt)
  { id: 6, product_id: 2, size: 'S', color: 'White', stock: 18, updated_at: '2024-02-20 10:00:00' },
  { id: 7, product_id: 2, size: 'M', color: 'White', stock: 25, updated_at: '2024-02-20 10:00:00' },
  { id: 8, product_id: 2, size: 'L', color: 'White', stock: 22, updated_at: '2024-02-20 10:00:00' },
  { id: 9, product_id: 2, size: 'XL', color: 'White', stock: 12, updated_at: '2024-02-20 10:00:00' },

  // Product 3 variants (Blue Jeans Pants)
  { id: 10, product_id: 3, size: '28', color: 'Blue', stock: 20, updated_at: '2024-02-20 10:00:00' },
  { id: 11, product_id: 3, size: '30', color: 'Blue', stock: 32, updated_at: '2024-02-20 10:00:00' },
  { id: 12, product_id: 3, size: '32', color: 'Blue', stock: 28, updated_at: '2024-02-20 10:00:00' },
  { id: 13, product_id: 3, size: '34', color: 'Blue', stock: 18, updated_at: '2024-02-20 10:00:00' },

  // Product 4 variants (Gray Hoodie)
  { id: 14, product_id: 4, size: 'S', color: 'Gray', stock: 15, updated_at: '2024-02-20 10:00:00' },
  { id: 15, product_id: 4, size: 'M', color: 'Gray', stock: 22, updated_at: '2024-02-20 10:00:00' },
  { id: 16, product_id: 4, size: 'L', color: 'Gray', stock: 19, updated_at: '2024-02-20 10:00:00' },
  { id: 17, product_id: 4, size: 'XL', color: 'Gray', stock: 10, updated_at: '2024-02-20 10:00:00' },

  // Product 5 variants (Knit Sweater)
  { id: 18, product_id: 5, size: 'S', color: 'Cream', stock: 17, updated_at: '2024-02-20 10:00:00' },
  { id: 19, product_id: 5, size: 'M', color: 'Cream', stock: 24, updated_at: '2024-02-20 10:00:00' },
  { id: 20, product_id: 5, size: 'L', color: 'Cream', stock: 21, updated_at: '2024-02-20 10:00:00' },
  { id: 21, product_id: 5, size: 'M', color: 'Navy', stock: 19, updated_at: '2024-02-20 10:00:00' },

  // Product 6 variants (Jacket Denim)
  { id: 22, product_id: 6, size: 'S', color: 'Dark Blue', stock: 12, updated_at: '2024-02-20 10:00:00' },
  { id: 23, product_id: 6, size: 'M', color: 'Dark Blue', stock: 18, updated_at: '2024-02-20 10:00:00' },
  { id: 24, product_id: 6, size: 'L', color: 'Dark Blue', stock: 15, updated_at: '2024-02-20 10:00:00' },
  { id: 25, product_id: 6, size: 'XL', color: 'Dark Blue', stock: 8, updated_at: '2024-02-20 10:00:00' }
];

// 4. CART ITEMS TABLE
export const cartItems = [
  {
    id: 1,
    user_id: 2,
    variant_id: 2,  // Product 1, Size M, White
    quantity: 1,
    added_at: '2024-02-20 14:30:00'
  },
  {
    id: 2,
    user_id: 2,
    variant_id: 7,  // Product 2, Size M, White
    quantity: 2,
    added_at: '2024-02-20 14:35:00'
  },
  {
    id: 3,
    user_id: 3,
    variant_id: 11, // Product 3, Size 30, Blue
    quantity: 1,
    added_at: '2024-02-20 16:20:00'
  }, {
    id: 4,
    user_id: 3,
    variant_id: 11, // Product 3, Size 30, Blue
    quantity: 1,
    added_at: '2024-03-20 16:20:00'
  },
  {
    id: 4,
    user_id: 4,
    variant_id: 15, // Product 4, Size M, Gray
    quantity: 1,
    added_at: '2024-02-20 17:45:00'
  }
];

// 5. ORDERS TABLE
export const orders = [
  {
    id: 1,
    user_id: 2,
    address: '123 Jalan Merdeka, 50050 Kuala Lumpur',
    order_date: '2024-02-10 09:15:00',
    total_amount: 265.00,
    status: 'delivered',
    billcode: 'BILL-2024-001',
    Courier: 'J&T Express',
    tracking_number: 'TRACK-001',
    updated_at: '2024-02-18 14:20:00'
  },
  {
    id: 2,
    user_id: 3,
    address: '456 Jalan Sultan, 43000 Selangor',
    order_date: '2024-02-12 10:45:00',
    total_amount: 89.90,
    status: 'shipped',
    billcode: 'BILL-2024-002',
    Courier: 'J&T Express',
    tracking_number: 'TRACK-002',
    updated_at: '2024-02-19 11:30:00'
  },
  {
    id: 3,
    user_id: 4,
    address: '789 Jalan Raja, 40000 Shah Alam',
    order_date: '2024-02-15 14:20:00',
    total_amount: 120.00,
    status: 'pending',
    billcode: 'BILL-2024-003',
    Courier: 'J&T Express',
    tracking_number: null,
    updated_at: '2024-02-15 14:20:00'
  },
  {
    id: 4,
    user_id: 2,
    address: '123 Jalan Merdeka, 50050 Kuala Lumpur',
    order_date: '2024-02-18 16:50:00',
    total_amount: 198.00,
    status: 'paid',
    billcode: 'BILL-2024-004',
    Courier: 'J&T Express',
    tracking_number: null,
    updated_at: '2024-02-18 18:00:00'
  }
];

// 6. ORDER ITEMS TABLE
export const orderItems = [
  {
    id: 1,
    order_id: 1,
    variant_id: 2,  // Product 1, Size M, White
    quantity: 2,
    price: 35.00
  },
  {
    id: 2,
    order_id: 1,
    variant_id: 7,  // Product 2, Size M, White
    quantity: 3,
    price: 65.00
  },
  {
    id: 3,
    order_id: 2,
    variant_id: 11, // Product 3, Size 30, Blue
    quantity: 1,
    price: 89.90
  },
  {
    id: 4,
    order_id: 3,
    variant_id: 15, // Product 4, Size M, Gray
    quantity: 1,
    price: 120.00
  },
  {
    id: 5,
    order_id: 4,
    variant_id: 19, // Product 5, Size M, Cream
    quantity: 1,
    price: 99.00
  },
  {
    id: 6,
    order_id: 4,
    variant_id: 23, // Product 6, Size M, Dark Blue
    quantity: 1,
    price: 150.00
  }
];