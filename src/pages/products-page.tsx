import ProductCard from "@/components/cards/product-card";
import ProductFilter from "@/components/product-filter";
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

  const { data: products, isLoading, isError } = useProducts(filter);

  if (isLoading) {
    return <ProductsLoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1>Error try again...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto my-8 flex max-w-[1440px]">
      <div className="sticky top-6 hidden h-150 w-1/5 bg-gray-50 p-6 shadow-sm lg:block">
        <ProductFilter />
      </div>
      {products?.length ? (
        <div className="grid grid-cols-2 justify-items-center gap-8 px-4 md:grid-cols-3 lg:w-4/5 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex w-full items-center justify-center text-2xl font-bold">
          <h1>No Products found</h1>
        </div>
      )}
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
