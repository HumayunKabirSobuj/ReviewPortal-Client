export interface reviewDtlOne {
  title: string;
  description: string;
  rating?: number;
  purchaseSource?: string;
  categoryId: string;
  excerp: string;
  isPublished: boolean;
  price?: number;
  isPremium: boolean;
  imageUrls?: string[];
}

export interface categoryList {
  id: string;
  name: string;
}

export interface reviewDtlType {
  id: string;
  title: string;
  description: string;
  rating: number;
  purchaseSource: string;
  imageUrls: string[];
  excerp: string;
  isPremium: boolean;
  price: number;
  isPublished: boolean;
  userId: string;
  categoryId: string;
  author: {
    id: string;
    name: string;
    email: string;
    profileUrl: string | null;
  };
  category: {
    id: string;
    name: string;
  };
}

export interface commentType {
  id: string;
  content: string;
  userId: string;
  reviewId: string;
  createdAt: string;
  review: {
    title: string;
    excerp: string;
    description: string;
  };
}

export interface voteType {
  id: string;
  type: string;
  userId: string;
  reviewId: string;
  review: {
    title: string;
    excerp: string;
    description: string;
  };
}

export interface paymentType {
  id: string;
  userId: string;
  reviewId: string;
  amount: number;
  status: string;
  createdAt: string;
  review: {
    title: string;
    excerp: string;
    description: string;
  };
}
