export const useStoreAppProcessing = defineStore("appProcessing", () => {
  const {
    key: { APP_PROCESSING },
  } = useAppConfig();
  const appProcessing$ = useGlobalFlag(APP_PROCESSING);
  const watchAll$ = ref<any[]>([]);
  const processing = computed(() =>
    some(watchAll$.value, (w: any) => !!toValue(w))
  );
  const addWatch = (...args: any[]) => {
    watchAll$.value.push(...args);
  };
  const unwatch = (...args: any[]) => {
    pullAll(watchAll$.value, args);
  };
  const reset = () => {
    watchAll$.value = [];
  };
  watchEffect(() => {
    appProcessing$.value = processing.value;
  });
  return {
    processing,
    // add watchers
    addWatch,
    // remove watchers
    unwatch,
    // remove all watchers
    reset,
    // alias
    watchProcessing: addWatch,
  };
});
