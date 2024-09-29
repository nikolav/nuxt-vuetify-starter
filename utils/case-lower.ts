const lower_ = Function.prototype.call.bind(String.prototype.toLocaleLowerCase);
export const caseLower = (value: any) => (value ? lower_(String(value)) : "");
