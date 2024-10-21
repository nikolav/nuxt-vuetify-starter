import trimEnd from "lodash/trimEnd";
import { PRODUCTION$ } from "./vars.env";

const LOGGING_: boolean = true;

// export const THEME_ACCENT_SHIFT = 33;
export const THEME_ACCENT_SHIFT = 44;
export const DEBUG$ = !PRODUCTION$ && LOGGING_;

export const URL_APP_PUBLIC = PRODUCTION$
  ? "https://frikom.nikolav.rs/"
  : // ? "https://qdeiymppite.web.app/"
    "http://localhost:3000/";

export const URL_PASSWORD_RESET_FORM_LINK = `${trimEnd(
  URL_APP_PUBLIC,
  "/"
)}/auth-password-reset-form`;

export const URL_VERIFY_EMAIL = `${trimEnd(
  URL_APP_PUBLIC,
  "/"
)}/auth-verify-email`;

export { SSR } from "./vars.env";

export const CATEGORY_KEY_ASSETS_prefix = "CATEGORY_KEY:ASSETS:hhPDiM:";
export const DEFAULT_NO_IMAGE_AVAILABLE = "/no-image.jpg";

export const ASSETS_PATH_proizvodi = "aktiva/proizvodi";
