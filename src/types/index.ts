// On garde les mêmes types
export type Category = {
  id: string;
  name: string;
  description: string;
  image?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  quantity: number;
  inStock: boolean;
  image: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  product: Product;
};

export type User = {
  id: string;
  email: string;
  name: string; // Peut-être séparer en firstName/lastName plus tard
  isAdmin: boolean;
  avatarUrl?: string; // Ajout de l'URL de l'avatar (optionnel)
  address?: {
    // Ajout de l'adresse (optionnel)
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  status: "en cours" | "expédiée" | "livrée" | "annulée";
  total: number;
  createdAt: Date;
};
