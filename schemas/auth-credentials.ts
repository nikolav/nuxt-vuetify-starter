import { z } from "zod";
export const schemaAuthCredentials = z.object({
  email: z.string().email(),
  password: z.coerce.string().min(2),
});
