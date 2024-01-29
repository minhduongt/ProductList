export type TProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string[];
  images: string[];
};

export type TProductResponse = {
  products: TProduct[];
  total: number;
  skip: number;
  limit: number;
};
