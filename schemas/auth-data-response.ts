import { z } from "zod";
export const schemaAuthData = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  admin: z.boolean(),
  approved: z.boolean(),
  email_verified: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});
