const LIKEDISLIKE_key = "TJeZ7JxO";
export const useTopicLikeDislike = (T?: any) => {
  const {
    docs: { LIKEDISLIKE_CACHE_ID },
  } = useAppConfig();
  const topic$ = ref();
  watchEffect(() => {
    topic$.value = toValue(T);
  });
  const key = useLocalStorage(LIKEDISLIKE_key, () => idGen());
  const { data, commit } = useDoc<{
    [topic: string]: {
      likes: Record<string, boolean>;
      dislikes: Record<string, boolean>;
    };
  }>(LIKEDISLIKE_CACHE_ID);
  const store = computed(() => get(data.value, "data"));

  const likesCount = computed(() =>
    !topic$.value
      ? 0
      : reduce(
          get(store.value, `${topic$.value}.likes`) || {},
          (count, value) => (count += true === !!value ? 1 : 0),
          0
        )
  );
  const dislikesCount = computed(() =>
    !topic$.value
      ? 0
      : reduce(
          get(store.value, `${topic$.value}.dislikes`) || {},
          (count, value) => (count += true === !!value ? 1 : 0),
          0
        )
  );
  const isLiked = computed(() =>
    topic$.value
      ? true === get(store.value, `${topic$.value}.likes.${key.value}`)
      : false
  );
  const isDisliked = computed(() =>
    topic$.value
      ? true === get(store.value, `${topic$.value}.dislikes.${key.value}`)
      : false
  );
  const like = async (flag = true) => {
    if (!topic$.value) return;
    let toggle = false;
    if (isLiked.value == flag) return;
    if (isDisliked.value && flag) {
      toggle = true;
    }
    await commit({
      ...(toggle ? { [`${topic$.value}.dislikes.${key.value}`]: false } : {}),
      [`${topic$.value}.likes.${key.value}`]: flag,
    });
  };
  const dislike = async (flag = true) => {
    if (!topic$.value) return;
    let toggle = false;
    if (isDisliked.value == flag) return;
    if (isLiked.value && flag) {
      toggle = true;
    }
    await commit({
      ...(toggle ? { [`${topic$.value}.likes.${key.value}`]: false } : {}),
      [`${topic$.value}.dislikes.${key.value}`]: flag,
    });
  };

  return {
    topic$,
    store,
    likesCount,
    dislikesCount,
    isLiked,
    isDisliked,
    like,
    dislike,
  };
};
