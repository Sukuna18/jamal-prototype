"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight, ShoppingCart as CartIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } =
    useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <CartIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          Votre panier est vide
        </h2>
        <p className="text-gray-600 mb-8">
          Ajoutez des produits à votre panier pour passer commande.
        </p>
        <Link href="/products">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">
            Voir les produits
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre panier</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des produits */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="py-3 px-4 text-left">Produit</th>
                    <th className="py-3 px-4 text-right">Prix</th>
                    <th className="py-3 px-4 text-center">Quantité</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr key={item.productId}>
                      <td className="py-4 px-4">
                        <Link
                          href={`/product/${item.productId}`}
                          className="flex items-center"
                        >
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 hover:text-pink-500">
                              {item.product.name}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-right text-sm">
                        {formatCurrency(item.product.price)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center border border-gray-200 rounded-md mx-auto w-24">
                          <button
                            className="px-2 py-1 text-gray-600"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="w-10 text-center border-0 focus:outline-none"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.productId,
                                parseInt(e.target.value) || 0
                              )
                            }
                            min={1}
                          />
                          <button
                            className="px-2 py-1 text-gray-600"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-gray-900">
                        {formatCurrency(item.product.price * item.quantity)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          className="text-pink-500 hover:text-rose-700"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <Button
              variant="outline"
              className="border-rose-100 text-pink-500 hover:bg-rose-50"
              onClick={clearCart}
            >
              Vider le panier
            </Button>

            <Link href="/products">
              <Button variant="outline">Continuer vos achats</Button>
            </Link>
          </div>
        </div>

        {/* Résumé de la commande */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Résumé de la commande
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="text-gray-900">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="text-gray-900">Gratuite</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
            </div>

            {user ? (
              <Link href="/checkout">
                <Button className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white">
                  Passer à la caisse
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <div className="mt-6 space-y-4">
                <Link href="/login">
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                    Connexion pour commander
                  </Button>
                </Link>
                <p className="text-sm text-center text-gray-500">
                  Vous n'avez pas de compte ?{" "}
                  <Link
                    href="/register"
                    className="text-pink-500 hover:text-rose-600"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
