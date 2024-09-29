import { CLOUD_TRANSLATION_API_KEY } from "@/config";
import type { ITranslationQuery } from "@/types";

const PATH_TRANSLATED_TEXT = "data.translations[0].translatedText";
// #https://cloud.google.com/translate/docs/reference/rest/v2/translate#http-request
export const useFetchTranslationApi = (QUERY?: any) => {
  const {
    app: { TRANSLATION_ENABLED, TRANSLATION_DEFAULTS },
    urls: { TRANSLATION_ENDPOINT },
  } = useAppConfig();
  const query = ref<ITranslationQuery>();
  const q = computed(() => String(query.value?.q || "").trim());
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
    key: `useFetchTranslationApi::query--${q.value}::lang--${query.value?.target}`,
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
    enabled.value ? get(data.value, PATH_TRANSLATED_TEXT) : q.value
  );
  useOnceMountedOn(enabled, async () => await execute());

  return {
    query,
    data,
    translation,
    reload,
  };
};
