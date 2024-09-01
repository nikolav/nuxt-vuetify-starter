export const batchGet = (source: any, fields: Record<string, string>) =>
  transform(
    fields,
    (accum, dest, path) => set(accum, dest, get(source, path)),
    <Record<string, any>>{}
  );
