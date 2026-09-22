import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const wishlistRouter = Router();

// GET /api/wishlist?sessionId=...
wishlistRouter.get('/', async (req: Request, res: Response) => {
  try {
    const sessionId = (req.query.sessionId as string) || 'default-session';
    const items = await prisma.wishlist.findMany({
      where: { sessionId },
      include: { product: true }
    });

    const formatted = items.map(i => ({
      id: i.id,
      productId: i.productId,
      product: {
        ...i.product,
        images: i.product.imagesJson ? JSON.parse(i.product.imagesJson) : [],
        colors: i.product.colorsJson ? JSON.parse(i.product.colorsJson) : [],
        colorNames: i.product.colorNamesJson ? JSON.parse(i.product.colorNamesJson) : []
      }
    }));

    return res.json({ success: true, items: formatted });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/wishlist/toggle
wishlistRouter.post('/toggle', async (req: Request, res: Response) => {
  try {
    const { productId, sessionId = 'default-session' } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'productId is required' });
    }

    const pId = Number(productId);
    const existing = await prisma.wishlist.findFirst({
      where: { sessionId, productId: pId }
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
      return res.json({ success: true, isWishlisted: false, message: 'Removed from wishlist' });
    } else {
      await prisma.wishlist.create({
        data: { sessionId, productId: pId }
      });
      return res.json({ success: true, isWishlisted: true, message: 'Added to wishlist' });
    }
  } catch (error) {
    console.error('Wishlist toggle error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});
