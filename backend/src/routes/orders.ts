import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const ordersRouter = Router();

const VALID_PROMOS: Record<string, number> = {
  'LUMIERE10': 0.10,
  'WELCOME20': 0.20,
  'VIP15': 0.15
};

// POST /api/checkout
ordersRouter.post('/checkout', async (req: Request, res: Response) => {
  try {
    const {
      sessionId = 'default-session',
      shippingName,
      shippingAddress,
      city,
      zipCode,
      country,
      paymentMethod = 'CREDIT_CARD',
      promoCode,
      items
    } = req.body;

    if (!shippingName || !shippingAddress || !city || !zipCode || !country) {
      return res.status(400).json({ success: false, message: 'All shipping fields are required' });
    }

    let orderItems = items;
    if (!orderItems || orderItems.length === 0) {
      const dbItems = await prisma.cartItem.findMany({
        where: { sessionId },
        include: { product: true }
      });
      if (dbItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
      }
      orderItems = dbItems.map(i => ({
        id: i.productId,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        color: i.selectedColor,
        size: i.selectedSize,
        image: i.product.image
      }));
    }

    let subtotal = 0;
    for (const item of orderItems) {
      subtotal += item.price * item.quantity;
    }

    let discountPercentage = 0;
    if (promoCode && VALID_PROMOS[promoCode.toUpperCase()]) {
      discountPercentage = VALID_PROMOS[promoCode.toUpperCase()];
    }

    const discount = subtotal * discountPercentage;
    const shippingFee = subtotal > 100 ? 0 : 15;
    const total = subtotal - discount + shippingFee;

    const orderNumber = 'LUM-' + Math.floor(100000 + Math.random() * 900000);

    const order = await prisma.order.create({
      data: {
        orderNumber,
        shippingName,
        shippingAddress,
        city,
        zipCode,
        country,
        subtotal,
        discount,
        shippingFee,
        total,
        paymentMethod,
        itemsJson: JSON.stringify(orderItems),
        status: 'PROCESSING'
      }
    });

    // Clear cart for this session
    await prisma.cartItem.deleteMany({ where: { sessionId } });

    return res.status(201).json({
      success: true,
      order: {
        ...order,
        items: JSON.parse(order.itemsJson)
      }
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({ success: false, message: 'Server error during checkout' });
  }
});

// GET /api/orders/:orderNumber
ordersRouter.get('/:orderNumber', async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;
    const order = await prisma.order.findUnique({
      where: { orderNumber }
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    return res.json({
      success: true,
      order: {
        ...order,
        items: JSON.parse(order.itemsJson)
      }
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/checkout/validate-promo
ordersRouter.post('/validate-promo', (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Promo code required' });
  }

  const upper = code.trim().toUpperCase();
  if (VALID_PROMOS[upper]) {
    return res.json({
      success: true,
      code: upper,
      discountPercentage: VALID_PROMOS[upper] * 100,
      discountDecimal: VALID_PROMOS[upper]
    });
  }

  return res.status(400).json({ success: false, message: 'Invalid or expired promo code' });
});
