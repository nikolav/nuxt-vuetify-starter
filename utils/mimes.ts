import { extensions } from "mime-types";
import transform from "lodash/transform";
import last from "lodash/last";
import findKey from "lodash/findKey";

const extensionsImage = transform(
  extensions,
  (res, lsExt, type) => {
    if (type.startsWith("image/")) {
      res[type] = lsExt;
    }
  },
  <any>{}
);

export const mimetypeLookupImage = (filename: string) => {
  const ext = last(filename.split("."));
  return ext
    ? findKey(extensionsImage, (lsExt: string[]) => lsExt.includes(ext))
    : undefined;
};
