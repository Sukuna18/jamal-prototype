"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { products, categories } from "@/data/db";
import { Button } from "@/components/ui/button";
import { ShoppingCart, PackageX, ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { notFound, useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(
    products.find((p) => p.id === productId)
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!product) {
      notFound();
    }
  }, [product]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= (product?.quantity || 0)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart(product.id, quantity);
    }
  };

  if (!product) {
    return null; // Géré par notFound
  }

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          href="/products"
          className="text-gray-600 hover:text-pink-500 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux produits
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image du produit */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          {!product.inStock && (
            <div className="absolute top-4 right-4">
              <div className="bg-white px-4 py-2 rounded-full text-pink-500 font-medium flex items-center">
                <PackageX className="h-4 w-4 mr-1" />
                Rupture de stock
              </div>
            </div>
          )}
        </div>

        {/* Informations produit */}
        <div>
          {category && (
            <Link
              href={`/category/${category.id}`}
              className="text-sm font-medium text-pink-500 hover:text-rose-600"
            >
              {category.name}
            </Link>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-gray-900 mb-6">
            {formatCurrency(product.price)}
          </p>

          <div className="prose prose-gray mb-8">
            <p>{product.description}</p>
          </div>

          {product.inStock ? (
            <>
              <div className="flex items-center mb-6">
                <span className="text-gray-700 mr-2">Quantité:</span>
                <div className="flex border border-gray-300 rounded-md w-32">
                  <button
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="flex-1 text-center border-0 focus:outline-none"
                    value={quantity}
                    min={1}
                    max={product.quantity}
                    onChange={handleQuantityChange}
                  />
                  <button
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={() =>
                      quantity < product.quantity && setQuantity(quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <span className="ml-4 text-sm text-gray-500">
                  {product.quantity} disponibles
                </span>
              </div>

              <Button
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ajouter au panier
              </Button>
            </>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="flex items-center justify-center text-gray-700 font-medium">
                <PackageX className="h-5 w-5 mr-2 text-pink-500" />
                Ce produit est actuellement en rupture de stock
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Vous pouvez nous contacter pour savoir quand il sera de nouveau
                disponible.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
