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
  const get = (path: any) => getPath(store$.value, path);
  const commit = (vars: TStoreMain) => {
    each(vars, (value: any, path: string) => {
      set(store$.value, path, value);
    });
  };
  const drop = (...pathsToDrop: string[]) => {
    each(pathsToDrop, (path: string) => {
      unset(store$.value, path);
    });
  };
  // const isSet = (path: any) => hasOwn(store$.value, path);
  const isSet = (path: any) => hasPath(store$.value, path);
  return {
    store: store$,
    get,
    commit,
    drop,
    isSet,
    // alias
    put: commit,
  };
});
