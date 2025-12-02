import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "É preciso um nome"),
  quantity: z.number().int().nonnegative("A quantidade deve ser zero ou maior"),
  isAvailable: z.boolean(),
});

export const updateProductSchema = createProductSchema.partial();
