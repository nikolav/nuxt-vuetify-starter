const upper_ = Function.prototype.call.bind(String.prototype.toLocaleUpperCase);
export const caseUpper = (value: any) => (value ? upper_(String(value)) : "");
