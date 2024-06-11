import { z } from "zod";
import { USERS_HAS_POLICY_ADMINS } from "@/config";
export const schemaAuthDataAdmin = z.object({
  email: z.string().email(),
  id: z.coerce.number().refine((uid) => USERS_HAS_POLICY_ADMINS.includes(uid)),
});
