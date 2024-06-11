const toString_ = Function.prototype.call.bind(Object.prototype.toString);
export const typeCore = (node: any) => toString_(node);
