import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "AeroPro Wireless Headphones",
    category: "electronics",
    price: 189.99,
    originalPrice: 259.99,
    image: "/images/product_headphones.jpg",
    imagesJson: JSON.stringify(["/images/product_headphones.jpg"]),
    rating: 4.8,
    reviewsCount: 342,
    badge: "sale",
    isNew: false,
    inStock: true,
    stock: 12,
    description: "Experience audio excellence with our AeroPro wireless headphones. Featuring 40mm custom-tuned drivers, active noise cancellation, and a 30-hour battery life.",
    fullDescription: "The AeroPro Wireless Headphones redefine what premium audio means. Built with audiophiles and casual listeners in mind, they feature 40mm custom-tuned neodymium drivers that reproduce every nuance in your music. The adaptive active noise cancellation automatically adjusts to your environment, while the Transparency Mode lets you stay aware of your surroundings when needed.",
    specsJson: JSON.stringify([
      ["Driver Size", "40mm Custom Neodymium"],
      ["Frequency Response", "20Hz – 20,000Hz"],
      ["Battery Life", "30 hours (ANC on)"],
      ["Charging", "USB-C, 2 hours to full"],
      ["Quick Charge", "10 min → 3 hours"],
      ["Connectivity", "Bluetooth 5.3"],
      ["Weight", "248g"]
    ]),
    colorsJson: JSON.stringify(["#1a1a2e", "#1e3a5f", "#c0c0c8"]),
    colorNamesJson: JSON.stringify(["Matte Black", "Midnight Navy", "Platinum"]),
    reviews: [
      { name: "Alex T.", rating: 5, date: "Sep 8, 2026", text: "Absolutely blown away by the sound quality. The ANC is outstanding and battery life is no joke.", avatar: "#7c3aed" },
      { name: "Rachel M.", rating: 5, date: "Aug 29, 2026", text: "Perfect for long flights. Comfortable for 8+ hours, great sound isolation.", avatar: "#ec4899" },
      { name: "Omar K.", rating: 4, date: "Aug 15, 2026", text: "Very good headphones. Slight mid-bass emphasis but overall excellent.", avatar: "#10b981" }
    ]
  },
  {
    id: 2,
    name: "Meridian Smart Watch Pro",
    category: "accessories",
    price: 349.00,
    originalPrice: null,
    image: "/images/product_watch.jpg",
    imagesJson: JSON.stringify(["/images/product_watch.jpg"]),
    rating: 4.9,
    reviewsCount: 218,
    badge: "hot",
    isNew: false,
    inStock: true,
    stock: 7,
    description: "The Meridian Smart Watch Pro combines Swiss-inspired design with cutting-edge health tracking.",
    fullDescription: "The Meridian Smart Watch Pro is where traditional watchmaking meets modern technology. The 44mm sapphire crystal display is virtually scratch-proof and offers exceptional clarity even in bright sunlight. Under the hood, it packs a comprehensive health suite including ECG monitoring, SpO2 measurement, and advanced sleep tracking.",
    specsJson: JSON.stringify([
      ["Case Size", "44mm"],
      ["Display", "1.4\" AMOLED, always-on"],
      ["Glass", "Sapphire Crystal"],
      ["Battery Life", "Up to 5 days"],
      ["Water Resistance", "5 ATM (50m)"],
      ["Connectivity", "Bluetooth 5.2, NFC Payments"]
    ]),
    colorsJson: JSON.stringify(["#1a1a2e", "#8B6914", "#2d4a3e"]),
    colorNamesJson: JSON.stringify(["Midnight Black", "Cognac Leather", "Forest Green"]),
    reviews: [
      { name: "Sarah J.", rating: 5, date: "Sep 12, 2026", text: "This watch is a masterpiece. The health tracking is accurate, design is stunning.", avatar: "#f59e0b" },
      { name: "Marco R.", rating: 5, date: "Sep 1, 2026", text: "Switched from a competitor and the difference is night and day. The sapphire glass alone is worth it.", avatar: "#06b6d4" }
    ]
  },
  {
    id: 3,
    name: "Urban Runner Sneakers",
    category: "fashion",
    price: 124.99,
    originalPrice: 159.99,
    image: "/images/product_sneakers.jpg",
    imagesJson: JSON.stringify(["/images/product_sneakers.jpg"]),
    rating: 4.7,
    reviewsCount: 513,
    badge: "sale",
    isNew: false,
    inStock: true,
    stock: 24,
    description: "Where performance meets style. Responsive foam cushioning and breathable mesh upper for all-day comfort.",
    fullDescription: "The Urban Runner Sneakers represent the perfect fusion of athletic performance and street-ready style. The lightweight knit upper adapts to your foot's shape for a glove-like fit, while strategically placed ventilation zones keep your feet cool.",
    specsJson: JSON.stringify([
      ["Upper", "Engineered Knit Mesh"],
      ["Midsole", "Responsive EVA Foam"],
      ["Outsole", "Durable Carbon Rubber"],
      ["Weight", "285g (Size 9)"]
    ]),
    colorsJson: JSON.stringify(["#f0f0f0", "#1a1a2e", "#7c3aed"]),
    colorNamesJson: JSON.stringify(["White/Black", "All Black", "White/Purple"]),
    sizesJson: JSON.stringify(["6", "7", "8", "9", "10", "11", "12"]),
    reviews: [
      { name: "Kim L.", rating: 5, date: "Sep 10, 2026", text: "Most comfortable sneakers I've ever owned. Breathable and look amazing with everything!", avatar: "#10b981" },
      { name: "Tyler B.", rating: 4, date: "Aug 22, 2026", text: "Great shoes, very comfortable. Fits slightly narrow so if wide, size up.", avatar: "#3b82f6" }
    ]
  },
  {
    id: 4,
    name: "Nomad Leather Messenger Bag",
    category: "accessories",
    price: 229.00,
    originalPrice: null,
    image: "/images/product_bag.jpg",
    imagesJson: JSON.stringify(["/images/product_bag.jpg"]),
    rating: 4.8,
    reviewsCount: 167,
    badge: "new",
    isNew: true,
    inStock: true,
    stock: 15,
    description: "Crafted from full-grain vegetable-tanned leather, developing a beautiful patina over time.",
    fullDescription: "The Nomad Leather Messenger Bag is designed for those who appreciate quality that improves with age. Constructed from 100% full-grain vegetable-tanned leather, this bag fits up to a 15\" laptop with padded protection.",
    specsJson: JSON.stringify([
      ["Material", "Full-Grain Leather"],
      ["Dimensions", "40 × 30 × 10 cm"],
      ["Laptop Fit", "Up to 15\" laptop"],
      ["Hardware", "Solid Brass"]
    ]),
    colorsJson: JSON.stringify(["#8B6914", "#2d1b0e", "#4a4a4a"]),
    colorNamesJson: JSON.stringify(["Tan", "Dark Brown", "Charcoal"]),
    reviews: [
      { name: "James W.", rating: 5, date: "Sep 5, 2026", text: "Worth every penny. The leather quality is incredible – already developing a beautiful patina.", avatar: "#8B6914" }
    ]
  },
  {
    id: 5,
    name: "Aura Polarized Sunglasses",
    category: "accessories",
    price: 89.99,
    originalPrice: 119.99,
    image: "/images/product_sunglasses.jpg",
    imagesJson: JSON.stringify(["/images/product_sunglasses.jpg"]),
    rating: 4.6,
    reviewsCount: 294,
    badge: "sale",
    isNew: false,
    inStock: true,
    stock: 31,
    description: "UV400 polarized lenses in a timeless silhouette. Eliminates glare and protects your eyes.",
    fullDescription: "The Aura Polarized Sunglasses combine form and function in a frame that looks as good as it performs. The TAC polarized lenses provide full UV400 protection while eliminating 99.9% of reflected glare.",
    specsJson: JSON.stringify([
      ["Lens Type", "TAC Polarized"],
      ["UV Protection", "UV400 (100% UVA & UVB)"],
      ["Frame Material", "Stainless Steel"]
    ]),
    colorsJson: JSON.stringify(["#D4AF37", "#C0C0C0", "#1a1a2e"]),
    colorNamesJson: JSON.stringify(["Gold", "Silver", "Gunmetal"]),
    reviews: [
      { name: "Carlos M.", rating: 5, date: "Sep 14, 2026", text: "The polarization is top-notch. Zero glare on the water during fishing trips.", avatar: "#D4AF37" }
    ]
  },
  {
    id: 6,
    name: "Luminary Fragrance Eau de Parfum",
    category: "beauty",
    price: 95.00,
    originalPrice: null,
    image: null,
    cssGradient: "linear-gradient(135deg, #7B3F1F 0%, #C8870A 40%, #F5D78E 100%)",
    imagesJson: JSON.stringify([]),
    rating: 4.9,
    reviewsCount: 128,
    badge: "new",
    isNew: true,
    inStock: true,
    stock: 20,
    description: "A warm, sophisticated fragrance with notes of bergamot, black pepper, oud, amber, and sandalwood.",
    fullDescription: "Luminary is a fragrance that tells a story of warmth and sophistication. It opens with a vibrant burst of bergamot and black pepper that gives way to a rich heart of oud and amber.",
    specsJson: JSON.stringify([
      ["Concentration", "Eau de Parfum (20%)"],
      ["Volume", "50ml / 100ml"],
      ["Top Notes", "Bergamot, Black Pepper"],
      ["Heart Notes", "Oud, Amber, Rose"]
    ]),
    reviews: [
      { name: "Isabella C.", rating: 5, date: "Sep 18, 2026", text: "This fragrance is pure luxury. Compliments every time I wear it.", avatar: "#C8870A" }
    ]
  }
];

async function main() {
  console.log('Seeding Database...');
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.product.deleteMany();

  for (const p of INITIAL_PRODUCTS) {
    const { reviews, ...productData } = p;
    const createdProduct = await prisma.product.create({
      data: productData,
    });

    if (reviews && reviews.length > 0) {
      for (const rev of reviews) {
        await prisma.review.create({
          data: {
            productId: createdProduct.id,
            ...rev,
          },
        });
      }
    }
  }

  console.log('Database Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
