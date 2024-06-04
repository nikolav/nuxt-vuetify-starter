import { type TStoreMain } from "@/types";

// @useStoreMain
export const useStoreMain = defineStore("main", () => {
  const {
    stores: {
      main: { initial },
    },
  } = useAppConfig();
  // @store
  const store$ = ref(initial);
  const get = (path: string) => getPath(store$.value, path);
  const put = (vars: TStoreMain) => {
    each(vars, (value: any, path: string) => {
      set(store$.value, path, value);
    });
  };
  const drop = (...keysToDrop: string[]) => {
    forEach(keysToDrop, (path: string) => {
      unset(store$.value, path);
    });
  };
  const isSet = (path: string) => hasOwn(store$.value, path);
  return {
    store: store$,
    get,
    put,
    drop,
    isSet,
  };
});
