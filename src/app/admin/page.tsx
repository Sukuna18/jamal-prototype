"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Users, ShoppingBag, Settings } from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user || !user.isAdmin) {
    return null;
  }

  const adminModules = [
    {
      title: "Gestion des produits",
      description: "Ajouter, modifier ou supprimer des produits",
      icon: <Package className="w-8 h-8" />,
      link: "/admin/products",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Gestion des utilisateurs",
      description: "Gérer les comptes utilisateurs",
      icon: <Users className="w-8 h-8" />,
      link: "/admin/users",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Commandes",
      description: "Voir et gérer les commandes",
      icon: <ShoppingBag className="w-8 h-8" />,
      link: "/admin/orders",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Configuration",
      description: "Paramètres du site",
      icon: <Settings className="w-8 h-8" />,
      link: "/admin/settings",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Tableau de bord administrateur
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminModules.map((module) => (
          <Link key={module.title} href={module.link} className="block">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full hover:shadow-md transition-shadow">
              <div
                className={`w-14 h-14 rounded-lg mb-4 flex items-center justify-center ${module.color}`}
              >
                {module.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {module.title}
              </h3>
              <p className="text-sm text-gray-500">{module.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Tableau de bord rapide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Commandes en attente</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="bg-yellow-50 p-2 rounded-full">
                <ShoppingBag className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Nouveaux utilisateurs</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Produits en rupture</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <div className="bg-red-50 p-2 rounded-full">
                <Package className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="inline-block">
          <Button variant="outline">Retour au site</Button>
        </Link>
      </div>
    </div>
  );
}
