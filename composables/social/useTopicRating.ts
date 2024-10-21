import type { IDataRating } from "@/types";
const RATING_LOCAL = "yY9LrkiWtmDkWO3Owty";
export const useTopicRating = (topic: any, _default = 0) => {
  const {
    key: { TOPIC_RATINGS },
  } = useAppConfig();
  const topic$ = ref();
  watchEffect(() => {
    topic$.value = toValue(topic);
  });

  // user:key@local:cache
  const rid$ = useLocalStorage(RATING_LOCAL, () => idGen());
  const { data, commit } = useDoc<IDataRating>(TOPIC_RATINGS);
  const store = computed(() => get(data.value, "data"));
  const val_ = computed(() =>
    get(data.value, `data.${topic$.value}.${rid$.value}`)
  );
  // ratings cache by topic
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
    // skip out of range and equal ratings
    if (!(0 <= r)) return;
    if (r == val_.value) return;
    // update
    try {
      await commit({ [`${topic$.value}.${rid$.value}`]: r });
    } catch (error) {
      // pass
    }
  };

  const clear = async () => {
    if (val_.value)
      try {
        await commit({ [`${topic$.value}.${rid$.value}`]: 0 });
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
