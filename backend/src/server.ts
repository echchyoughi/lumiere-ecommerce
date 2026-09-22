import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import { productsRouter } from './routes/products';
import { cartRouter } from './routes/cart';
import { ordersRouter } from './routes/orders';
import { authRouter } from './routes/auth';
import { wishlistRouter } from './routes/wishlist';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static product images from parent images directory
app.use('/images', express.static(path.join(__dirname, '../../images')));

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);
app.use('/api/wishlist', wishlistRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'LUMIÈRE E-Commerce API', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`LUMIÈRE Backend API running at http://localhost:${PORT}`);
});
