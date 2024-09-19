export const useDocUserDeviceTokens = (UID?: any) => {
  const { userDeviceTokens } = useTopics();
  const uid = ref();
  const auth = useStoreApiAuth();
  watchEffect(() => {
    uid.value = toValue(UID) || auth.uid;
  });
  const client = useDoc<Record<string, boolean>>(() =>
    userDeviceTokens(uid.value)
  );
  const enabled = computed(() => client.enabled.value && !!uid.value);
  const tokens = computed(() => get(client.data.value, "data"));
  const commit = async (TOKEN: string, value: boolean) => {
    if (!enabled.value) return;
    await client.commit(
      {
        [TOKEN]: value,
      },
      true,
      true
    );
  };
  return {
    ...client,
    enabled,
    tokens,
    commit,
  };
};
