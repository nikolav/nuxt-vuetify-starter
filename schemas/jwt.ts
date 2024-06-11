import { z } from "zod";
import { re_jwt } from "@/utils";
export const schemaJwt = z.string().regex(re_jwt);
