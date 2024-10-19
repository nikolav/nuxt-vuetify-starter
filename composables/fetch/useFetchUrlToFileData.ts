import { ENDPOINT_GRAPHQL } from "@/config";

// dlFileB64(data: JsonData!): JsonData!
const Q_dlFileB64 = `
  query q_dlFileB64($data: JsonData!) {
    dlFileB64(data: $data)
  }
`;

export const useFetchUrlToFileData = () => {
  const auth = useStoreApiAuth();
  const pc = useProcessMonitor();
  const file = async (url: string, filename?: string) => {
    let fdata;
    let file_;
    const filename_ = filename || `file:${idGen()}`;
    try {
      pc.begin();
      if (!isURL(url)) throw "--no-url";
      fdata = get(
        await $fetch(ENDPOINT_GRAPHQL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token$}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: {
            query: Q_dlFileB64,
            variables: {
              data: { url },
            },
          },
        }),
        "data.dlFileB64.status.data"
      );
    } catch (error) {
      pc.setError(error);
    } finally {
      pc.done();
    }
    if (!pc.error.value) {
      pc.successful();
      file_ = new File([b64tob(fdata)], filename_, {
        type: mimetypeLookupImage(filename_),
      });
    }
    return file_;
  };

  return { file, processing: pc.processing };
};
