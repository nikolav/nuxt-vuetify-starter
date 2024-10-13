import { z } from "zod";

export const schemaAssetsInput = z.object({
  code: z.optional(z.string()),
  name: z.string(),
  barcode: z.optional(z.string()),
  link: z.optional(z.string()),
});

