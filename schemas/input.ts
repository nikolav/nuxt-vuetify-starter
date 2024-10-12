import { z } from "zod";

export const schemaHasFieldName = z.object({
  name: z.string(),
});

