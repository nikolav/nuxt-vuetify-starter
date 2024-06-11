import { re_email_start_group } from "./re";
export const matchEmailStart = (val: any) => {
  const m = String(val).match(re_email_start_group);
  return null != m ? m[1] : `${val}`;
};
