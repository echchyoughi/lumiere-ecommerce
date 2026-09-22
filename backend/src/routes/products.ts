import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const productsRouter = Router();

// GET /api/products
productsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search, minPrice, maxPrice, sort, badge, inStock } = req.query;

    const where: any = {};

    if (category && category !== 'all' && category !== 'new') {
      where.category = String(category);
    }

    if (category === 'new') {
      where.isNew = true;
    }

    if (badge) {
      where.badge = String(badge);
    }

    if (inStock === 'true') {
      where.inStock = true;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(String(minPrice));
      if (maxPrice) where.price.lte = parseFloat(String(maxPrice));
    }

    if (search) {
      const q = String(search).toLowerCase();
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { category: { contains: q } }
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-low') orderBy = { price: 'asc' };
    if (sort === 'price-high') orderBy = { price: 'desc' };
    if (sort === 'rating') orderBy = { rating: 'desc' };
    if (sort === 'popular') orderBy = { reviewsCount: 'desc' };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        reviews: true
      }
    });

    const formatted = products.map(p => ({
      ...p,
      images: p.imagesJson ? JSON.parse(p.imagesJson) : [],
      specs: p.specsJson ? JSON.parse(p.specsJson) : [],
      colors: p.colorsJson ? JSON.parse(p.colorsJson) : [],
      colorNames: p.colorNamesJson ? JSON.parse(p.colorNamesJson) : [],
      sizes: p.sizesJson ? JSON.parse(p.sizesJson) : [],
    }));

    return res.json({ success: true, count: formatted.length, products: formatted });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
});

// GET /api/products/:id
productsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { reviews: { orderBy: { createdAt: 'desc' } } }
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const formatted = {
      ...product,
      images: product.imagesJson ? JSON.parse(product.imagesJson) : [],
      specs: product.specsJson ? JSON.parse(product.specsJson) : [],
      colors: product.colorsJson ? JSON.parse(product.colorsJson) : [],
      colorNames: product.colorNamesJson ? JSON.parse(product.colorNamesJson) : [],
      sizes: product.sizesJson ? JSON.parse(product.sizesJson) : [],
      reviewList: product.reviews
    };

    return res.json({ success: true, product: formatted });
  } catch (error) {
    console.error('Error fetching product detail:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/products/:id/reviews
productsRouter.post('/:id/reviews', async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const { name, rating, text } = req.body;

    if (!name || !rating || !text) {
      return res.status(400).json({ success: false, message: 'Missing required review fields' });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const colors = ['#7c3aed', '#ec4899', '#10b981', '#3b82f6', '#f59e0b'];
    const randomAvatar = colors[Math.floor(Math.random() * colors.length)];

    const newReview = await prisma.review.create({
      data: {
        productId,
        name,
        rating: Number(rating),
        text,
        date: dateStr,
        avatar: randomAvatar
      }
    });

    // Update product rating average & review count
    const allReviews = await prisma.review.findMany({ where: { productId } });
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        reviewsCount: allReviews.length,
        rating: Math.round(avgRating * 10) / 10
      }
    });

    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    console.error('Error adding review:', error);
    return res.status(500).json({ success: false, message: 'Server error adding review' });
  }
});
