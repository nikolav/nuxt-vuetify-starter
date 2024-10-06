export const inverted = <T = any>(node: T) =>
  transform(
    Object(node),
    (accum, value, field) => {
      accum[String(value)] = field;
      return accum;
    },
    <any>{}
  );
