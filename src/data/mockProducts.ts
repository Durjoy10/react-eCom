// Extended product interfaces
interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface Specification {
  name: string;
  value: string;
}

interface Variant {
  id: string;
  type: 'color' | 'size';
  name: string;
  value: string;
  image_url?: string;
  inStock: boolean;
}

export interface ExtendedProduct {
  id: string;
  name: string;
  description: string;
  long_description?: string;
  price: number;
  sale_price?: number;
  category: string;
  tags: string[];
  image_url: string;
  gallery?: string[];
  rating: number;
  createdAt: string;
  reviews?: Review[];
  specifications?: Specification[];
  variants?: Variant[];
  features?: string[];
  related_ids?: string[];
  stock_status: 'in_stock' | 'out_of_stock' | 'low_stock';
  stock_quantity?: number;
}

export const mockProducts: ExtendedProduct[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A comfortable and versatile white t-shirt made from 100% cotton',
    long_description: 'This premium white t-shirt is crafted from 100% high-quality cotton, offering exceptional comfort for all-day wear. The classic crew neck design and short sleeves make it a versatile staple for any wardrobe. Perfect for layering or wearing on its own, this t-shirt features a regular fit that flatters all body types. The breathable fabric ensures you stay cool and comfortable no matter the occasion. Easy to care for and machine washable, this durable t-shirt will maintain its shape and color wash after wash.',
    price: 29.99,
    category: 'Fashion',
    tags: ['t-shirt', 'basics', 'cotton'],
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3'
    ],
    rating: 4.5,
    createdAt: '2024-03-15T10:00:00Z',
    reviews: [
      {
        id: '101',
        user: 'John Smith',
        rating: 5,
        comment: 'Excellent quality t-shirt. Very comfortable and fits perfectly.',
        date: '2024-04-01T15:22:00Z',
        helpful: 12
      },
      {
        id: '102',
        user: 'Sarah Johnson',
        rating: 4,
        comment: 'Great basic tee, material is soft but slightly thinner than expected.',
        date: '2024-03-25T09:15:00Z',
        helpful: 5
      },
      {
        id: '103',
        user: 'Michael Brown',
        rating: 5,
        comment: 'This has become my go-to t-shirt. Already ordered more colors!',
        date: '2024-03-20T17:40:00Z',
        helpful: 8
      }
    ],
    specifications: [
      { name: 'Material', value: '100% Cotton' },
      { name: 'Fit', value: 'Regular' },
      { name: 'Neck', value: 'Crew Neck' },
      { name: 'Sleeve', value: 'Short Sleeve' },
      { name: 'Care', value: 'Machine Washable' },
      { name: 'Country of Origin', value: 'Portugal' }
    ],
    variants: [
      { id: 'c1', type: 'color', name: 'White', value: '#FFFFFF', inStock: true },
      { id: 'c2', type: 'color', name: 'Black', value: '#000000', inStock: true },
      { id: 'c3', type: 'color', name: 'Navy', value: '#000080', inStock: true },
      { id: 'c4', type: 'color', name: 'Gray', value: '#808080', inStock: false },
      { id: 's1', type: 'size', name: 'S', value: 'S', inStock: true },
      { id: 's2', type: 'size', name: 'M', value: 'M', inStock: true },
      { id: 's3', type: 'size', name: 'L', value: 'L', inStock: true },
      { id: 's4', type: 'size', name: 'XL', value: 'XL', inStock: true },
      { id: 's5', type: 'size', name: 'XXL', value: 'XXL', inStock: false }
    ],
    features: [
      'Premium 100% cotton fabric',
      'Comfortable regular fit',
      'Reinforced stitching for durability',
      'Pre-shrunk fabric to maintain shape',
      'Tagless design for added comfort'
    ],
    related_ids: ['2', '3', '5'],
    stock_status: 'in_stock',
    stock_quantity: 150
  },
  {
    id: '2',
    name: 'Denim Jeans',
    description: 'Classic blue denim jeans with a modern fit',
    long_description: 'These timeless denim jeans combine classic style with modern comfort. Made from high-quality denim with just the right amount of stretch, they offer exceptional durability and all-day comfort. The modern slim fit is designed to flatter your silhouette without feeling restrictive. Five-pocket styling and reinforced seams ensure practicality and longevity. Perfect for casual everyday wear or dressed up for a night out, these versatile jeans will quickly become a wardrobe staple.',
    price: 79.99,
    category: 'Fashion',
    tags: ['jeans', 'denim', 'basics'],
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3',
    gallery: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1604176424472-17cd740f74e9?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3'
    ],
    rating: 4.8,
    createdAt: '2024-03-10T08:30:00Z',
    reviews: [
      {
        id: '201',
        user: 'David Miller',
        rating: 5,
        comment: 'Best jeans I\'ve owned. Perfect fit and very comfortable.',
        date: '2024-04-05T14:30:00Z',
        helpful: 18
      },
      {
        id: '202',
        user: 'Emily Wilson',
        rating: 5,
        comment: 'Love these! The denim quality is exceptional and they fit true to size.',
        date: '2024-03-28T10:15:00Z',
        helpful: 9
      },
      {
        id: '203',
        user: 'Robert Taylor',
        rating: 4,
        comment: 'Great jeans overall. Slight color variation from the pictures but still satisfied.',
        date: '2024-03-22T16:45:00Z',
        helpful: 3
      }
    ],
    specifications: [
      { name: 'Material', value: '98% Cotton, 2% Elastane' },
      { name: 'Fit', value: 'Slim Fit' },
      { name: 'Rise', value: 'Mid Rise' },
      { name: 'Closure', value: 'Button and Zip' },
      { name: 'Pockets', value: '5 Pocket Design' },
      { name: 'Care', value: 'Machine Wash Cold' }
    ],
    variants: [
      { id: 'c1', type: 'color', name: 'Dark Blue', value: '#0F3460', inStock: true },
      { id: 'c2', type: 'color', name: 'Medium Blue', value: '#3E64FF', inStock: true },
      { id: 'c3', type: 'color', name: 'Light Blue', value: '#5EADF0', inStock: false },
      { id: 'c4', type: 'color', name: 'Black', value: '#000000', inStock: true },
      { id: 's1', type: 'size', name: '28', value: '28', inStock: true },
      { id: 's2', type: 'size', name: '30', value: '30', inStock: true },
      { id: 's3', type: 'size', name: '32', value: '32', inStock: true },
      { id: 's4', type: 'size', name: '34', value: '34', inStock: true },
      { id: 's5', type: 'size', name: '36', value: '36', inStock: false }
    ],
    features: [
      'Premium denim with slight stretch for comfort',
      'Classic 5-pocket design',
      'Reinforced seams for durability',
      'Modern slim fit',
      'Sustainable washing process'
    ],
    related_ids: ['1', '3', '4'],
    stock_status: 'in_stock',
    stock_quantity: 80
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Lightweight and comfortable running shoes',
    long_description: 'Engineered for performance and comfort, these premium running shoes feature responsive cushioning and breathable mesh uppers to keep your feet cool and comfortable mile after mile. The innovative sole design provides excellent traction on various surfaces, while the lightweight construction reduces fatigue during longer runs. Anatomically designed to support your natural gait, these shoes help to reduce impact and improve running efficiency. Whether you\'re a casual jogger or training for a marathon, these versatile running shoes deliver the perfect blend of support, durability, and style.',
    price: 119.99,
    sale_price: 99.99,
    category: 'Sports',
    tags: ['shoes', 'sports', 'running'],
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3'
    ],
    rating: 4.9,
    createdAt: '2024-03-18T15:45:00Z',
    reviews: [
      {
        id: '301',
        user: 'Jessica Anderson',
        rating: 5,
        comment: 'These running shoes changed my marathon training! Super comfortable and supportive.',
        date: '2024-04-07T08:30:00Z',
        helpful: 24
      },
      {
        id: '302',
        user: 'Mark Williams',
        rating: 5,
        comment: 'Perfect for my daily 5K runs. Great cushioning and no blisters even on the first wear.',
        date: '2024-03-30T16:15:00Z',
        helpful: 11
      },
      {
        id: '303',
        user: 'Amanda Garcia',
        rating: 4,
        comment: 'Love these shoes! Only giving 4 stars because they run slightly small.',
        date: '2024-03-25T11:20:00Z',
        helpful: 8
      }
    ],
    specifications: [
      { name: 'Upper', value: 'Engineered Mesh' },
      { name: 'Midsole', value: 'Responsive Foam Cushioning' },
      { name: 'Outsole', value: 'Rubber with Multi-directional Traction Pattern' },
      { name: 'Weight', value: '8.5 oz (Men\'s size 9)' },
      { name: 'Drop', value: '8mm' },
      { name: 'Arch Support', value: 'Neutral' }
    ],
    variants: [
      { id: 'c1', type: 'color', name: 'Red/Black', value: '#D2042D', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3', inStock: true },
      { id: 'c2', type: 'color', name: 'Blue/White', value: '#0000FF', image_url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3', inStock: true },
      { id: 'c3', type: 'color', name: 'Black/Gray', value: '#000000', image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3', inStock: true },
      { id: 'c4', type: 'color', name: 'Green/Yellow', value: '#00FF00', image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3', inStock: false },
      { id: 's1', type: 'size', name: 'US 7', value: '7', inStock: true },
      { id: 's2', type: 'size', name: 'US 8', value: '8', inStock: true },
      { id: 's3', type: 'size', name: 'US 9', value: '9', inStock: true },
      { id: 's4', type: 'size', name: 'US 10', value: '10', inStock: true },
      { id: 's5', type: 'size', name: 'US 11', value: '11', inStock: true },
      { id: 's6', type: 'size', name: 'US 12', value: '12', inStock: false }
    ],
    features: [
      'Lightweight mesh upper for breathability',
      'Responsive cushioning for energy return',
      'Durable rubber outsole for traction',
      'Reinforced heel counter for stability',
      'Reflective elements for visibility in low light'
    ],
    related_ids: ['7', '1', '2'],
    stock_status: 'in_stock',
    stock_quantity: 65
  },
  {
    id: '4',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots',
    long_description: 'Crafted from premium full-grain leather, this sophisticated wallet combines timeless style with practical functionality. The spacious interior features multiple card slots, a clear ID window, and full-length bill compartments to keep your essentials organized. The compact bifold design fits comfortably in your pocket while providing ample storage. Each wallet develops a unique patina over time, becoming more beautiful with age. Meticulously stitched for durability, this high-quality accessory is designed to last for years.',
    price: 49.99,
    category: 'Accessories',
    tags: ['wallet', 'leather', 'accessories'],
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1601592996763-f04c089eb2ed?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1606422748879-63bc7446fef2?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1627123424777-75514d5ffa64?ixlib=rb-4.0.3'
    ],
    rating: 4.3,
    createdAt: '2024-03-05T11:20:00Z',
    reviews: [
      {
        id: '401',
        user: 'Thomas Lee',
        rating: 5,
        comment: 'Excellent quality leather and craftsmanship. This wallet should last for years.',
        date: '2024-04-02T09:45:00Z',
        helpful: 14
      },
      {
        id: '402',
        user: 'Rachel Clark',
        rating: 4,
        comment: 'Beautiful wallet with just the right number of card slots. Leather is a bit stiff at first but softens nicely.',
        date: '2024-03-20T13:30:00Z',
        helpful: 6
      },
      {
        id: '403',
        user: 'Daniel White',
        rating: 3,
        comment: 'Decent wallet. The leather quality is good but the stitching is a bit uneven in places.',
        date: '2024-03-15T17:50:00Z',
        helpful: 2
      }
    ],
    specifications: [
      { name: 'Material', value: 'Full-grain Leather' },
      { name: 'Dimensions', value: '4.5" x 3.5" x 0.5"' },
      { name: 'Card Slots', value: '8' },
      { name: 'Bill Compartments', value: '2' },
      { name: 'ID Window', value: 'Yes' },
      { name: 'RFID Blocking', value: 'Yes' }
    ],
    variants: [
      { id: 'c1', type: 'color', name: 'Brown', value: '#964B00', inStock: true },
      { id: 'c2', type: 'color', name: 'Black', value: '#000000', inStock: true },
      { id: 'c3', type: 'color', name: 'Tan', value: '#D2B48C', inStock: false },
      { id: 'c4', type: 'color', name: 'Navy', value: '#000080', inStock: true }
    ],
    features: [
      'Genuine full-grain leather',
      'RFID blocking technology',
      'Multiple card slots and bill compartments',
      'Clear ID window',
      'Handcrafted with precision stitching'
    ],
    related_ids: ['1', '2', '5'],
    stock_status: 'low_stock',
    stock_quantity: 12
  },
  {
    id: '5',
    name: 'Smartwatch',
    description: 'Modern smartwatch with health tracking features',
    price: 199.99,
    category: 'Electronics',
    tags: ['watch', 'electronics', 'smart'],
    image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3',
    rating: 4.7,
    createdAt: '2024-03-19T09:15:00Z',
    stock_status: 'in_stock',
    stock_quantity: 45
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 159.99,
    category: 'Electronics',
    tags: ['audio', 'electronics', 'wireless'],
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3',
    rating: 4.6,
    createdAt: '2024-03-20T14:30:00Z',
    stock_status: 'in_stock',
    stock_quantity: 32
  },
  {
    id: '7',
    name: 'Yoga Mat',
    description: 'Premium non-slip yoga mat with carrying strap',
    price: 39.99,
    category: 'Sports',
    tags: ['yoga', 'fitness', 'exercise'],
    image_url: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a1?ixlib=rb-4.0.3',
    rating: 4.4,
    createdAt: '2024-03-17T16:20:00Z',
    stock_status: 'in_stock',
    stock_quantity: 28
  },
  {
    id: '8',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 89.99,
    category: 'Home & Living',
    tags: ['kitchen', 'appliances', 'coffee'],
    image_url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-4.0.3',
    rating: 4.2,
    createdAt: '2024-03-16T12:45:00Z',
    stock_status: 'in_stock',
    stock_quantity: 18
  }
]; 