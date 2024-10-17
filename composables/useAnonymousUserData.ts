import type { RecordJson } from "@/types";
const $KEY = "$KEY";
export const useAnonymousUserData = () => {
  const {
    app: { COOKIE_ANONYMOS_USER },
  } = useAppConfig();
  const store_ = useCookie<RecordJson>(COOKIE_ANONYMOS_USER, {
    default: () => ({ [`${$KEY}`]: idGen() }),
  });
  const commit = (patches: RecordJson) => {
    each(patches, (value: RecordJson, path: string) => {
      set(store_.value, path, value);
    });
  };
  //
  return { data: store_, commit };
};
