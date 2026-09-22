import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const cartRouter = Router();

// GET /api/cart?sessionId=...
cartRouter.get('/', async (req: Request, res: Response) => {
  try {
    const sessionId = (req.query.sessionId as string) || 'default-session';

    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId },
      include: { product: true }
    });

    const formatted = cartItems.map(item => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
      product: {
        ...item.product,
        images: item.product.imagesJson ? JSON.parse(item.product.imagesJson) : [],
        colors: item.product.colorsJson ? JSON.parse(item.product.colorsJson) : [],
        colorNames: item.product.colorNamesJson ? JSON.parse(item.product.colorNamesJson) : [],
        sizes: item.product.sizesJson ? JSON.parse(item.product.sizesJson) : []
      }
    }));

    return res.json({ success: true, items: formatted });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching cart' });
  }
});

// POST /api/cart
cartRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { productId, sessionId = 'default-session', quantity = 1, color, size } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'productId is required' });
    }

    const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if already in cart with same color and size
    const existing = await prisma.cartItem.findFirst({
      where: {
        sessionId,
        productId: Number(productId),
        selectedColor: color || null,
        selectedSize: size || null
      }
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + Number(quantity) }
      });
      return res.json({ success: true, item: updated, message: 'Cart item updated' });
    }

    const newItem = await prisma.cartItem.create({
      data: {
        sessionId,
        productId: Number(productId),
        quantity: Number(quantity),
        selectedColor: color || null,
        selectedSize: size || null
      }
    });

    return res.status(201).json({ success: true, item: newItem, message: 'Added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/cart/:id
cartRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id } });
      return res.json({ success: true, message: 'Item removed from cart' });
    }

    const updated = await prisma.cartItem.update({
      where: { id },
      data: { quantity: Number(quantity) }
    });

    return res.json({ success: true, item: updated });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/cart/:id
cartRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.cartItem.delete({ where: { id } });
    return res.json({ success: true, message: 'Item removed' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/cart/clear?sessionId=...
cartRouter.delete('/clear/all', async (req: Request, res: Response) => {
  try {
    const sessionId = (req.query.sessionId as string) || 'default-session';
    await prisma.cartItem.deleteMany({ where: { sessionId } });
    return res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});
