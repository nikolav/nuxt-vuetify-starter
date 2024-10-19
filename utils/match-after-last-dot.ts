import get from "lodash/get";
import { reAfterLastDot } from "./re";

export const matchAfterLastDot = (value: string) =>
  get(value.match(reAfterLastDot), "[1]");

