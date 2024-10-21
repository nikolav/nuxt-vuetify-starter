export const useSampleCollection = (
  COLLECTION: any = [],
  timeot = 8901,
  _sampleOnInit = true,
  _defaultEmpty = <any>[]
) => {
  const i$ = ref();
  const running = computed(() => null != i$.value);
  const keyCurrent = ref();
  const items = ref<any[]>([]);
  const keysItems = computed(() => keys(items.value));
  const current = computed(() => get(items.value, keyCurrent.value));
  const size = computed(() => len(items.value));
  watchEffect(() => {
    const coll = toValue(COLLECTION);
    items.value = !isEmpty(coll) ? coll : _defaultEmpty;
  });

  const next = () => {
    keyCurrent.value = sample(difference(keysItems.value, [keyCurrent.value]));
  };
  const start = () => {
    i$.value = setInterval(next, timeot);
  };
  const stop = () => {
    clearInterval(i$.value);
    i$.value = undefined;
  };
  // init
  const initialized = useOnceOn(
    () => _sampleOnInit && 0 < items.value?.length,
    next
  );

  return {
    items,
    size,
    current,
    keyCurrent,
    next,
    start,
    stop,
    running,
    initialized: readonly(initialized),
  };
};
