import type { Product } from "@/types/product";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const priceAfterDiscount = product.price * (1 - product.discount / 100);
  return (
    <div
      key={product.id}
      className="relative h-70 rounded-xl border bg-white shadow-sm"
    >
      <Badge className="absolute top-2 left-2 text-xs">
        {product.category}
      </Badge>
      <img
        src={product.image || "/fallback-product-thumbnail.png"}
        alt={product.title}
        className="h-53 w-full rounded-tl-xl rounded-tr-xl object-cover"
      />

      <div className="px-2 pt-2">
        <Link
          to={`/products/${product.id}`}
          className="hover:text-primary transition-colors duration-300"
        >
          <h3 className="font-semibold">{product.title}</h3>
        </Link>
        <p className="mt-1 text-sm font-semibold tracking-wider">
          NPR.{Math.round(priceAfterDiscount)}{" "}
          <span className="ml-2 font-normal text-gray-500 line-through">
            {product.price}
          </span>
        </p>
      </div>
    </div>
  );
}
