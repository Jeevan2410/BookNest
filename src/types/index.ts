export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  coverColor: string;
  description: string;
  longDescription: string;
  genres: string[];
  rating: number;
  pages: number;
  publicationDate: string;
  price: number;
  monthlyPick: boolean;
  featured: boolean;
  editorNote?: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  bookCount: number;
  color: string;
  description: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  annualPrice?: number;
  period: 'month' | 'year';
  books: number;
  features: string[];
  popular?: boolean;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface BoxItem {
  book: Book;
  quantity: number;
}

export interface GiftOption {
  months: number;
  label: string;
  price: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  memberSince: string;
}

export interface AwardYear {
  year: number;
  bookId: string;
  title: string;
  author: string;
  description: string;
  votes: number;
}
