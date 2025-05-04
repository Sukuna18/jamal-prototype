"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { products } from "@/data/db";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Charger le panier sauvegardé
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Récupérer les détails complets des produits
        const cartWithProducts = parsedCart
          .map((item: any) => ({
            ...item,
            product: products.find((p) => p.id === item.productId)!,
          }))
          .filter((item: CartItem) => item.product);

        setItems(cartWithProducts);
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    const cartForStorage = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(cartForStorage));
  }, [items]);

  const findProduct = (productId: string): Product | undefined => {
    return products.find((p) => p.id === productId);
  };

  const addToCart = (productId: string, quantity: number) => {
    const product = findProduct(productId);

    if (!product) {
      toast.error("Produit non trouvé");
      return;
    }

    if (!product.inStock) {
      toast.error("Ce produit est en rupture de stock");
      return;
    }

    // Vérifier si le produit est déjà dans le panier
    const existingItem = items.find((item) => item.productId === productId);

    if (existingItem) {
      // Mettre à jour la quantité
      updateQuantity(productId, existingItem.quantity + quantity);
    } else {
      // Ajouter le nouveau produit
      setItems([...items, { productId, quantity, product }]);
      toast.success(`${product.name} ajouté au panier`);
    }
  };

  const removeFromCart = (productId: string) => {
    const product = items.find((item) => item.productId === productId)?.product;
    setItems(items.filter((item) => item.productId !== productId));
    if (product) {
      toast.info(`${product.name} retiré du panier`);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = findProduct(productId);

    if (!product) {
      return;
    }

    // Vérifier la disponibilité du stock
    if (quantity > product.quantity) {
      toast.warning(`Désolé, seulement ${product.quantity} en stock`);
      quantity = product.quantity;
    }

    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setItems(
        items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
      toast.success(`Quantité mise à jour`);
    }
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Panier vidé");
  };

  // Calculer le total du panier
  const cartTotal = items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  // Calculer le nombre total d'articles
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
