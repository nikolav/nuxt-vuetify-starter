import { extensions } from "mime-types";
import transform from "lodash/transform";
import findKey from "lodash/findKey";

import { matchAfterLastDot } from "./match-after-last-dot";

const extensionsImage = transform(
  extensions,
  (res, lsExt, type) => {
    if (type.toLowerCase().includes("image")) {
      res[type] = lsExt.map((e) => e.toLowerCase());
    }
    return res;
  },
  <any>{}
);

export const mimetypeLookupImage = (filename: string) => {
  const ext = matchAfterLastDot(filename);
  return ext
    ? findKey(extensionsImage, (lsExt: string[]) =>
        lsExt.includes(ext.toLowerCase())
      )
    : undefined;
};
