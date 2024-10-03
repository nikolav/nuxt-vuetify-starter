const $KEY = "$KEY";
export const useAnonymousUserData = () => {
  const {
    app: { COOKIE_ANONYMOS_USER },
  } = useAppConfig();
  const { userAnonymous } = useTopics();
  const store_ = useCookie<Record<string, any>>(COOKIE_ANONYMOS_USER, {
    default: () => ({ [`${$KEY}`]: idGen() }),
  });
  const commit = (patches: any) => {
    each(patches, (value, path) => {
      set(store_.value, path, value);
    });
  };
  const d = useDoc(userAnonymous(store_.value[$KEY]));
  const push = async () => await d.commit(omit(store_.value, $KEY), false);
  const pull = async () => {
    await d.reload();
    store_.value = { ...store_.value, ...d.data.value.data };
  };
  //
  return { data: store_, commit, push, pull };
};
