import ProductCard from "@/components/cards/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import useProducts, { type Category, type Sort } from "@/queries/use-products";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
  let [searchParams] = useSearchParams();

  const filter = {
    q: searchParams.get("q") || undefined,
    price_gte: searchParams.get("price_gte") || undefined,
    price_lte: searchParams.get("price_lte") || undefined,
    category: (searchParams.get("category") as Category) || undefined,
    sort: (searchParams.get("sort") as Sort) || undefined,
  };

  const { data: products, isLoading } = useProducts(filter);

  if (isLoading) {
    return <ProductsLoadingSkeleton />;
  }

  return (
    <div className="mx-auto my-8 flex max-w-[1440px]">
      <div className="hidden h-150 w-1/5 bg-gray-200 lg:block"></div>
      <div className="grid grid-cols-2 justify-items-center gap-8 px-4 md:grid-cols-3 lg:w-4/5 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const ProductsLoadingSkeleton = () => {
  const arr = new Array(12).fill("");
  console.log(arr);
  return (
    <div className="mx-auto my-8 grid max-w-[1200px] grid-cols-4 gap-8 px-4">
      {arr.map((_, idx) => (
        <div key={idx} className="relative h-75 rounded-xl bg-white shadow-sm">
          <Skeleton className="h-53 w-full rounded-tl-xl rounded-tr-xl object-cover" />
          <div className="px-2 pt-3">
            <Skeleton className="h-7 rounded-lg" />
            <Skeleton className="mt-2 h-6 w-20 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
