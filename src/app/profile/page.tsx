"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Package,
  ShoppingBag,
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Clock,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Mock data for user
const mockUser = {
  id: "u123",
  name: "Sophie Martin",
  email: "sophie.martin@example.com",
  phone: "+33 6 12 34 56 78",
  avatarUrl: "/placeholder.svg?height=128&width=128",
  memberSince: "Avril 2022",
  address: {
    street: "123 Avenue des Champs-Élysées",
    city: "Paris",
    zipCode: "75008",
    country: "France",
  },
  loyaltyPoints: 850,
  totalOrders: 12,
};

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-7829",
    createdAt: "2023-04-15T10:30:00Z",
    status: "livrée",
    total: 129.99,
    items: 3,
    trackingNumber: "TRK293847",
  },
  {
    id: "ORD-6543",
    createdAt: "2023-03-22T14:45:00Z",
    status: "expédiée",
    total: 79.5,
    items: 2,
    trackingNumber: "TRK736452",
  },
  {
    id: "ORD-5421",
    createdAt: "2023-02-10T09:15:00Z",
    status: "livrée",
    total: 214.75,
    items: 4,
    trackingNumber: "TRK628394",
  },
  {
    id: "ORD-4398",
    createdAt: "2023-01-05T16:20:00Z",
    status: "livrée",
    total: 45.3,
    items: 1,
    trackingNumber: "TRK192837",
  },
  {
    id: "ORD-3276",
    createdAt: "2022-12-18T11:05:00Z",
    status: "annulée",
    total: 67.8,
    items: 2,
    trackingNumber: "-",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [userOrders, setUserOrders] = useState<typeof mockOrders>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setUser(mockUser);
      setUserOrders(mockOrders);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // Simulate logout
    router.push("/");
  };

  // Function to get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mon Profil</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos informations personnelles et suivez vos commandes
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Se déconnecter
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Information Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden border-none shadow-xl">
              <div className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-rose-900 dark:to-teal-900 h-32"></div>
              <div className="px-6 -mt-16 pb-6">
                <Avatar className="w-24 h-24 border-4 border-background">
                  <AvatarImage
                    src={user?.avatarUrl || "/placeholder.svg"}
                    alt={user?.name}
                  />
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                    {getInitials(user?.name || "")}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-muted-foreground">
                    Client depuis {user?.memberSince}
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-muted-foreground" size={18} />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-muted-foreground" size={18} />
                    <span>{user?.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-muted-foreground mt-1" size={18} />
                    <div>
                      <p>{user?.address.street}</p>
                      <p>
                        {user?.address.zipCode} {user?.address.city}
                      </p>
                      <p>{user?.address.country}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Points de fidélité</span>
                    <span className="font-bold">{user?.loyaltyPoints}</span>
                  </div>
                  <Progress
                    value={((user?.loyaltyPoints ?? 0) / 1000) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Plus que {1000 - (user?.loyaltyPoints ?? 0)} points pour
                    atteindre le statut Premium
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <ShoppingBag className="mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{user?.totalOrders}</p>
                    <p className="text-xs text-muted-foreground">Commandes</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <CreditCard className="mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">
                      {userOrders
                        .reduce((acc, order) => acc + order.total, 0)
                        .toFixed(2)}
                      €
                    </p>
                    <p className="text-xs text-muted-foreground">Dépensés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Column */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package size={16} />
                  Commandes
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="flex items-center gap-2"
                >
                  <User size={16} />
                  Détails du compte
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-6">
                <Card className="border-none shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Historique des Commandes
                    </CardTitle>
                    <CardDescription>
                      Consultez le statut et les détails de vos commandes
                      récentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userOrders.length > 0 ? (
                      <div className="space-y-4">
                        {userOrders.map((order) => (
                          <Card
                            key={order.id}
                            className="overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="p-4 sm:p-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold">
                                      {order.id}
                                    </h3>
                                    <Badge variant={order.status as never}>
                                      {order.status}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar size={14} />
                                      <span>{formatDate(order.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock size={14} />
                                      <span>{formatTime(order.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Package size={14} />
                                      <span>
                                        {order.items} article
                                        {order.items > 1 ? "s" : ""}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col sm:items-end gap-2">
                                  <span className="text-lg font-bold">
                                    {order.total.toFixed(2)} €
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center gap-1"
                                  >
                                    Voir les détails
                                    <ChevronRight size={16} />
                                  </Button>
                                </div>
                              </div>

                              {order.status !== "cancelled" && (
                                <div className="mt-4">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      N° de suivi: {order.trackingNumber}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Aucune commande</h3>
                        <p className="text-muted-foreground mt-2">
                          Vous n'avez pas encore passé de commande.
                        </p>
                        <Button className="mt-4">Commencer vos achats</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card className="border-none shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Détails du compte</CardTitle>
                    <CardDescription>
                      Gérez vos informations personnelles et préférences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-12 text-muted-foreground">
                      Cette section est en cours de développement.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
