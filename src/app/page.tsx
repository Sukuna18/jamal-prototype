"use client";
import { categories, products } from "@/data/db";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Star } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    rating: 5,
    comment:
      "J'adore cette boutique ! Les produits sont de très haute qualité et le service client est exceptionnel. Je recommande vivement !",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    rating: 4,
    comment:
      "Excellente expérience d'achat. La livraison a été rapide et les articles correspondent parfaitement aux descriptions. Je reviendrai !",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Émilie Leclerc",
    rating: 5,
    comment:
      "Des vêtements magnifiques et de très bonne qualité. Le rapport qualité-prix est imbattable. Ma boutique préférée !",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Lucas Moreau",
    rating: 5,
    comment:
      "Service impeccable et produits exceptionnels. Je suis client depuis plus d'un an et je n'ai jamais été déçu.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Camille Petit",
    rating: 4,
    comment:
      "Boutique très tendance avec un excellent choix. Les prix sont raisonnables pour la qualité proposée.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-pink-400 text-pink-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  );
};

export default function HomePage() {
  // Sélectionnez quelques produits pour l'affichage en vedette
  const featuredProducts = products
    .filter((product) => product.inStock)
    .slice(0, 8); // Augmenter le nombre pour le carrousel

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {/* Slide 1 */}
            <CarouselItem>
              <div className="relative h-[500px] md:h-[750px] flex items-center">
                <div className="absolute inset-0 z-0">
                  <Image
                    width={1200}
                    height={700}
                    quality={100}
                    priority={true}
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80"
                    alt="Hero background 1"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="container mx-auto px-6 md:px-8 relative z-10">
                  <div className="max-w-xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight shadow-text animate-fade-in-down">
                      Découvrez notre nouvelle collection
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl mb-10 shadow-text-sm animate-fade-in-up delay-100">
                      Des produits de qualité pour tous vos besoins, à des prix
                      imbattables.
                    </p>
                    <div className="flex flex-wrap gap-4 animate-fade-in-up delay-200">
                      <Button
                        size="lg"
                        className="bg-pink-500 hover:bg-pink-600 text-white transition-transform hover:scale-105 shadow hover:shadow-lg"
                      >
                        Acheter maintenant
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-transform hover:scale-105 shadow hover:shadow-lg"
                      >
                        En savoir plus
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            {/* Slide 2 */}
            <CarouselItem>
              <div className="relative h-[500px] md:h-[750px] flex items-center">
                <div className="absolute inset-0 z-0">
                  <Image
                    width={1200}
                    height={700}
                    quality={100}
                    priority={true}
                    src="https://img.freepik.com/free-photo/woman-wearing-hat-front-view_23-2149726073.jpg?t=st=1746314632~exp=1746318232~hmac=4646b30016fc5ed11dd8d041c0f24bd6d5c1edf28ac1cd4a6545145d299ec967&w=900"
                    alt="Hero background 2"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="container mx-auto px-6 md:px-8 relative z-10 flex justify-end">
                  <div className="max-w-xl text-right">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight shadow-text animate-fade-in-down">
                      Promotions exclusives en ligne
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl mb-10 shadow-text-sm animate-fade-in-up delay-100">
                      Ne manquez pas nos offres spéciales sur une sélection
                      d'articles.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-end animate-fade-in-up delay-200">
                      <Button
                        size="lg"
                        className="bg-teal-500 hover:bg-teal-600 text-white transition-transform hover:scale-105 shadow hover:shadow-lg"
                      >
                        Voir les offres
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            {/* Slide 3 */}
            <CarouselItem>
              <div className="relative h-[500px] md:h-[750px] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                  <Image
                    width={1200}
                    height={700}
                    quality={100}
                    priority={true}
                    src="https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288973.jpg?t=st=1746316616~exp=1746320216~hmac=51b89605305ecce6bbae51306a28c6a3b0b4b13fcc4ec15206d19a1a78f8828e&w=996"
                    alt="Hero background 3"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                </div>
                <div className="container mx-auto px-6 md:px-8 relative z-10 text-center">
                  <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight shadow-text animate-fade-in-down">
                      Qualité et Style Garantis
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl mb-10 shadow-text-sm animate-fade-in-up delay-100">
                      Explorez nos produits soigneusement sélectionnés pour
                      vous.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-200">
                      <Button
                        size="lg"
                        className="bg-purple-500 hover:bg-purple-600 text-white transition-transform hover:scale-105 shadow hover:shadow-lg"
                      >
                        Explorer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          {/* <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 border-none" /> */}
          {/* <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 border-none" /> */}
        </Carousel>
      </section>

      {/* Catégories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Explorer par Catégorie
            </h2>
            <Button
              variant="ghost"
              asChild
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 font-medium group"
            >
              <Link href="/products">
                Voir tout
                <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000, // Délai légèrement plus long pour les catégories
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <CategoryCard category={category} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 z-10 text-gray-700 bg-white/80 hover:bg-white border shadow-md p-2 rounded-full" />
            <CarouselNext className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 z-10 text-gray-700 bg-white/80 hover:bg-white border shadow-md p-2 rounded-full" />
          </Carousel>
        </div>
      </section>

      {/* Produits en vedette */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Nos Produits Vedettes
            </h2>
            <Button
              variant="ghost"
              asChild
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 font-medium group"
            >
              <Link href="/products">
                Voir tout
                <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000, // Délai différent pour les produits
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 z-10 text-gray-700 bg-white/80 hover:bg-white border shadow-md p-2 rounded-full" />
            <CarouselNext className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 z-10 text-gray-700 bg-white/80 hover:bg-white border shadow-md p-2 rounded-full" />
          </Carousel>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ce que nos clients disent
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les avis de nos clients satisfaits qui ont fait
              confiance à notre boutique.
            </p>
          </div>

          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 6000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-pink-200">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={`Photo de ${testimonial.name}`}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {testimonial.name}
                        </h3>
                        <StarRating rating={testimonial.rating} />
                      </div>
                    </div>
                    <p className="text-gray-600 italic flex-grow">
                      "{testimonial.comment}"
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 z-10 text-gray-700 bg-white/80 hover:bg-white border shadow-md p-2 rounded-full" />
            <CarouselNext className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 z-10 text-gray-700 bg-white/80 hover:bg-white border shadow-md p-2 rounded-full" />
          </Carousel>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-t from-rose-50 to-white">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <Mail className="h-12 w-12 mx-auto text-pink-500 mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Restez Connecté
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            Inscrivez-vous à notre newsletter pour recevoir les dernières
            nouvelles, tendances et offres exclusives directement dans votre
            boîte de réception.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Votre adresse email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200"
              />
            </div>
            <Button
              size="lg"
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white transition-transform hover:scale-105 shadow hover:shadow-lg"
            >
              S'inscrire
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
