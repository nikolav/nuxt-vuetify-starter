import get from "lodash/get";

export const re_email_start_group = /^([^@]+)@.*/;
export const re_jwt =
  /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)$/;
export const reAfterLastColon = /\:([^:]*)$/;
export const reAfterLastDot = /\.([^.]+)$/;

export const matchAfterLastColon = (value: string) =>
  get(value.match(reAfterLastColon), "[1]");
