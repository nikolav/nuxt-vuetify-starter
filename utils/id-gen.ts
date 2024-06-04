let ID = 1;
//
export const idGen = () =>
  parseInt(String(Math.random() * Date.now() * ID++), 10).toString(36);
