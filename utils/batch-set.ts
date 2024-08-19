// import set from "lodash/set";
// import transform from "lodash/transform";
export const batchSet = <T = any>(object: T, config: Record<string, any>) =>
  transform(
    config,
    (accum, value, path) => set(accum, path, value),
    // JSON.parse(JSON.stringify(object)));
    JSON.parse(JSON.stringify(object || {}))
  );
