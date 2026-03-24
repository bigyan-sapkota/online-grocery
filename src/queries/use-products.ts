import { apiClient } from "@/lib/api-client";
import { extractErrorMessage } from "@/lib/utils";
import type { Product } from "@/types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type ProductsResponse = {
  cursor: string;
  products: Product[];
};

export type Category = "fruits" | "vegetables";
export type Sort =
  | "oldest"
  | "recent"
  | "title_asc"
  | "title_desc"
  | "price_asc"
  | "price_desc";

type Filter = Partial<{
  category: Category;
  q: string;
  owner: string;
  limit: string;
  sort: Sort;
  price_gte: string;
  price_lte: string;
}>;

export const productsKey = (filter?: Filter) => [
  "products",
  {
    q: filter?.q || undefined,
    owner: filter?.owner || undefined,
    limit: filter?.limit || 20,
    sort: filter?.sort || "recent",
    price_gte: filter?.price_gte || undefined,
    price_lte: filter?.price_lte || undefined,
  },
];

export default function useProducts(filter?: Filter) {
  return useQuery({
    queryKey: productsKey(filter),
    queryFn: () => fetchProducts(filter),
  });
}

async function fetchProducts(filter?: Filter): Promise<Product[]> {
  try {
    let params: Record<string, string | number> = {};

    if (filter?.limit) params.limit = filter.limit;

    if (filter?.q?.trim()) params.q = filter.q;
    if (filter?.owner?.trim()) params.owner = filter.owner;

    if (filter?.sort) params.sort = filter.sort;
    if (filter?.price_lte?.trim()) params.price_lte = filter.price_lte;
    if (filter?.price_gte?.trim()) params.price_gte = filter.price_gte;

    const response = await apiClient.get<ProductsResponse>("/api/products", {
      params,
    });
    return response.data.products;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export function invalidateProducts() {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: productsKey(),
  });
}
