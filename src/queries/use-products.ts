import { apiClient } from "@/lib/api-client";
import { extractErrorMessage } from "@/lib/utils";
import type { Product } from "@/types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type ProductsResponse = {
  cursor: string;
  products: Product[];
};

export const productsKey = ["products"];

export default function useProducts() {
  return useQuery({
    queryKey: productsKey,
    queryFn: fetchProducts,
  });
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get<ProductsResponse>("/api/products");
    return response.data.products;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export function invalidateProducts() {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: productsKey,
  });
}
