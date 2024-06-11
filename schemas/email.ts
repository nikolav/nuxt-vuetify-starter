import { z } from "zod";
export const schemaEmail = z.string().email();
