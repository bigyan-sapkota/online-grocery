import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useProducts from "@/queries/use-products";

export default function ProductsPage() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return <ProductsLoadingSkeleton />;
  }

  return (
    <div className="mx-auto my-8 flex max-w-[1440px]">
      <div className="h-150 w-1/5 bg-gray-200"></div>
      <div className="grid w-4/5 grid-cols-4 gap-8 px-4">
        {products?.map((product) => {
          const priceAfterDiscount =
            product.price * (1 - product.discount / 100);

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
                <h3 className="font-semibold">{product.title}</h3>
                <p className="mt-1 text-sm font-semibold tracking-wider">
                  NPR.{Math.round(priceAfterDiscount)}{" "}
                  <span className="ml-2 font-normal text-gray-500 line-through">
                    {product.price}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
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
