import { z } from "zod";
export const schemaStorageMeta = z.object({
  title: z.optional(z.coerce.string()),
  description: z.optional(z.coerce.string()),
  public: z.optional(z.coerce.boolean()),
});
