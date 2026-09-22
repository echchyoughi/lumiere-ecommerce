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
    fullDescription: "The AeroPro Wireless Headphones redefine what premium audio means. Built with audiophiles and casual listeners in mind, they feature 40mm custom-tuned neodymium drivers that reproduce every nuance in your music.",
    specsJson: JSON.stringify([
      ["Driver Size", "40mm Custom Neodymium"],
      ["Frequency Response", "20Hz – 20,000Hz"],
      ["Battery Life", "30 hours (ANC on)"],
      ["Connectivity", "Bluetooth 5.3"]
    ]),
    colorsJson: JSON.stringify(["#1a1a2e", "#1e3a5f", "#c0c0c8"]),
    colorNamesJson: JSON.stringify(["Matte Black", "Midnight Navy", "Platinum"]),
    reviews: [
      { name: "Alex T.", rating: 5, date: "Sep 8, 2026", text: "Blown away by the sound quality. The ANC is outstanding.", avatar: "#7c3aed" }
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
    description: "The Meridian Smart Watch Pro combines Swiss-inspired horology design with cutting-edge health tracking.",
    fullDescription: "Where traditional watchmaking meets modern technology. The 44mm sapphire crystal display is virtually scratch-proof with ECG monitoring and SpO2 measurement.",
    specsJson: JSON.stringify([
      ["Case Size", "44mm"],
      ["Glass", "Sapphire Crystal"],
      ["Battery Life", "Up to 5 days"]
    ]),
    colorsJson: JSON.stringify(["#1a1a2e", "#8B6914", "#2d4a3e"]),
    colorNamesJson: JSON.stringify(["Midnight Black", "Cognac Leather", "Forest Green"]),
    reviews: [
      { name: "Sarah J.", rating: 5, date: "Sep 12, 2026", text: "This watch is a masterpiece. The sapphire glass is stunning.", avatar: "#f59e0b" }
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
    fullDescription: "Lightweight knit upper adapts to your foot shape for a glove-like fit with responsive EVA midsole energy return.",
    specsJson: JSON.stringify([
      ["Upper", "Engineered Knit Mesh"],
      ["Midsole", "Responsive EVA Foam"]
    ]),
    colorsJson: JSON.stringify(["#f0f0f0", "#1a1a2e", "#7c3aed"]),
    colorNamesJson: JSON.stringify(["White/Black", "All Black", "White/Purple"]),
    sizesJson: JSON.stringify(["7", "8", "9", "10", "11"]),
    reviews: [
      { name: "Kim L.", rating: 5, date: "Sep 10, 2026", text: "Most comfortable sneakers I've ever owned.", avatar: "#10b981" }
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
    description: "Crafted from full-grain vegetable-tanned leather, developing a rich patina over time. Fits up to a 15\" laptop.",
    fullDescription: "Full-grain vegetable-tanned leather messenger with solid brass hardware and padded laptop compartment.",
    specsJson: JSON.stringify([
      ["Material", "Full-Grain Leather"],
      ["Dimensions", "40 × 30 × 10 cm"]
    ]),
    colorsJson: JSON.stringify(["#8B6914", "#2d1b0e"]),
    colorNamesJson: JSON.stringify(["Tan", "Dark Brown"]),
    reviews: [
      { name: "James W.", rating: 5, date: "Sep 5, 2026", text: "The leather quality is incredible – already developing patina.", avatar: "#8B6914" }
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
    fullDescription: "TAC polarized lenses block 100% UVA and UVB rays with lightweight stainless steel spring hinges.",
    specsJson: JSON.stringify([
      ["Lens Type", "TAC Polarized"],
      ["UV Protection", "UV400"]
    ]),
    colorsJson: JSON.stringify(["#D4AF37", "#C0C0C0", "#1a1a2e"]),
    colorNamesJson: JSON.stringify(["Gold", "Silver", "Gunmetal"]),
    reviews: [
      { name: "Carlos M.", rating: 5, date: "Sep 14, 2026", text: "Zero glare on the water during fishing trips.", avatar: "#D4AF37" }
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
    description: "Warm, sophisticated fragrance with opening notes of bergamot and black pepper, heart of oud and amber.",
    fullDescription: "20% concentration Eau de Parfum offering 8-12 hours of presence in hand-blown amber glass.",
    specsJson: JSON.stringify([
      ["Concentration", "Eau de Parfum (20%)"],
      ["Volume", "50ml / 100ml"]
    ]),
    reviews: [
      { name: "Isabella C.", rating: 5, date: "Sep 18, 2026", text: "Warm and inviting fragrance with incredible longevity.", avatar: "#C8870A" }
    ]
  },
  // NEW TRENDING PRODUCTS
  {
    id: 7,
    name: "Kova Minimalist LED Desk Lamp",
    category: "electronics",
    price: 179.00,
    originalPrice: 220.00,
    image: "/images/product_lamp.jpg",
    imagesJson: JSON.stringify(["/images/product_lamp.jpg"]),
    rating: 4.9,
    reviewsCount: 184,
    badge: "hot",
    isNew: false,
    inStock: true,
    stock: 18,
    description: "Architectural anodized aluminum LED task lamp with warm ambient dimming and touch slider control.",
    fullDescription: "The Kova LED Desk Lamp combines architectural precision with soft, eye-comfort illumination. Crafted from CNC-machined anodized aluminum, it features touch brightness control and 5 color temperature presets.",
    specsJson: JSON.stringify([
      ["Material", "Anodized Aluminum"],
      ["Light Source", "CRI 95+ Eye-Care LED"],
      ["Power Output", "12W USB-C Powered"]
    ]),
    colorsJson: JSON.stringify(["#1a1a2e", "#c0c0c8"]),
    colorNamesJson: JSON.stringify(["Matte Obsidian", "Brushed Steel"]),
    reviews: [
      { name: "Elena V.", rating: 5, date: "Sep 20, 2026", text: "Sleek architectural design. The ambient glow is perfect for night reading.", avatar: "#c5a059" }
    ]
  },
  {
    id: 8,
    name: "Artisan Ceramic Coffee Dripper Set",
    category: "beauty",
    price: 68.00,
    originalPrice: 85.00,
    image: "/images/product_coffee.jpg",
    imagesJson: JSON.stringify(["/images/product_coffee.jpg"]),
    rating: 4.8,
    reviewsCount: 96,
    badge: "new",
    isNew: true,
    inStock: true,
    stock: 25,
    description: "Hand-crafted matte ceramic pour-over cone and heat-resistant borosilicate glass carafe for morning rituals.",
    fullDescription: "Elevate your morning coffee experience with our hand-glazed ceramic pour-over set. Includes a precision ribbed dripper cone and a 600ml borosilicate glass carafe.",
    specsJson: JSON.stringify([
      ["Capacity", "600ml (2-4 Cups)"],
      ["Material", "Matte Ceramic & Borosilicate Glass"]
    ]),
    colorsJson: JSON.stringify(["#1a1a2e", "#f5f5f7"]),
    colorNamesJson: JSON.stringify(["Charcoal Black", "Off White"]),
    reviews: [
      { name: "Julian P.", rating: 5, date: "Sep 19, 2026", text: "Makes delicious clean pour-over coffee. Looks gorgeous on the counter.", avatar: "#10b981" }
    ]
  },
  {
    id: 9,
    name: "Vanguard Leather Wireless Charger",
    category: "accessories",
    price: 110.00,
    originalPrice: null,
    image: "/images/product_charger.jpg",
    imagesJson: JSON.stringify(["/images/product_charger.jpg"]),
    rating: 4.9,
    reviewsCount: 142,
    badge: "hot",
    isNew: false,
    inStock: true,
    stock: 14,
    description: "Full-grain Italian leather charging pad with dual 15W MagSafe wireless coils and weighted brass base.",
    fullDescription: "Designed for elegant nightstands and desks, the Vanguard features premium Italian leather wrapped around a solid weighted brass frame for effortless one-hand phone pickup.",
    specsJson: JSON.stringify([
      ["Output", "Dual 15W Fast Wireless"],
      ["Material", "Full-Grain Italian Leather & Brass"]
    ]),
    colorsJson: JSON.stringify(["#8B6914", "#1a1a2e"]),
    colorNamesJson: JSON.stringify(["Cognac Tan", "Midnight Black"]),
    reviews: [
      { name: "Marcus H.", rating: 5, date: "Sep 21, 2026", text: "Weighted brass base keeps it planted when lifting the phone. Super high quality.", avatar: "#8B6914" }
    ]
  },
  {
    id: 10,
    name: "Apex Low-Profile Mechanical Keyboard",
    category: "electronics",
    price: 215.00,
    originalPrice: 249.99,
    image: "/images/product_keyboard.jpg",
    imagesJson: JSON.stringify(["/images/product_keyboard.jpg"]),
    rating: 4.9,
    reviewsCount: 310,
    badge: "new",
    isNew: true,
    inStock: true,
    stock: 9,
    description: "CNC aluminum wireless mechanical keyboard with hot-swappable low-profile switches and warm amber backlighting.",
    fullDescription: "Ultra-slim CNC aluminum chassis with tri-mode connection (Bluetooth 5.2, 2.4Ghz, Type-C). Equipped with pre-lubed Gateron low-profile mechanical switches for buttery typing.",
    specsJson: JSON.stringify([
      ["Frame", "CNC Machined Aluminum"],
      ["Switches", "Gateron Low-Profile Mechanical"],
      ["Battery", "4000mAh (Up to 200h)"]
    ]),
    colorsJson: JSON.stringify(["#1a1a2e", "#4a4a4a"]),
    colorNamesJson: JSON.stringify(["Space Gray", "Anodized Black"]),
    reviews: [
      { name: "David L.", rating: 5, date: "Sep 21, 2026", text: "The typing feel and sound acoustic profile are top tier. Best low profile keyboard on the market.", avatar: "#7c3aed" }
    ]
  }
];

async function main() {
  console.log('Seeding Database with Trending Products...');
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
