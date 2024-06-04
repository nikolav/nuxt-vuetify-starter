const DEFAULT_TIMEOUT = 1000;
export const useToggleFlag = (initial = false) => {
  const isActive$ = ref(initial);
  const toggle = () => {
    isActive$.value = !isActive$.value;
  };
  const on = () => {
    isActive$.value = true;
  };
  const off = () => {
    isActive$.value = false;
  };
  // @delayed
  const timeout_ = ref<ReturnType<typeof setTimeout>>();
  const delayCancel = () => clearTimeout(timeout_.value);
  const delayToggle = (msTimeout = DEFAULT_TIMEOUT) => {
    delayCancel();
    timeout_.value = setTimeout(toggle, msTimeout);
  };
  const delayOn = (msTimeout = DEFAULT_TIMEOUT) => {
    delayCancel();
    timeout_.value = setTimeout(on, msTimeout);
  };
  const delayOff = (msTimeout = DEFAULT_TIMEOUT) => {
    delayCancel();
    timeout_.value = setTimeout(off, msTimeout);
  };
  // @api
  return assign(toggle, {
    isActive: isActive$,
    on,
    off,
    delay: {
      on: delayOn,
      off: delayOff,
      toggle: delayToggle,
      cancel: delayCancel,
    },
  });
};
