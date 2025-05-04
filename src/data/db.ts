import { Category, Product, User, Order } from "@/types";

// Catégories d'exemple
export const categories: Category[] = [
  {
    id: "cat1",
    name: "Bijoux",
    description: "Bijoux élégants pour toutes les occasions",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop", // Bijoux
  },
  {
    id: "cat2",
    name: "Hijabs",
    description: "Hijabs de haute qualité dans divers styles et couleurs",
    image: "https://m.media-amazon.com/images/I/61R0D0A3CDL._AC_SL1080_.jpg", // Hijabs
  },
  {
    id: "cat3",
    name: "Foulards",
    description: "Foulards légers et élégants pour compléter votre tenue",
    image: "https://sc04.alicdn.com/kf/H0fdc4173495c4c15840ef2d74f6bc007l.jpg", // Foulards
  },
  {
    id: "cat4",
    name: "Robes",
    description: "Robes modestes et modernes pour toutes les occasions",
    image:
      "https://jennah-boutique.com/cdn/shop/files/1.jpg?v=1738589796&width=1600", // Robes modestes
  },
];

// Produits d'exemple
export const products: Product[] = [
  // Bijoux
  {
    id: "prod1",
    name: "Collier en argent",
    description: "Collier délicat en argent sterling 925",
    price: 59.99,
    categoryId: "cat1",
    quantity: 25,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&auto=format&fit=crop", // Collier
  },
  {
    id: "prod2",
    name: "Bague en or rose",
    description: "Bague élégante en or rose 18 carats avec zircon",
    price: 149.99,
    categoryId: "cat1",
    quantity: 10,
    inStock: true,
    image:
      "https://www.maisondelalliance.fr/uploads/montures/335/1200/victoria-r-solitaires-diamants-certifies-entourage-or-rose-750-.jpg", // Bague
  },
  {
    id: "prod3",
    name: "Boucles d'oreilles pendantes",
    description: "Boucles d'oreilles pendantes avec perles",
    price: 39.99,
    categoryId: "cat1",
    quantity: 0,
    inStock: false,
    image:
      "https://www.jollia.fr/media/catalog/product/cache/8db0cb17cef502171021230692a6c24f/b/o/boucles_d_oreilles_pendantes_feuilles_dore_p1.jpg", // Boucles d'oreilles
  },
  {
    id: "prod4",
    name: "Bracelet jonc",
    description: "Bracelet jonc minimaliste en acier inoxydable",
    price: 45.0,
    categoryId: "cat1",
    quantity: 30,
    inStock: true,
    image:
      "https://www.bliche.fr/cdn/shop/files/Bracelet_JONC_ouvert.jpg?v=1742307797", // Bracelet
  },
  // Hijabs
  {
    id: "prod5",
    name: "Hijab en soie",
    description: "Hijab luxueux en pure soie, couleur champagne",
    price: 79.99,
    categoryId: "cat2",
    quantity: 15,
    inStock: true,
    image: "https://diamboutique.com/img/p/2/0/7/9/2079-home_default.jpg", // Hijab soie
  },
  {
    id: "prod6",
    name: "Hijab en jersey",
    description: "Hijab confortable en jersey premium, bleu marine",
    price: 24.99,
    categoryId: "cat2",
    quantity: 40,
    inStock: true,
    image:
      "https://www.hidayalondon.co.uk/cdn/shop/files/mulberry.jpg?v=1688821479", // Hijab jersey
  },
  {
    id: "prod7",
    name: "Hijab instantané",
    description: "Hijab facile à enfiler, idéal pour le quotidien, noir",
    price: 29.99,
    categoryId: "cat2",
    quantity: 0,
    inStock: false,
    image:
      "https://www.orientica.com/images/34706-tunique-femme-musulmane-voilee-hijab-mode-chic-6.jpg", // Hijab noir
  },
  {
    id: "prod8",
    name: "Hijab à motifs floraux",
    description: "Hijab en mousseline légère avec motifs floraux",
    price: 34.99,
    categoryId: "cat2",
    quantity: 22,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop", // Tissu floral
  },
  // Foulards
  {
    id: "prod9",
    name: "Foulard en cachemire",
    description: "Foulard doux et chaud en cachemire, couleur grise",
    price: 89.99,
    categoryId: "cat3",
    quantity: 18,
    inStock: true,
    image:
      "https://img.joomcdn.net/75aedce69d16e89f803a678c3705f1c35b7670e7_original.jpeg", // Foulard cachemire
  },
  {
    id: "prod10",
    name: "Foulard en soie à motifs",
    description: "Foulard carré en soie avec motifs géométriques",
    price: 49.99,
    categoryId: "cat3",
    quantity: 25,
    inStock: true,
    image:
      "https://www.chicandmodesty.com/33168-large_default/hijab-pret-a-nouer-soie-de-medine-kaki.jpg", // Foulard soie motifs
  },
  // Robes
  {
    id: "prod11",
    name: "Robe longue Abaya",
    description: "Robe longue style Abaya, tissu fluide, couleur noire",
    price: 119.99,
    categoryId: "cat4",
    quantity: 12,
    inStock: true,
    image:
      "https://img01.ztat.net/article/spp-media-p1/3c65d3f5cc30454f8b8fd1d0d49d3899/fbb2f735408b4d43bebf43ebff716d05.jpg?imwidth=1800", // Abaya noire
  },
  {
    id: "prod12",
    name: "Robe chemise longue",
    description: "Robe chemise longue en coton, rayures bleues",
    price: 75.0,
    categoryId: "cat4",
    quantity: 20,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&auto=format&fit=crop", // Robe chemise
  },
  {
    id: "prod13",
    name: "Robe maxi florale",
    description: "Robe longue et fluide avec imprimé floral",
    price: 95.5,
    categoryId: "cat4",
    quantity: 0,
    inStock: false,
    image:
      "https://media.cupshe.com/cdn-review.cupshe.com/cmc-admin/product/20230904/6beec2837c9b445bab2190c522b97de3.jpg?speedsize=mxw_320", // Robe florale
  },
];

// Utilisateurs d'exemple
export const users: User[] = [
  {
    id: "user1",
    email: "admin@example.com",
    name: "Admin User", // Nom complet
    isAdmin: true,
    avatarUrl: "https://i.pravatar.cc/150?u=admin@example.com", // Avatar fictif
    address: {
      // Adresse fictive
      street: "123 Rue Admin",
      city: "Adminville",
      zipCode: "00001",
      country: "Adminland",
    },
  },
  {
    id: "user2",
    email: "client@example.com",
    name: "Client Test", // Nom complet
    isAdmin: false,
    avatarUrl: "https://i.pravatar.cc/150?u=client@example.com", // Avatar fictif
    address: {
      // Adresse fictive
      street: "456 Avenue Client",
      city: "Clientbourg",
      zipCode: "00002",
      country: "Clientland",
    },
  },
];

// Commandes d'exemple
export const orders: Order[] = [
  {
    id: "order1",
    userId: "user1",
    items: [
      {
        productId: "prod1",
        quantity: 1,
        product: products.find((p) => p.id === "prod1")!,
      }, // Collier en argent
      {
        productId: "prod5",
        quantity: 1,
        product: products.find((p) => p.id === "prod5")!,
      }, // Hijab en soie
    ],
    status: "en cours",
    total:
      products.find((p) => p.id === "prod1")!.price * 1 +
      products.find((p) => p.id === "prod5")!.price * 1,
    createdAt: new Date("2025-04-15T10:30:00Z"),
  },
  {
    id: "order2",
    userId: "user1",
    items: [
      {
        productId: "prod6",
        quantity: 2,
        product: products.find((p) => p.id === "prod6")!,
      },
    ], // Hijab en jersey
    status: "expédiée",
    total: products.find((p) => p.id === "prod6")!.price * 2,
    createdAt: new Date("2025-04-28T14:00:00Z"),
  },
  {
    id: "order3",
    userId: "user2",
    items: [
      {
        productId: "prod2",
        quantity: 1,
        product: products.find((p) => p.id === "prod2")!,
      },
    ], // Bague en or rose
    status: "annulée",
    total: products.find((p) => p.id === "prod2")!.price * 1,
    createdAt: new Date("2025-05-01T09:15:00Z"),
  },
  {
    id: "order4", // Changement d'ID pour éviter la duplication
    userId: "user2",
    items: [
      {
        productId: "prod1", // Collier en argent
        quantity: 1,
        product: products.find((p) => p.id === "prod1")!,
      },
      {
        productId: "prod8", // Hijab à motifs floraux
        quantity: 1,
        product: products.find((p) => p.id === "prod8")!,
      },
    ],
    status: "livrée",
    total:
      products.find((p) => p.id === "prod1")!.price * 1 +
      products.find((p) => p.id === "prod8")!.price * 1,
    createdAt: new Date("2025-05-03T11:00:00Z"), // Date mise à jour
  },
  {
    id: "order5",
    userId: "user1",
    items: [
      {
        productId: "prod11",
        quantity: 1,
        product: products.find((p) => p.id === "prod11")!,
      }, // Robe Abaya
      {
        productId: "prod9",
        quantity: 1,
        product: products.find((p) => p.id === "prod9")!,
      }, // Foulard cachemire
    ],
    status: "en cours",
    total:
      (products.find((p) => p.id === "prod11")?.price ?? 0) * 1 +
      (products.find((p) => p.id === "prod9")?.price ?? 0) * 1,
    createdAt: new Date("2025-05-04T08:00:00Z"),
  },
];
