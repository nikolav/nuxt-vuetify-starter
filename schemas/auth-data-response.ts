import { z } from "zod";
import { schemaJsonData } from "./json";
export const schemaAuthData = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  profile: z.optional(z.union([z.null(), z.record(schemaJsonData)])),
  // computed
  admin: z.boolean(),
  approved: z.boolean(),
  email_verified: z.boolean(),
  external: z.boolean(),
  manager: z.boolean(),
  // @ts
  created_at: z.string(),
  updated_at: z.string(),
});
