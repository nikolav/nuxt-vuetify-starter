import axios from "axios";
import FormData from "form-data";

import {
  Q_storageList,
  Q_storageListAll,
  M_STORAGE_FILE_REMOVE,
} from "@/graphql";
import { URL_STORAGE } from "@/config";
import type {
  IStorageFileInfo,
  IFilesUpload,
  IStorageStatusFileSaved,
  RecordJson,
} from "@/types";
import { schemaStorageMeta } from "@/schemas";

export const useApiStorage = (initialEnabled = true, __list_all = false) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_STORAGE_CHANGE },
    api: { TAG_STORAGE },
    FIELDS_OMIT_STORAGE_META,
  } = useAppConfig();

  const auth = useStoreApiAuth();
  const toggleEnabled = useToggleFlag(initialEnabled);

  // @@enabled
  const enabled$ = computed(
    () => !!(toggleEnabled.isActive.value && auth.isAuth$)
  );
  const { watchProcessing } = useStoreAppProcessing();
  const {
    load: storageStart,
    result,
    refetch,
    loading,
  } = useLazyQuery<{ storageList: IStorageFileInfo[] }>(
    __list_all ? Q_storageListAll : Q_storageList,
    undefined,
    {
      enabled: enabled$,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  // @@files
  const files$ = computed(
    () =>
      (enabled$.value
        ? get(result.value, __list_all ? "storageListAll" : "storageList")
        : undefined) || []
  );
  const reloadFiles = async () => await refetch();
  useOnceMountedOn(enabled$, storageStart);

  watch([() => auth.isAuth$, enabled$], ([isAuth, enabled]) => {
    if (isAuth && enabled) reloadFiles();
  });

  const ioevent_ = computed(() =>
    enabled$.value ? `${IOEVENT_STORAGE_CHANGE}${auth.uid}` : ""
  );

  // upload({
  //   [name: string]: {
  //     'file': File{}
  //     'data'?: { title, description },
  //     'meta'?: {},
  //   },
  // })

  // @@upload
  const uploadStatus = useProcessMonitor();
  const upload = async <TFileData = IStorageStatusFileSaved>(
    uplFiles: IFilesUpload
  ) => {
    if (!enabled$.value) return;

    const fdata = new FormData();
    let numfiles = 0;
    each(uplFiles, ({ file, data, meta }, name) => {
      if (!file) return;
      fdata.append(name, file);
      fdata.append(`${name}:data`, JSON.stringify(data || {}));
      fdata.append(`${name}:meta`, JSON.stringify(meta || {}));
      numfiles += 1;
    });
    if (!numfiles) return;

    let data;

    try {
      uploadStatus.begin();
      data = get(
        await axios<Record<string, TFileData>>({
          url: URL_STORAGE,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token$}`,
          },
          data: fdata,
        }),
        "data"
      );
    } catch (error) {
      uploadStatus.setError(error);
    } finally {
      uploadStatus.done();
    }
    if (!(uploadStatus.error.value || isEmpty(data))) uploadStatus.successful();
    return data;
  };

  // @@download
  const download = async (file_id: string = "") => {
    const path = resourceUrl(file_id);
    return file_id && path
      ? await navigateTo(path, {
          external: true,
          open: { target: "_blank" },
        })
      : undefined;
  };

  // @@remove
  const { mutate: mutateRemoveFile, loading: rmLoading } = useMutation(
    M_STORAGE_FILE_REMOVE
  );
  const remove = async (fileID = "") =>
    enabled$.value && fileID ? await mutateRemoveFile({ fileID }) : undefined;

  // @@meta
  const topicStorageMeta_ = computed(() =>
    enabled$.value ? `${TAG_STORAGE}${auth.uid}` : ""
  );
  const {
    commit,
    IOEVENT: IOEVENT_STORAGE_META_CHANGE,
    loading: metaLoading,
  } = useDocs(topicStorageMeta_);
  const meta = async (metas: RecordJson, file_id: string) => {
    if (!enabled$.value) return;

    const doc = find(files$.value, { file_id });
    if (!doc?.id) return;

    let metas_;
    try {
      // pass schema
      metas_ = schemaStorageMeta.parse(metas);
    } catch (error) {
      // skip
      return;
    }
    if (!len(Object(metas_))) return;

    return await commit(
      omit(assign({}, doc, metas_), FIELDS_OMIT_STORAGE_META),
      doc.id
    );
  };

  const processing = computed(
    () =>
      loading.value ||
      uploadStatus.processing.value ||
      rmLoading.value ||
      metaLoading.value
  );
  watchProcessing(processing);

  // @io/listen
  watchEffect(() => useIOEvent(ioevent_.value, reloadFiles));
  watchEffect(() => useIOEvent(IOEVENT_STORAGE_META_CHANGE.value, reloadFiles));

  return {
    // # ls
    files: files$,

    // # crud
    upload,
    remove,
    download,
    meta,
    reload: reloadFiles,

    // # flags
    processing,
    uploadStatus,

    // @toggle
    enabled: enabled$,
    toggleEnabled,

    // @io-event
    IO: ioevent_,

    // alias
    loading: processing,
  };
};
