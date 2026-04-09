import type { ProductSchema } from "@/forms/product-form/schema";
import { apiClient } from "@/lib/api-client";
import { extractErrorMessage, imageBbUrlGenerator } from "@/lib/utils";
import { invalidateProducts } from "@/queries/use-products";
import type { Product } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const addProductKey = ["add-product"];

export default function useAddProduct() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: addProductKey,
    mutationFn: addProduct,

    onMutate: () => {
      toast.loading("Adding product....", { id: 1 });
    },

    onSuccess: () => {
      toast.success("Product added successfully!", { id: 1 });
      navigate("/dashboard/products");
      invalidateProducts();
    },

    onError: (error: Error) => {
      toast.error(error.message, { id: 1 });
    },
  });
}

const addProduct = async (data: ProductSchema): Promise<Product> => {
  try {
    let imageUrl: string | null = null;

    if (data.image) {
      imageUrl = await imageBbUrlGenerator(data.image);
    }

    const { title, category, price, stock, discount } = data;

    const payload = {
      title,
      category,
      price,
      stock,
      discount,
      image: imageUrl,
    };

    const response = await apiClient.post<Product>("/api/products", payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
