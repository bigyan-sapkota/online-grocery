import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name too long"),

    email: z.email("Enter a valid email"),

    password: z
      .string()
      .min(6, "Minimum 6 characters")
      .max(15, "Password too long"),

    confirmPassword: z.string().min(6, "Please confirm your password"),

    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone must be 10 digits")
      .optional()
      .or(z.literal("")),

    image: z.instanceof(File).optional().or(z.any().optional()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;