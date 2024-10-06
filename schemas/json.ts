import { z } from "zod";

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];

export type TJsonLiteral = Literal;
export type TJson = Json;
export type JsonDataRecord = { [key: string]: Json };

export const schemaJsonData: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(schemaJsonData), z.record(schemaJsonData)])
);

export const schemaJsonDataRecord: z.ZodType<Json> = z.lazy(() =>
  z.record(schemaJsonData)
);
