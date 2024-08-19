export const useDocConfig = (UID?: any) => {
  const uid = ref();
  const enabled = computed(() => !!uid.value);
  const auth = useStoreApiAuth();
  watchEffect(() => {
    uid.value = toValue(UID) || auth.uid;
  });
  const { userConfig } = useTopics();
  const { data, commit: commit_ } = useDoc<Record<string, any>>(() =>
    userConfig(uid.value)
  );
  // config:set
  const commit = async (PATH: string, value: any) => {
    if (!enabled.value) return;
    await commit_({
      [PATH]: value,
    });
  };
  return {
    data,
    commit,
    // alias
    configCommit: commit,
  };
};
