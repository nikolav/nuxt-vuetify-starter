export const useStoreFlags = defineStore("flags", () => {
  const {
    stores: {
      flags: { initial },
    },
  } = useAppConfig();
  const flags$ = ref(initial);
  const flag = (name: string) => flags$.value[name] || false;
  const on = (name: string) => {
    flags$.value[name] = true;
  };
  const off = (name: string) => {
    flags$.value[name] = false;
  };
  const toggle = (name: string) => {
    flags$.value[name] = !flag(name);
  };
  const isSet = (name: string) => true === flag(name);
  return { flag, on, off, toggle, isSet };
});
