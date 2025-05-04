"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { users } from "@/data/db";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    // Simuler un délai d'authentification
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dans une vraie application, vérifier les identifiants avec le backend
    const foundUser = users.find((u) => u.email === email);

    if (foundUser) {
      setUser(foundUser);
      // Enregistrer dans le localStorage pour la persistance
      localStorage.setItem("user", JSON.stringify(foundUser));
      toast.success("Connexion réussie");
      return true;
    }

    toast.error("Email ou mot de passe incorrect");
    return false;
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    // Simuler un délai d'authentification
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Vérifier si l'email existe déjà
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      toast.error("Cet email est déjà utilisé");
      return false;
    }

    // Dans une vraie application, créer un compte dans le backend
    const newUser: User = {
      id: `user${users.length + 1}`,
      email,
      name,
      isAdmin: false,
    };

    users.push(newUser);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast.success("Compte créé avec succès");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Vous êtes déconnecté");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
