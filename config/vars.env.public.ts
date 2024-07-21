import trimEnd from "lodash/trimEnd";
import { PRODUCTION$ } from "./vars.env";

const LOGGING_: boolean = true;

export const THEME_ACCENT_SHIFT = 33;
export const DEBUG$ = !PRODUCTION$ && LOGGING_;

export const URL_APP_PUBLIC = PRODUCTION$
  ? "https://frikom.nikolav.rs/"
  : "http://localhost:3000/";

export const URL_PASSWORD_RESET_FORM_LINK = `${trimEnd(
  URL_APP_PUBLIC,
  "/"
)}/auth-obnova-lozinke`;

export const URL_VERIFY_EMAIL = `${trimEnd(
  URL_APP_PUBLIC,
  "/"
)}/auth-verify-email`;

export { SSR } from "./vars.env";
