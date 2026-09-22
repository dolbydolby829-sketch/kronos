export type BookCategory =
  | 'Fiction'
  | 'Self Development'
  | 'Business'
  | 'Finance'
  | 'Technology'
  | 'Biography'
  | 'Science'
  | 'Fantasy'
  | 'Thriller'
  | 'Academic'
  | 'Productivity'
  | 'History';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  coverBgColor?: string;
  bestseller?: boolean;
  featured?: boolean;
  stock: number;
  pages?: number;
  publisher?: string;
  publicationYear?: number;
  isbn?: string;
  accentColor?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface DemoOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  paymentMethod: 'Cash on Delivery' | 'UPI' | 'Credit / Debit Card';
  shippingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    pinCode: string;
    phone?: string;
  };
}

export interface CategoryInfo {
  name: BookCategory;
  tagline: string;
  description: string;
  image: string;
  bookCount: number;
  featuredAuthors: string[];
}
