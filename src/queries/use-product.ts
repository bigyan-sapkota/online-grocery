import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { extractErrorMessage } from "@/lib/utils";
import type { User } from "@/types/user";
import type { Product } from "@/types/product";

export type ProductDetails = Product & {
  owner: User;
};

type ProductApiResponse = {
  product: ProductDetails;
};

export const productKey = (id: string) => ["product", id];

export default function useProduct(id?: string) {
  return useQuery({
    queryKey: productKey(id!),
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });
}

async function fetchProduct(id: string): Promise<ProductDetails> {
  try {
    const response = await apiClient.get<ProductApiResponse>(
      `/api/products/${id}`,
    );
    return response.data.product;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
