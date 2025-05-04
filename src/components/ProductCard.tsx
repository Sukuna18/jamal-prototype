"use client";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, PackageX } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"; // Importer Badge

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-100">
      <div className="relative h-96 bg-gray-100 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300 ${
              !product.inStock ? "opacity-40" : ""
            } `}
          />
        </Link>
        {product.inStock && product.quantity > 0 && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 bg-white text-gray-700"
          >
            {product.quantity} restant{product.quantity > 1 ? "s" : ""}
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-full text-pink-500 font-medium flex items-center">
              <PackageX className="h-4 w-4 mr-1" />
              Rupture de stock
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-pink-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3 h-10">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>

          <Button
            variant="outline"
            size="sm"
            className={`border-rose-100 text-pink-500 hover:bg-rose-50 ${
              !product.inStock ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => product.inStock && addToCart(product.id, 1)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
