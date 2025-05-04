"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Commande confirmée !
        </h1>

        <p className="text-gray-600 mb-8">
          Merci pour votre commande. Nous vous avons envoyé un email de
          confirmation avec les détails de votre achat.
        </p>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="font-semibold text-lg mb-3">Détails de la commande</h2>
          <div className="text-sm">
            <p className="flex justify-between py-1">
              <span className="text-gray-600">Numéro de commande:</span>
              <span className="font-medium">
                ORD-{Math.floor(Math.random() * 10000)}
              </span>
            </p>
            <p className="flex justify-between py-1 border-b">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </p>
            <p className="flex justify-between py-1 font-medium mt-2">
              <span>Statut:</span>
              <span className="text-green-600">Confirmée</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders">
            <Button className="bg-pink-500 hover:bg-pink-600 w-full sm:w-auto">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Voir mes commandes
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
