"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { orders as mockOrders } from "@/data/db"; // Import mock data
import { Order } from "@/types";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PackageSearch, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OrdersPage = () => {
  const { user, isLoading } = useAuth();
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      // Filter mock orders for the logged-in user
      // In a real app, you would fetch this from an API
      const filteredOrders = mockOrders.filter(
        (order) => order.userId === user.id
      );
      setUserOrders(filteredOrders);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        Chargement...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <LogIn className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          Veuillez vous connecter
        </h2>
        <p className="text-gray-600 mb-8">
          Connectez-vous pour voir l'historique de vos commandes.
        </p>
        <Link href="/login">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">
            Se connecter
          </Button>
        </Link>
      </div>
    );
  }

  if (userOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <PackageSearch className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          Aucune commande trouvée
        </h2>
        <p className="text-gray-600 mb-8">
          Vous n'avez pas encore passé de commande.
        </p>
        <Link href="/products">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">
            Commencer vos achats
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mes commandes</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 text-left">Commande ID</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4 text-right">Total</th>
                {/* <th className="py-3 px-4 text-center">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {userOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-4 px-4 text-sm font-medium text-gray-600">
                    #{order.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant={order.status as never}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right font-medium text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  {/* <td className="py-4 px-4 text-center">
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
