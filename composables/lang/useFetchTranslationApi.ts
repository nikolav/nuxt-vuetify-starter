import { CLOUD_TRANSLATION_API_KEY } from "@/config";
import type { ITranslationQuery } from "@/types";
// #https://cloud.google.com/translate/docs/reference/rest/v2/translate#http-request
export const useFetchTranslationApi = (QUERY?: any) => {
  const {
    app: { TRANSLATION_ENABLED, TRANSLATION_DEFAULTS },
    urls: { TRANSLATION_ENDPOINT },
  } = useAppConfig();
  const query = ref<ITranslationQuery>();
  const q = computed(() => String(get(query.value, "q") || "").trim());
  const enabled = computed(
    () =>
      TRANSLATION_ENABLED &&
      !!q.value &&
      query.value?.source != query.value?.target
  );
  const body = computed(() => assign({}, TRANSLATION_DEFAULTS, query.value));
  watchEffect(() => {
    query.value = toValue(QUERY);
  });
  const { data, refresh, execute } = useFetch(TRANSLATION_ENDPOINT, {
    // key: `useFetchTranslationApi:${query.value?.q}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: CLOUD_TRANSLATION_API_KEY,
    },
    body,
    lazy: true,
    immediate: false,
  });
  const reload = async () => (enabled.value ? await refresh() : undefined);
  const translation = computed(() =>
    enabled.value
      ? get(data.value, "data.translations[0].translatedText")
      : q.value
  );
  onceMountedOn(enabled, async () => await execute());

  return {
    query,
    data,
    translation,
    reload,
  };
};
