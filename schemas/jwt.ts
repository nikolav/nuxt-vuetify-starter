import { z } from "zod";
import validator from "validator";
export const schemaJwt = z.string().refine(validator.isJWT);
