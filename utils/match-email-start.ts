import { re_email_start_group } from "./re";
export const matchEmailStart = (val: any) =>
  get(String(val).match(re_email_start_group), "[1]") || "";
