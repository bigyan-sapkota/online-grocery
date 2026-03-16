import type { User } from "./user";

export type Product = {
  id: string;
  title: string;
  image: string | null;
  category: "fruits";
  description: string | null;
  stock: number;
  ownerId: string;
  price: number;
  discount: number;
  createdAt: string;
  owner: User;
};
