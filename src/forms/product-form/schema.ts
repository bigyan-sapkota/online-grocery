import { imageFileSchema } from "@/schema";
import z from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),

  category: z.enum(["fruits", "vegetables"]),

  price: z.number().min(10, "Price must be at least 10").max(100000),

  stock: z.number().min(1).max(10000),

  discount: z.number().min(0).max(100),

  description: z.string().max(1000),

  image: imageFileSchema,
});

export type ProductSchema = z.infer<typeof productSchema>;
