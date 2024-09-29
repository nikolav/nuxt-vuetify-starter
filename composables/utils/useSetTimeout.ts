import type { OrNoValue } from "@/types";
export const useSetTimeout = (
  callback: any,
  config?: OrNoValue<{ once?: boolean }>
) => {
  const ID$ = ref();
  const setTimeout_ = (timeout: number) => {
    ID$.value = setTimeout(callback, timeout);
  };
  const cancel = () => {
    clearTimeout(ID$.value);
    ID$.value = null;
  };
  return assign(config?.once ? once(setTimeout_) : setTimeout_, {
    cancel,
  });
};
