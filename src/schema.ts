import z from "zod";

export const imageFileSchema = z
  .instanceof(File)
  .optional()
  .or(z.any().optional());
