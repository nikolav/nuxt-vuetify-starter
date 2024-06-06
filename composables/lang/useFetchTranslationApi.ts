import { CLOUD_TRANSLATION_API_KEY as API_KEY } from "@/config";
import type { ITranslationQuery } from "@/types";
// #https://cloud.google.com/translate/docs/reference/rest/v2/translate#http-request
export const useFetchTranslationApi = (QUERY?: any) => {
  const {
    urls: { TRANSLATION_ENDPOINT },
  } = useAppConfig();
  const query = ref<ITranslationQuery>();
  const q = computed(() => String(get(query.value, "q") || "").trim());
  const enabled = computed(() => !!q.value);
  const body = computed(() =>
    assign({}, { format: "text", key: API_KEY }, query.value)
  );
  watchEffect(() => {
    query.value = toValue(QUERY);
  });
  const { data, refresh, execute, pending } = useFetch(TRANSLATION_ENDPOINT, {
    key: `useFetchTranslationApi:${query.value?.q}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: API_KEY,
    },
    body,
    lazy: true,
    immediate: false,
  });
  const reload = async () => await refresh();
  const translation = computed(() =>
    get(data.value, "data.translations[0].translatedText")
  );
  onceMountedOn(enabled, async () => await execute());

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(pending);

  return {
    query,
    data,
    translation,
    reload,
  };
};
