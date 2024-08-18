export const useDocConfig = (UID?: any) => {
  const uid = ref();
  const enabled = computed(() => !!uid.value);
  const auth = useStoreApiAuth();
  watchEffect(() => {
    uid.value = toValue(UID) || get(auth.user$, "id");
  });
  const { userConfig } = useTopics();
  const { data, commit } = useDoc<Record<string, any>>(() =>
    userConfig(uid.value)
  );
  // set config value
  const configPut = async (PATH: string, value: any) => {
    if (!enabled.value) return;
    await commit({
      [PATH]: value,
    });
  };
  return {
    data,
    configPut,
  };
};
