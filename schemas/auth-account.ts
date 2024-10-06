import { z } from "zod";
import { schemaJsonDataRecord } from "./json";

export const schemaAuthAccount = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  profile: z.optional(z.union([z.null(), schemaJsonDataRecord])),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
