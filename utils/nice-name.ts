import type { OrNoValue } from "@/types";
export const niceName = (
  firstName: OrNoValue<string>,
  lastName: OrNoValue<string>
) => startCase([firstName, lastName].filter(Boolean).join(" "));
