const owns_ = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
export const hasOwn = (node: any, key: string) => owns_(Object(node), key);
