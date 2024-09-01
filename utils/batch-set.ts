// import set from "lodash/set";
// import transform from "lodash/transform";
export const batchSet = <T = any>(node: T, data: Record<string, any>) =>
  transform(
    data,
    (accum, value, path) => set(accum, path, value),
    JSON.parse(JSON.stringify(Object(node)))
  );
