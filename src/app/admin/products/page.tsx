"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { products, categories } from "@/data/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, PackageX, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [productsList, setProductsList] = useState([...products]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Formulaire pour ajouter/éditer un produit
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    quantity: 0,
    inStock: true,
    image: "",
  });

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas admin
    if (!user || !user.isAdmin) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    // Filtrer les produits par terme de recherche
    if (searchTerm) {
      setProductsList(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setProductsList([...products]);
    }
  }, [searchTerm]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
    } else if (name === "price" || name === "quantity") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const openAddDialog = () => {
    setFormData({
      id: `prod${products.length + 1}`,
      name: "",
      description: "",
      price: 0,
      categoryId: categories[0]?.id || "",
      quantity: 0,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
    });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (product: any) => {
    setCurrentProduct(product);
    setFormData({ ...product });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: any) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleAddProduct = () => {
    // Ajouter le produit à la liste
    const newProduct = { ...formData };
    products.push(newProduct);
    setProductsList([...products]);
    setIsAddDialogOpen(false);
    toast.success("Produit ajouté avec succès");
  };

  const handleEditProduct = () => {
    // Mettre à jour le produit dans la liste
    const index = products.findIndex((p) => p.id === currentProduct.id);
    if (index !== -1) {
      products[index] = { ...formData };
      setProductsList([...products]);
    }
    setIsEditDialogOpen(false);
    toast.success("Produit mis à jour avec succès");
  };

  const handleDeleteProduct = () => {
    // Supprimer le produit de la liste
    const index = products.findIndex((p) => p.id === currentProduct.id);
    if (index !== -1) {
      products.splice(index, 1);
      setProductsList([...products]);
    }
    setIsDeleteDialogOpen(false);
    toast.success("Produit supprimé avec succès");
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestion des Produits
        </h1>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {/* Recherche */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Liste des produits */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsList.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 rounded overflow-hidden border border-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {categories.find((c) => c.id === product.categoryId)?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.inStock ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        En stock ({product.quantity})
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <PackageX className="h-3 w-3 mr-1" />
                        Rupture de stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                    >
                      <Pencil className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDeleteDialog(product)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog pour ajouter un produit */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau produit</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {" "}
            {/* Increased gap */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="mb-2 block">
                  Nom du produit
                </Label>{" "}
                {/* Added mb-2 block */}
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="price" className="mb-2 block">
                  Prix (€)
                </Label>{" "}
                {/* Added mb-2 block */}
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">
                Description
              </Label>{" "}
              {/* Added mb-2 block */}
              <textarea
                id="description"
                name="description"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" /* Applied Input-like styles */
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categoryId" className="mb-2 block">
                  Catégorie
                </Label>{" "}
                {/* Added mb-2 block */}
                <select
                  id="categoryId"
                  name="categoryId"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" /* Applied Select-like styles */
                  value={formData.categoryId}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="quantity" className="mb-2 block">
                  Quantité
                </Label>{" "}
                {/* Added mb-2 block */}
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="image" className="mb-2 block">
                URL de l'image
              </Label>{" "}
              {/* Added mb-2 block */}
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="inStock"
                name="inStock"
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData({ ...formData, inStock: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" /* Styled checkbox */
              />
              <Label htmlFor="inStock" className="text-sm font-medium">
                En stock
              </Label>{" "}
              {/* Adjusted label style */}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddProduct}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour éditer un produit */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {" "}
            {/* Increased gap */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name" className="mb-2 block">
                  Nom du produit
                </Label>{" "}
                {/* Added mb-2 block */}
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="edit-price" className="mb-2 block">
                  Prix (€)
                </Label>{" "}
                {/* Added mb-2 block */}
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description" className="mb-2 block">
                Description
              </Label>{" "}
              {/* Added mb-2 block */}
              <textarea
                id="edit-description"
                name="description"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" /* Applied Input-like styles */
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-categoryId" className="mb-2 block">
                  Catégorie
                </Label>{" "}
                {/* Added mb-2 block */}
                <select
                  id="edit-categoryId"
                  name="categoryId"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" /* Applied Select-like styles */
                  value={formData.categoryId}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="edit-quantity" className="mb-2 block">
                  Quantité
                </Label>{" "}
                {/* Added mb-2 block */}
                <Input
                  id="edit-quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-image" className="mb-2 block">
                URL de l'image
              </Label>{" "}
              {/* Added mb-2 block */}
              <Input
                id="edit-image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="edit-inStock"
                name="inStock"
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData({ ...formData, inStock: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" /* Styled checkbox */
              />
              <Label htmlFor="edit-inStock" className="text-sm font-medium">
                En stock
              </Label>{" "}
              {/* Adjusted label style */}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={handleEditProduct}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour supprimer un produit */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le produit</DialogTitle>
          </DialogHeader>
          <p>
            Êtes-vous sûr de vouloir supprimer le produit "
            {currentProduct?.name}" ? Cette action est irréversible.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
