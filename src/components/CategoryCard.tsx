import { Category } from "@/types";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/category/${category.id}`} className="block group">
      <div className="relative h-60 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
          <div className="text-white">
            <h3 className="font-bold text-2xl mb-1 group-hover:text-pink-300 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-white/90 line-clamp-2">
              {category.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
