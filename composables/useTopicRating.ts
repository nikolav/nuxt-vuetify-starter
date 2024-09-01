import type { IDataRating } from "@/types";
const RATING_LOCAL = "4D7uIqeA1";
export const useTopicRating = (topic: any, _default = 1) => {
  const {
    key: { TOPIC_RATINGS },
  } = useAppConfig();
  const topic$ = ref();
  watchEffect(() => {
    topic$.value = toValue(topic);
  });

  // local cache; user key, values of topics rated
  const rid$ = useLocalStorage(RATING_LOCAL, () => ({
    key: idGen(),
    val: { [topic$.value]: _default },
  }));
  // cache rated value
  const val_ = computed(() => get(rid$.value, `val.${topic$.value}`));
  // ratings cache by topic
  const { data, put } = useDoc<IDataRating>(TOPIC_RATINGS);
  const store = computed(() => get(data.value, "data"));
  const storeExtended = (values: any) => batchSet(store.value, values);
  // topic ratings cache
  const d = computed(() => get(data.value, `data.${topic$.value}`));

  const ratingsCount = computed(() =>
    reduce(d.value, (res, val) => (res += !(0 < val) ? 0 : 1), 0)
  );
  const rating = computed(
    () =>
      ratingsCount.value &&
      Math.round(
        reduce(d.value, (res, val) => (res += 0 < val ? val : 0), 0) /
          ratingsCount.value
      )
  );

  const rate = async (r: any) => {
    if (!(0 <= r)) return;
    try {
      await put(
        storeExtended({ [`${topic$.value}.${rid$.value.key}`]: r }),
        false
      );
      set(rid$.value, `val.${topic$.value}`, r);
    } catch (error) {
      // pass
    }
  };

  const clear = async () => {
    try {
      await put(
        storeExtended({ [`${topic$.value}.${rid$.value.key}`]: 0 }),
        false
      );
      set(rid$.value, `val.${topic$.value}`, 0);
    } catch (error) {
      // pass
    }
  };

  return {
    // all
    store,
    // # crud
    ratingsCount,
    rating,
    rate,
    clear,
    // cache rated value
    val: val_,
  };
};
