import { z } from "zod";
export const schemaTask = z.object({
  title: z.string().trim().min(1),
  completedAt: z.coerce.date().nullable().default(null),
  href: z.optional(z.string().trim()),
  description: z.optional(z.string().trim()),
});
