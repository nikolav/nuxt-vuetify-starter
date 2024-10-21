import { URL_APP_PUBLIC, ASSETS_PATH_proizvodi } from "@/config";
export const usePublicUrlAssetProduct = (PID?: any) => {
  const pid = ref();
  watchEffect(() => {
    pid.value = toValue(PID);
  });
  const path = computed(() =>
    pid.value
      ? [
          trim(URL_APP_PUBLIC, "/"),
          trim(ASSETS_PATH_proizvodi, "/"),
          pid.value,
        ].join("/")
      : ""
  );
  return readonly(path);
};
