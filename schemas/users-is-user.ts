import { z } from "zod";
import { USER_ID_DEFAULT, USERS_HAS_POLICY_ADMINS } from "@/config";
const idsReserved = (<number[]>[]).concat(
  USERS_HAS_POLICY_ADMINS,
  USER_ID_DEFAULT
);
export const schemaUsersNotReserved = z
  .object({
    email: z.string().email(),
    id: z.coerce.number(),
  })
  .refine((d) => !idsReserved.includes(d.id));
