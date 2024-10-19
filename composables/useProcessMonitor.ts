type TNoop = (...args: any[]) => void;
export const useProcessMonitor = () => {
  const toggleProcessing = useToggleFlag();
  const error$ = ref<any>(null);
  const success$ = ref(false);
  const begin = (onInit: TNoop = noop) => {
    error$.value = null;
    success$.value = false;
    toggleProcessing.on();
    onInit();
  };
  const setError = (err: any) => {
    error$.value = err;
  };
  const done = (callback: TNoop = noop) => {
    toggleProcessing.off();
    callback();
  };
  const successful = (callback: any = noop) => {
    success$.value = true;
    callback();
  };
  //
  return {
    processing: toggleProcessing.isActive,
    error: error$,
    success: success$,
    begin,
    done,
    setError,
    successful,
  };
};
