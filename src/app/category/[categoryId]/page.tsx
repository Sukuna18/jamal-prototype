"use client";

import { useState, useEffect } from "react";
import { products, categories } from "@/data/db";
import ProductCard from "@/components/ProductCard";
import { Category, Product } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { notFound, useParams } from "next/navigation";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    // Trouver la catégorie
    const currentCategory =
      categories.find((cat) => cat.id === categoryId) || null;
    if (!currentCategory) {
      notFound();
    }
    setCategory(currentCategory);

    // Filtrer par catégorie
    let filtered = [...products].filter(
      (product) => product.categoryId === categoryId
    );

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Trier les produits
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    setFilteredProducts(filtered);
  }, [categoryId, searchTerm, sortOption]);

  if (!category) {
    return null; // Géré par notFound
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category.name}
        </h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      {/* Filtres et tri */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div className="w-full md:w-64">
          <Label htmlFor="search">Recherche</Label>
          <Input
            id="search"
            type="text"
            placeholder="Rechercher un produit"
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-64">
          <Label htmlFor="sort">Trier par</Label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
              <SelectItem value="price-asc">Prix (croissant)</SelectItem>
              <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Liste des produits */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Aucun produit trouvé
          </h2>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou consultez toutes
            nos catégories.
          </p>
        </div>
      )}
    </div>
  );
}
