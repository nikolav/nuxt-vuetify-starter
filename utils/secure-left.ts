import escapeRegExp from "lodash/escapeRegExp";
export const secureLeft = (prefix: string, s: string) =>
  new RegExp(`^${escapeRegExp(prefix)}`).test(s) ? s : `${prefix}${s}`;
