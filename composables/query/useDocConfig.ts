import { key_UID } from "@/keys";
export const useDocConfig = (UID?: any) => {
  const uid = ref();
  const uid_ = inject(key_UID);
  const enabled = computed(() => !!uid.value);
  watchEffect(() => {
    uid.value = toValue(UID) || uid_?.value;
  });
  const { userConfig } = useTopics();
  const docapi = useDoc<Record<string, any>>(() => userConfig(uid.value));
  const { data, commit } = docapi;
  // get computed config:value
  const config = (PATH: string) =>
    computed(() =>
      enabled.value ? get(data.value, `data.${PATH}`) : undefined
    );
  // set config value
  const configPut = async (PATH: string, value: any) => {
    if (!enabled.value) return;
    await commit({
      [PATH]: value,
    });
  };
  return {
    ...docapi,
    config,
    configPut,
  };
};
