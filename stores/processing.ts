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
  watchEffect(() => {
    appProcessing$.value = processing.value;
  });
  return {
    processing,
    addWatch,
    // alias
    watchProcessing: addWatch,
  };
});
