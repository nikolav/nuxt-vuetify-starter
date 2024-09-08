import { z } from "zod";
import { isEmail } from "validator";

export const authLoginCreds = z.string().refine((s) => {
  try {
    const [email, password] = s.split(":");
    return isEmail(email) && 0 < len(password);
  } catch (error) {
    //
  }
  return false;
});
