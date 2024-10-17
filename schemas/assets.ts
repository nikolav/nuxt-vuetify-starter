import { z } from "zod";

export const schemaAssetsInput = z.object({
  name: z.string(),
  code: z.optional(z.string()),
  barcode: z.optional(z.string()),
  link: z.optional(z.string()),
});
