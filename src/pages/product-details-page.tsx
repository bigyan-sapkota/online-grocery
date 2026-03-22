import { useParams } from "react-router-dom";
import useProduct from "@/queries/use-product";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading)
    return <div className="mx-auto max-w-[1200px] p-6">Loading product...</div>;

  if (error || !product)
    return <div className="mx-auto max-w-[1200px] p-6">Product not found</div>;

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8">
      <div className="flex gap-10">
        <div className="w-1/2 overflow-hidden rounded-xl bg-gray-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-[400px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[400px] items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="w-1/2 space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">
              ₹{Math.round(discountedPrice)}
            </span>

            {product.discount > 0 && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.price}
                </span>

                <span className="font-semibold text-green-600">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          <div className="text-sm text-gray-500 capitalize">
            Category: {product.category}
          </div>

          {product.description && (
            <p className="leading-relaxed text-gray-700">
              {product.description}
            </p>
          )}

          <div className="text-sm">
            Stock:{" "}
            <span className="font-semibold">
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </span>
          </div>

          <div className="border-t pt-6">
            <h2 className="mb-2 font-semibold">Seller</h2>

            <div className="flex items-center gap-3">
              {product.owner.image && (
                <img
                  src={product.owner.image}
                  className="h-10 w-10 rounded-full"
                />
              )}

              <div>
                <div className="font-medium">{product.owner.name}</div>
                <div className="text-sm text-gray-500">
                  {product.owner.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
