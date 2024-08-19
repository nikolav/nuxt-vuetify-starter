export const useDocTokens = (UID?: any) => {
  const { userDeviceTokens } = useTopics();
  const uid = ref();
  const auth = useStoreApiAuth();
  watchEffect(() => {
    uid.value = toValue(UID) || auth.uid;
  });
  const enabled = computed(() => !!uid.value);
  const { data, commit: commit_ } = useDoc<Record<string, boolean>>(() =>
    userDeviceTokens(uid.value)
  );
  const tokens = computed(() => get(data.value, "data"));
  const commit = async (TOKEN: string, value: boolean) => {
    if (!enabled.value) return;
    await commit_({
      [TOKEN]: value,
    });
  };
  return {
    tokens,
    commit,
  };
};
