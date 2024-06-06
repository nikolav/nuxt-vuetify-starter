import { CLOUD_TRANSLATION_API_KEY as API_KEY } from "@/config";
import type { ITranslationQuery } from "@/types";
// #https://cloud.google.com/translate/docs/reference/rest/v2/translate#http-request
export const useGoogleTranslateApi = (format = "text") => {
  const {
    urls: { TRANSLATION_ENDPOINT },
  } = useAppConfig();
  const pc = useProcessMonitor();
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(() => pc.processing.value);
  const tr = async (config: ITranslationQuery) => {
    const body: ITranslationQuery = transform(
      assign({}, { format: "text", key: API_KEY }, config),
      (res: any, value: string, key: string) => {
        res[key] = "q" === key ? String(value).trim() : value;
        return res;
      },
      <ITranslationQuery>{}
    );
    if (!body.q) return;
    let res;
    try {
      pc.begin();
      res = await $fetch(TRANSLATION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: API_KEY,
        },
        body,
      });
    } catch (error) {
      pc.setError(error);
    } finally {
      pc.done();
    }
    if (!pc.error.value) {
      pc.successful();
      return get(res, "data.translations[0].translatedText");
    }
  };

  return {
    tr,
  };
};
