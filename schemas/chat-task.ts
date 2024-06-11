import { z } from "zod";
export const schemaChatTask = z.object({
  name: z.coerce.string().trim().min(1),
  comment: z.coerce.string().trim().min(1),
});
