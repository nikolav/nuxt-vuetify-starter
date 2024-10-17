import { z } from "zod";
export const schemaPassword = z.coerce.string().min(2);
export const schemaAuthCredentials = z.object({
  email: z.string().email(),
  password: schemaPassword,
});
export const schemaPasswordsMatch = z
  .object({
    password1: schemaPassword,
    password2: schemaPassword,
  })
  .refine((d) => d.password1 === d.password2);
export const schemaAuthCredentialsWithPolicies = schemaAuthCredentials.extend({
  policies: z.optional(z.array(z.string())),
});
