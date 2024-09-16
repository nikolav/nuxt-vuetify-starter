export const extension =
  (source: any = {}) =>
  (values: any) =>
    batchSet(source, values);
