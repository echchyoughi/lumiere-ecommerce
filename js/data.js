/* =============================================
   DATA.JS — Product catalog & data store
   ============================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "AeroPro Wireless Headphones",
    category: "electronics",
    price: 189.99,
    originalPrice: 259.99,
    image: "images/product_headphones.jpg",
    images: ["images/product_headphones.jpg"],
    rating: 4.8,
    reviews: 342,
    badge: "sale",
    isNew: false,
    inStock: true,
    stock: 12,
    description: "Experience audio excellence with our AeroPro wireless headphones. Featuring 40mm custom-tuned drivers, active noise cancellation, and a 30-hour battery life, these headphones deliver studio-quality sound whether you're commuting, working, or relaxing.",
    fullDescription: "The AeroPro Wireless Headphones redefine what premium audio means. Built with audiophiles and casual listeners in mind, they feature 40mm custom-tuned neodymium drivers that reproduce every nuance in your music. The adaptive active noise cancellation automatically adjusts to your environment, while the Transparency Mode lets you stay aware of your surroundings when needed. With up to 30 hours of battery life (and a quick 10-minute charge for 3 hours of playback), these headphones are built for the long haul. The memory foam ear cushions and adjustable headband ensure all-day comfort, while the premium matte finish gives them a refined, understated look.",
    specs: [
      ["Driver Size", "40mm Custom Neodymium"],
      ["Frequency Response", "20Hz – 20,000Hz"],
      ["Battery Life", "30 hours (ANC on)"],
      ["Charging", "USB-C, 2 hours to full"],
      ["Quick Charge", "10 min → 3 hours"],
      ["Connectivity", "Bluetooth 5.3"],
      ["Weight", "248g"],
      ["Colors", "Matte Black, Midnight Navy, Platinum"],
    ],
    colors: ["#1a1a2e", "#1e3a5f", "#c0c0c8"],
    colorNames: ["Matte Black", "Midnight Navy", "Platinum"],
    reviewList: [
      { name: "Alex T.", rating: 5, date: "Sep 8, 2026", text: "Absolutely blown away by the sound quality. The ANC is outstanding and the battery life is no joke – I went 4 days without charging.", avatar: "#7c3aed" },
      { name: "Rachel M.", rating: 5, date: "Aug 29, 2026", text: "Perfect for long flights. Comfortable for 8+ hours, great sound isolation, and the build quality feels premium.", avatar: "#ec4899" },
      { name: "Omar K.", rating: 4, date: "Aug 15, 2026", text: "Very good headphones. Slight mid-bass emphasis but overall excellent. Would love a carrying case included.", avatar: "#10b981" },
    ]
  },
  {
    id: 2,
    name: "Meridian Smart Watch Pro",
    category: "accessories",
    price: 349.00,
    originalPrice: null,
    image: "images/product_watch.jpg",
    images: ["images/product_watch.jpg"],
    rating: 4.9,
    reviews: 218,
    badge: "hot",
    isNew: false,
    inStock: true,
    stock: 7,
    description: "The Meridian Smart Watch Pro combines Swiss-inspired design with cutting-edge health tracking. Monitor your heart rate, sleep, and stress levels while staying connected with smart notifications.",
    fullDescription: "The Meridian Smart Watch Pro is where traditional watchmaking meets modern technology. The 44mm sapphire crystal display is virtually scratch-proof and offers exceptional clarity even in bright sunlight. Under the hood, it packs a comprehensive health suite including ECG monitoring, SpO2 measurement, advanced sleep tracking, and a stress monitor. The built-in GPS tracks your runs, hikes, and rides with precision, while the 5-day battery life means you can focus on life rather than charging. The quick-release leather strap and interchangeable band system let you dress it up or down for any occasion.",
    specs: [
      ["Case Size", "44mm"],
      ["Display", "1.4\" AMOLED, always-on"],
      ["Glass", "Sapphire Crystal"],
      ["Battery Life", "Up to 5 days"],
      ["Water Resistance", "5 ATM (50m)"],
      ["Health Sensors", "Heart Rate, SpO2, ECG, Stress"],
      ["GPS", "Built-in multi-band GPS"],
      ["Connectivity", "Bluetooth 5.2, NFC Payments"],
    ],
    colors: ["#1a1a2e", "#8B6914", "#2d4a3e"],
    colorNames: ["Midnight Black", "Cognac Leather", "Forest Green"],
    reviewList: [
      { name: "Sarah J.", rating: 5, date: "Sep 12, 2026", text: "This watch is a masterpiece. The health tracking is accurate, the design is stunning, and 5-day battery is no joke.", avatar: "#f59e0b" },
      { name: "Marco R.", rating: 5, date: "Sep 1, 2026", text: "Switched from a competitor and the difference is night and day. The sapphire glass alone is worth the price.", avatar: "#06b6d4" },
    ]
  },
  {
    id: 3,
    name: "Urban Runner Sneakers",
    category: "fashion",
    price: 124.99,
    originalPrice: 159.99,
    image: "images/product_sneakers.jpg",
    images: ["images/product_sneakers.jpg"],
    rating: 4.7,
    reviews: 513,
    badge: "sale",
    isNew: false,
    inStock: true,
    stock: 24,
    description: "Where performance meets style. The Urban Runner features responsive foam cushioning and breathable mesh upper for all-day comfort, whether you're hitting the gym or the streets.",
    fullDescription: "The Urban Runner Sneakers represent the perfect fusion of athletic performance and street-ready style. The lightweight knit upper adapts to your foot's shape for a glove-like fit, while strategically placed ventilation zones keep your feet cool during intense sessions. The responsive foam midsole provides energy return with each step, reducing fatigue during long days on your feet. The durable rubber outsole offers reliable traction on both wet and dry surfaces. Available in a range of clean, modern colorways, these sneakers pair seamlessly with everything from gym wear to casual fits.",
    specs: [
      ["Upper", "Engineered Knit Mesh"],
      ["Midsole", "Responsive EVA Foam"],
      ["Outsole", "Durable Carbon Rubber"],
      ["Weight", "285g (Size 9)"],
      ["Fit", "True to size"],
      ["Closure", "Lace-up"],
      ["Insole", "Removable, ortho-friendly"],
    ],
    colors: ["#f0f0f0", "#1a1a2e", "#7c3aed"],
    colorNames: ["White/Black", "All Black", "White/Purple"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    reviewList: [
      { name: "Kim L.", rating: 5, date: "Sep 10, 2026", text: "Most comfortable sneakers I've ever owned. The knit upper is so breathable and they look amazing with everything!", avatar: "#10b981" },
      { name: "Tyler B.", rating: 4, date: "Aug 22, 2026", text: "Great shoes, very comfortable. Runs slightly narrow so if you have wide feet, size up.", avatar: "#3b82f6" },
      { name: "Priya S.", rating: 5, date: "Aug 18, 2026", text: "Perfect gym-to-street shoe. The cushioning is fantastic and I love that they come in such clean colorways.", avatar: "#f59e0b" },
    ]
  },
  {
    id: 4,
    name: "Nomad Leather Messenger Bag",
    category: "accessories",
    price: 229.00,
    originalPrice: null,
    image: "images/product_bag.jpg",
    images: ["images/product_bag.jpg"],
    rating: 4.8,
    reviews: 167,
    badge: "new",
    isNew: true,
    inStock: true,
    stock: 15,
    description: "Crafted from full-grain vegetable-tanned leather, the Nomad Messenger develops a beautiful patina over time. Spacious enough for a 15\" laptop, organized enough for everything else.",
    fullDescription: "The Nomad Leather Messenger Bag is designed for those who appreciate quality that improves with age. Constructed from 100% full-grain vegetable-tanned leather that develops a rich, unique patina over time, this bag is built to be a lifelong companion. The main compartment comfortably fits a 15\" laptop with padded protection, while multiple interior pockets keep your essentials organized. The adjustable crossbody strap is padded for comfort during long commutes, and solid brass hardware adds a touch of timeless elegance. Each bag is handcrafted and bears its own natural markings, making it uniquely yours.",
    specs: [
      ["Material", "Full-Grain Vegetable-Tanned Leather"],
      ["Dimensions", "40 × 30 × 10 cm"],
      ["Laptop Fit", "Up to 15\" laptop"],
      ["Hardware", "Solid Brass"],
      ["Strap", "Adjustable 90–160cm"],
      ["Interior", "2 main, 4 slip pockets, key hook"],
      ["Tanning", "Vegetable (eco-friendly)"],
    ],
    colors: ["#8B6914", "#2d1b0e", "#4a4a4a"],
    colorNames: ["Tan", "Dark Brown", "Charcoal"],
    reviewList: [
      { name: "James W.", rating: 5, date: "Sep 5, 2026", text: "Worth every penny. The leather quality is incredible – already developing a beautiful patina after 2 months of daily use.", avatar: "#8B6914" },
      { name: "Nadia F.", rating: 5, date: "Aug 30, 2026", text: "Perfect for my daily commute. Fits my 14\" MacBook perfectly with room for everything else.", avatar: "#ec4899" },
    ]
  },
  {
    id: 5,
    name: "Aura Polarized Sunglasses",
    category: "accessories",
    price: 89.99,
    originalPrice: 119.99,
    image: "images/product_sunglasses.jpg",
    images: ["images/product_sunglasses.jpg"],
    rating: 4.6,
    reviews: 294,
    badge: "sale",
    isNew: false,
    inStock: true,
    stock: 31,
    description: "UV400 polarized lenses in a timeless silhouette. The Aura sunglasses eliminate glare and protect your eyes while making a bold style statement.",
    fullDescription: "The Aura Polarized Sunglasses combine form and function in a frame that looks as good as it performs. The TAC polarized lenses provide full UV400 protection, blocking 100% of both UVA and UVB rays, while the polarization filter eliminates 99.9% of reflected glare. This makes them ideal for driving, beach days, and outdoor sports alike. The lightweight stainless steel frame with spring hinges fits comfortably for extended wear, and the acetate temples provide a secure, comfortable grip. Arrives in a premium leather-look case with a microfiber cleaning cloth.",
    specs: [
      ["Lens Type", "TAC Polarized"],
      ["UV Protection", "UV400 (100% UVA & UVB)"],
      ["Frame Material", "Stainless Steel"],
      ["Temple Material", "Acetate"],
      ["Lens Width", "60mm"],
      ["Bridge Width", "18mm"],
      ["Temple Length", "145mm"],
      ["Weight", "28g"],
    ],
    colors: ["#D4AF37", "#C0C0C0", "#1a1a2e"],
    colorNames: ["Gold", "Silver", "Gunmetal"],
    reviewList: [
      { name: "Carlos M.", rating: 5, date: "Sep 14, 2026", text: "The polarization is top-notch. Zero glare on the water during fishing trips. Stylish enough to wear everywhere.", avatar: "#D4AF37" },
      { name: "Ava P.", rating: 4, date: "Sep 2, 2026", text: "Beautiful glasses, great quality. The case is a nice bonus. Fit is a little wide for my face but otherwise perfect.", avatar: "#06b6d4" },
    ]
  },
  {
    id: 6,
    name: "Luminary Fragrance Eau de Parfum",
    category: "beauty",
    price: 95.00,
    originalPrice: null,
    image: null,
    images: [],
    cssGradient: "linear-gradient(135deg, #7B3F1F 0%, #C8870A 40%, #F5D78E 100%)",
    rating: 4.9,
    reviews: 128,
    badge: "new",
    isNew: true,
    inStock: true,
    stock: 20,
    description: "A warm, sophisticated fragrance with opening notes of bergamot and black pepper, heart notes of oud and amber, and a base of sandalwood and musk.",
    fullDescription: "Luminary is a fragrance that tells a story of warmth and sophistication. It opens with a vibrant burst of bergamot and a touch of black pepper that gives way to a rich, resinous heart of oud and amber. The base settles into creamy sandalwood and musky woods that linger beautifully on the skin for hours. Each bottle is filled with a 20% concentration Eau de Parfum that offers exceptional longevity — expect 8 to 12 hours of presence. Presented in a hand-blown amber glass bottle with a brushed gold cap.",
    specs: [
      ["Concentration", "Eau de Parfum (20%)"],
      ["Volume", "50ml / 100ml"],
      ["Top Notes", "Bergamot, Black Pepper"],
      ["Heart Notes", "Oud, Amber, Rose"],
      ["Base Notes", "Sandalwood, Musk, Cedarwood"],
      ["Longevity", "8–12 hours"],
      ["Bottle", "Hand-blown Amber Glass"],
    ],
    reviewList: [
      { name: "Isabella C.", rating: 5, date: "Sep 18, 2026", text: "This fragrance is pure luxury. The oud note is not overpowering at all – just warm and inviting. Compliments every time I wear it.", avatar: "#C8870A" },
      { name: "David K.", rating: 5, date: "Sep 8, 2026", text: "I bought this for my partner and she absolutely loves it. The longevity is incredible – still smelling it 10 hours later.", avatar: "#7c3aed" },
    ]
  },
  {
    id: 7,
    name: "Crescent Minimalist Wallet",
    category: "accessories",
    price: 59.99,
    originalPrice: null,
    image: null,
    images: [],
    cssGradient: "linear-gradient(135deg, #1a1a2e 0%, #2d2d50 50%, #3d3d6e 100%)",
    rating: 4.7,
    reviews: 445,
    badge: null,
    isNew: false,
    inStock: true,
    stock: 50,
    description: "Slim, RFID-blocking wallet in genuine leather. Holds up to 8 cards and cash with virtually no bulk in your pocket.",
    fullDescription: "The Crescent Minimalist Wallet is engineered for those who believe less is more. Constructed from supple genuine leather with secure RFID-blocking inner lining to protect your contactless cards from skimming, it holds up to 8 cards and a folded cash compartment. Despite its generous capacity, it maintains a profile slimmer than most smartphones. The pull-tab mechanism gives you quick access to your most-used cards without fumbling. Available in a range of refined leather colors.",
    specs: [
      ["Material", "Full-Grain Genuine Leather"],
      ["Card Capacity", "Up to 8 cards"],
      ["Dimensions", "10.5 × 7.5 × 1.0 cm"],
      ["RFID", "Blocking (13.56 MHz)"],
      ["Weight", "40g"],
    ],
    colors: ["#1a1a2e", "#8B6914", "#1a3a2e"],
    colorNames: ["Navy", "Tan", "Forest"],
    reviewList: [
      { name: "Ben A.", rating: 5, date: "Sep 20, 2026", text: "Perfect slim wallet. Fits all my cards and barely noticeable in my front pocket. The leather quality is great.", avatar: "#3b82f6" },
    ]
  },
  {
    id: 8,
    name: "VisionPro Webcam 4K",
    category: "electronics",
    price: 149.99,
    originalPrice: 199.99,
    image: null,
    images: [],
    cssGradient: "linear-gradient(135deg, #0f0f1a 0%, #1e2040 50%, #2d3070 100%)",
    rating: 4.6,
    reviews: 201,
    badge: "sale",
    isNew: false,
    inStock: true,
    stock: 18,
    description: "Crystal-clear 4K streaming at 30fps or 1080p at 60fps. AI-powered auto-framing, background blur, and studio-quality microphone.",
    fullDescription: "The VisionPro 4K Webcam delivers professional-grade video quality for remote workers, streamers, and content creators. The 8MP Sony sensor captures vibrant, detailed video in 4K/30fps or smooth 1080p/60fps. AI-powered auto-framing keeps you centered in the frame as you move, while the built-in background blur creates a natural bokeh effect without requiring any software. The dual studio microphone array captures your voice with remarkable clarity. Plug-and-play USB-C connectivity means zero driver installation on Mac, Windows, or Linux.",
    specs: [
      ["Resolution", "4K/30fps or 1080p/60fps"],
      ["Sensor", "8MP Sony CMOS"],
      ["FOV", "90° (adjustable 78°/90°)"],
      ["Microphone", "Dual array, noise cancelling"],
      ["Connection", "USB-C (USB 3.0)"],
      ["Auto-framing", "AI-powered"],
      ["OS Support", "Windows, macOS, Linux"],
    ],
    reviewList: [
      { name: "Diane H.", rating: 5, date: "Sep 11, 2026", text: "Transformed my video calls. The auto-framing is like magic and the image quality is stunning compared to my old webcam.", avatar: "#06b6d4" },
    ]
  },
  {
    id: 9,
    name: "Luxe Cotton Essentials Tee",
    category: "fashion",
    price: 39.99,
    originalPrice: null,
    image: null,
    images: [],
    cssGradient: "linear-gradient(135deg, #f5f5f0 0%, #e8e8e0 100%)",
    rating: 4.5,
    reviews: 832,
    badge: null,
    isNew: false,
    inStock: true,
    stock: 100,
    description: "Made from 200gsm Pima cotton, this is the tee you'll reach for every day. Timeless fit, exceptional softness, and lasting color after dozens of washes.",
    fullDescription: "The Luxe Cotton Essentials Tee is built around one principle: the perfect everyday t-shirt. We sourced 100% Pima cotton — the finest variety of cotton in the world — and wove it into a 200gsm jersey that feels as good as it looks. The relaxed-regular fit flatters all body types without being boxy, and the reinforced collar retains its shape wash after wash. Unlike cheap basics, this tee holds its color and structure through 50+ washes. Available in 12 curated colors that pair with everything.",
    specs: [
      ["Material", "100% Pima Cotton"],
      ["Weight", "200gsm"],
      ["Fit", "Relaxed Regular"],
      ["Collar", "Ribbed Crewneck"],
      ["Wash Care", "Machine wash cold, tumble dry low"],
      ["Sizes", "XS – 3XL"],
    ],
    colors: ["#f0f0f0", "#1a1a2e", "#2d4a3e", "#3a1a1a", "#4a3a2a"],
    colorNames: ["White", "Black", "Sage", "Burgundy", "Camel"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    reviewList: [
      { name: "Lena G.", rating: 5, date: "Sep 15, 2026", text: "I bought 5 of these. Best basic tee I've ever found. The Pima cotton is SO soft and it still looks brand new after months of wear.", avatar: "#10b981" },
    ]
  },
  {
    id: 10,
    name: "MagCharge Wireless Pad 15W",
    category: "electronics",
    price: 44.99,
    originalPrice: null,
    image: null,
    images: [],
    cssGradient: "linear-gradient(135deg, #0d1117 0%, #1c2030 50%, #1a1a2e 100%)",
    rating: 4.5,
    reviews: 379,
    badge: null,
    isNew: true,
    inStock: true,
    stock: 42,
    description: "15W fast wireless charging pad compatible with all Qi-enabled devices. Ultra-thin profile, foreign object detection, and LED status indicator.",
    fullDescription: "The MagCharge 15W Wireless Charging Pad brings fast, cable-free charging to any Qi-compatible device. At 15W, it charges compatible devices up to 3× faster than standard 5W pads, while maintaining full 7.5W for iPhones and 10W for Galaxy devices. The ultra-slim 6mm profile with frosted anti-slip surface keeps your desk clean and your device in place. Built-in foreign object detection (FOD) automatically stops charging if it detects non-compatible objects, and the adaptive LED breathes to confirm your device is charging without being distracting at night.",
    specs: [
      ["Max Output", "15W"],
      ["iPhone", "7.5W MagSafe"],
      ["Android (Samsung)", "10W Fast Charge"],
      ["Standard Qi", "5W"],
      ["Thickness", "6mm"],
      ["Input", "USB-C 18W adapter (included)"],
      ["Compatibility", "All Qi-enabled devices"],
    ],
    reviewList: [
      { name: "Aaron T.", rating: 5, date: "Sep 16, 2026", text: "Clean, minimal design and charges my iPhone incredibly fast. The LED is tasteful – dims when you're in a dark room.", avatar: "#7c3aed" },
    ]
  },
  {
    id: 11,
    name: "Stride Running Shorts",
    category: "fashion",
    price: 54.99,
    originalPrice: 74.99,
    image: null,
    images: [],
    cssGradient: "linear-gradient(135deg, #1a2840 0%, #2a3850 50%, #1e4060 100%)",
    rating: 4.6,
    reviews: 267,
    badge: "sale",
    isNew: false,
    inStock: true,
    stock: 38,
    description: "Lightweight 4\" running shorts with built-in liner, zippered back pocket, and sweat-wicking fabric that keeps you dry mile after mile.",
    fullDescription: "Engineered for performance runners and casual joggers alike, the Stride Running Shorts feature a lightweight 88% polyester / 12% elastane shell that moves with you. The 4-inch inseam provides full range of motion without chafing, and the built-in brief liner offers comfortable support without the need for additional compression shorts. A zippered back pocket securely holds your phone or keys, while the waistband drawstring allows for a customizable, secure fit. The moisture-wicking fabric pulls sweat away from skin and dries in minutes.",
    specs: [
      ["Material", "88% Polyester / 12% Elastane"],
      ["Inseam", "4 inches"],
      ["Liner", "Built-in compression brief"],
      ["Pockets", "1 zippered rear pocket"],
      ["Weight", "110g (Size M)"],
      ["Fit", "Athletic fit"],
    ],
    colors: ["#1a2840", "#1a1a2e", "#1a3a2e"],
    colorNames: ["Navy", "Black", "Forest"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    reviewList: [
      { name: "Jake F.", rating: 5, date: "Sep 13, 2026", text: "These are my go-to marathon training shorts. The liner is super comfortable and I love the back pocket for my phone.", avatar: "#3b82f6" },
    ]
  },
  {
    id: 12,
    name: "Botanica Skincare Set",
    category: "beauty",
    price: 78.00,
    originalPrice: 98.00,
    image: null,
    images: [],
    cssGradient: "linear-gradient(135deg, #1a2a1e 0%, #2a4a30 40%, #3a6a42 100%)",
    rating: 4.8,
    reviews: 156,
    badge: "sale",
    isNew: false,
    inStock: true,
    stock: 25,
    description: "3-piece botanical skincare set with vitamin C serum, hyaluronic acid moisturizer, and retinol eye cream. All products are vegan, cruelty-free, and dermatologist-tested.",
    fullDescription: "The Botanica Skincare Set is a thoughtfully curated trio of high-performance skincare products formulated with botanical actives. The 15% Vitamin C + Ferulic Acid Serum brightens, protects, and evens skin tone. The Hyaluronic Acid + Ceramide Moisturizer provides 48-hour deep hydration while reinforcing the skin barrier. The Bakuchiol Eye Cream (a natural retinol alternative) targets dark circles, fine lines, and puffiness without irritation. All three products are vegan, cruelty-free, fragrance-free, and dermatologist-tested for sensitive skin.",
    specs: [
      ["Set Includes", "Serum (30ml), Moisturizer (50ml), Eye Cream (15ml)"],
      ["Key Ingredients", "Vitamin C, Hyaluronic Acid, Bakuchiol"],
      ["Skin Type", "All skin types, including sensitive"],
      ["Certifications", "Vegan, Cruelty-Free, Fragrance-Free"],
      ["Shelf Life", "12 months after opening"],
    ],
    reviewList: [
      { name: "Mia C.", rating: 5, date: "Sep 17, 2026", text: "My skin looks so much brighter after 3 weeks! The serum is light and absorbs quickly. Love that it's all cruelty-free.", avatar: "#10b981" },
    ]
  }
];

// Helper: get product by ID
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

// Helper: generate star HTML
function getStarHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '★';
  if (half) stars += '½';
  while (stars.replace('½','').length + (half ? 1 : 0) < 5) stars += '☆';
  return stars;
}

// Helper: get discount percentage
function getDiscount(price, originalPrice) {
  if (!originalPrice) return null;
  return Math.round((1 - price / originalPrice) * 100);
}

// Helper: format currency
function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

// Helper: build placeholder CSS gradient image style
function getProductImageStyle(product) {
  if (product.image) return null;
  return product.cssGradient || 'linear-gradient(135deg, #1e1e2c, #2e2e44)';
}
