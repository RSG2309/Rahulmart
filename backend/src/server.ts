import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db';
import router from './routes';
import { UserModel, CategoryModel, ProductModel } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false // Allow static files like invoices to be accessed
}));
app.use(cors({
  origin: '*', // Allow frontend development requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs for testing ease
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// API Routes
app.use('/api', router);

// Root Hello Page
app.get('/', (req, res) => {
  res.json({
    name: 'B2B Shop Sourcing Hub API',
    version: '1.0.0',
    status: 'operational',
    documentation: '/api/products, /api/auth/login, etc.'
  });
});

// Seed default accounts
const seedAccounts = async () => {
  try {
    // 1. Admin
    const adminExists = await UserModel.findOne({ email: 'admin@b2b.com' });
    if (!adminExists) {
      const hashedAdminPassword = await bcrypt.hash('adminpassword', 10);
      await UserModel.create({
        mobile: '9999999999',
        email: 'admin@b2b.com',
        password: hashedAdminPassword,
        role: 'admin',
        kycStatus: 'verified',
        kycDetails: {
          businessName: 'Rahul Super Mart Admin HQ',
          ownerName: 'System Administrator',
          businessAddress: 'Sector 4, HSR Layout, Bengaluru',
        },
        walletBalance: 0
      });
      console.log('✅ Default Admin account seeded (admin@b2b.com / adminpassword)');
    }

    // 2. Verified Retailer
    const retailerExists = await UserModel.findOne({ email: 'retailer@b2b.com' });
    if (!retailerExists) {
      const hashedRetailerPassword = await bcrypt.hash('retailerpassword', 10);
      await UserModel.create({
        mobile: '9888888888',
        email: 'retailer@b2b.com',
        password: hashedRetailerPassword,
        role: 'retailer',
        kycStatus: 'verified',
        kycDetails: {
          businessName: 'Vikas General Store',
          ownerName: 'Vikas Kumar',
          businessAddress: '5th Main, Koramangala, Bengaluru'
        },
        walletBalance: 50000 // loaded wallet to test checkout!
      });
      console.log('✅ Default Verified Retailer account seeded (retailer@b2b.com / retailerpassword)');
    }

    // 3. Pending Retailer
    const pendingExists = await UserModel.findOne({ email: 'pending@b2b.com' });
    if (!pendingExists) {
      const hashedPendingPassword = await bcrypt.hash('retailerpassword', 10);
      await UserModel.create({
        mobile: '9777777777',
        email: 'pending@b2b.com',
        password: hashedPendingPassword,
        role: 'retailer',
        kycStatus: 'pending',
        kycDetails: {
          businessName: 'Pooja Supermarket',
          ownerName: 'Pooja Sharma',
          businessAddress: 'Sector 1, HSR Layout, Bengaluru'
        },
        walletBalance: 0
      });
      console.log('✅ Default Pending Retailer account seeded (pending@b2b.com / retailerpassword)');
    }

    // 4. Demo Retailer
    const demoExists = await UserModel.findOne({ email: 'demo' });
    if (!demoExists) {
      const hashedDemoPassword = await bcrypt.hash('demo', 10);
      await UserModel.create({
        mobile: 'demo',
        email: 'demo',
        password: hashedDemoPassword,
        role: 'retailer',
        kycStatus: 'verified',
        kycDetails: {
          businessName: 'Demo Retailer Store',
          ownerName: 'Demo User',
          businessAddress: 'Sikta Bazar, West Champaran, Bihar'
        },
        walletBalance: 25000 // loaded wallet to test checkout!
      });
      console.log('✅ Demo Retailer account seeded (demo / demo)');
    }
  } catch (err: any) {
    console.error('Error seeding default accounts:', err.message);
  }
};

// Seed default products and categories
const seedProductsAndCategories = async () => {
  try {
    // 1. Categories
    const categoriesCount = await CategoryModel.find();
    if (categoriesCount.length === 0) {
      const cats = [
        {
          name: 'Grocery',
          slug: 'grocery',
          description: 'Daily essential staples and grocery supplies',
          image: '/Demo1.jpeg'
        },
        {
          name: 'Cosmetic',
          slug: 'cosmetic',
          description: 'Bulk personal care, beauty, and cosmetic supplies',
          image: '/demo2.jpeg'
        },
        {
          name: 'Electronics',
          slug: 'electronics',
          description: 'Branded electronics, smart phones, and accessories',
          image: '/banner1.jpg'
        }
      ];
      for (const cat of cats) {
        await CategoryModel.create(cat);
      }
      console.log('✅ Default Categories seeded');
    }

    // 2. Products
    const productsCount = await ProductModel.find({});
    if (productsCount.length === 0) {
      const prods = [
        {
          name: 'Fortune Soya Health Refined Soyabean Oil 1L',
          sku: 'GR-OIL-101',
          brand: 'Fortune',
          category: 'grocery',
          description: 'Fortune Soyabean Oil is a healthy refined oil for everyday cooking. Rich in Omega-3 and vitamins.',
          images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80'],
          mrp: 175,
          wholesalePrice: 135,
          retailerPrice: 149,
          discount: 15,
          gstPercentage: 5,
          moq: 12,
          stock: 500,
          weight: 1,
          unit: 'Piece' as const,
          specifications: [{ key: 'Volume', value: '1 Litre' }, { key: 'Package Type', value: 'Pouch' }],
          isActive: true,
          sortOrder: 1
        },
        {
          name: 'Aashirvaad Shudh Chakki Atta 10kg',
          sku: 'GR-ATTA-102',
          brand: 'Aashirvaad',
          category: 'grocery',
          description: 'Aashirvaad Whole Wheat Atta is made from the finest grains, ground using traditional chakki process.',
          images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'],
          mrp: 460,
          wholesalePrice: 380,
          retailerPrice: 410,
          discount: 11,
          gstPercentage: 0,
          moq: 5,
          stock: 250,
          weight: 10,
          unit: 'Piece' as const,
          specifications: [{ key: 'Weight', value: '10 Kilograms' }, { key: 'Grain Type', value: 'Whole Wheat' }],
          isActive: true,
          sortOrder: 2
        },
        {
          name: 'Dove Hair Fall Rescue Shampoo 1kg',
          sku: 'CS-SHMP-103',
          brand: 'Dove',
          category: 'cosmetic',
          description: 'Dove Nutritive Solutions Hair Fall Rescue Shampoo reduces hair fall up to 98% for weak, fragile hair.',
          images: ['/banner2.jpg'],
          mrp: 1370,
          wholesalePrice: 420,
          retailerPrice: 499,
          discount: 63,
          gstPercentage: 18,
          moq: 6,
          stock: 120,
          weight: 1,
          unit: 'Piece' as const,
          specifications: [{ key: 'Volume', value: '1 Litre' }, { key: 'Product Benefit', value: 'Hair Fall Control' }],
          isActive: true,
          sortOrder: 3
        },
        {
          name: 'Premium Basmati Rice (Rozana) 5kg',
          sku: 'GR-RICE-104',
          brand: 'India Gate',
          category: 'grocery',
          description: 'India Gate Rozana is a premium quality aromatic basmati rice, aged to perfection for everyday meals.',
          images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80'],
          mrp: 450,
          wholesalePrice: 310,
          retailerPrice: 350,
          discount: 22,
          gstPercentage: 5,
          moq: 8,
          stock: 350,
          weight: 5,
          unit: 'Piece' as const,
          specifications: [{ key: 'Weight', value: '5 Kilograms' }, { key: 'Grain Length', value: 'Long Grain' }],
          isActive: true,
          sortOrder: 4
        },
        {
          name: 'Samsung Galaxy M14 5G (6GB RAM, 128GB)',
          sku: 'EL-PHN-105',
          brand: 'Samsung',
          category: 'electronics',
          description: 'Samsung Galaxy M14 5G features a 50MP Triple Camera, 6000mAh battery, and Exynos 5nm processor.',
          images: ['/banner1.jpg'],
          mrp: 18999,
          wholesalePrice: 11200,
          retailerPrice: 12499,
          discount: 34,
          gstPercentage: 18,
          moq: 2,
          stock: 80,
          weight: 0.2,
          unit: 'Piece' as const,
          specifications: [{ key: 'RAM', value: '6 GB' }, { key: 'Storage', value: '128 GB' }, { key: 'Battery', value: '6000 mAh' }],
          isActive: true,
          sortOrder: 5
        }
      ];
      for (const prod of prods) {
        await ProductModel.create(prod);
      }
      console.log('✅ Default Products seeded');
    }
  } catch (err: any) {
    console.error('Error seeding default products:', err.message);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();
  await seedAccounts();
  await seedProductsAndCategories();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server successfully launched on port ${PORT}`);
  });
};

startServer();
