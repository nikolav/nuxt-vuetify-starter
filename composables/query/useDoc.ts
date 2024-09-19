import type { IDoc } from "@/types";
import { Q_docByDocId, M_docUpsert } from "@/graphql";

export const useDoc = <TDoc = Record<string, any>>(
  docID: any = "",
  initialEnabled = true,
  graphqlOptions?: Record<string, any>
) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_DOC_CHANGE_prefix },
  } = useAppConfig();
  const doc_id$ = ref();
  watchEffect(() => {
    doc_id$.value = toValue(docID);
  });
  const toggleEnabled = useToggleFlag(initialEnabled);
  const enabled$ = computed(
    () => !!(doc_id$.value && toggleEnabled.isActive.value)
  );
  const { result, refetch, load, loading, error } = useLazyQuery<{
    docByDocId: IDoc<TDoc>;
  }>(
    Q_docByDocId,
    { doc_id: doc_id$ },
    {
      enabled: enabled$,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      ...graphqlOptions,
      // fetchPolicy: "no-cache",
    }
  );
  const data$ = computed(
    () =>
      (enabled$.value ? result.value?.docByDocId : undefined) || <IDoc<TDoc>>{}
  );
  const reload = async () => await refetch();
  useOnceMountedOn(enabled$, load);

  const { mutate: mutateDocUpsert } = useMutation<IDoc<TDoc>>(M_docUpsert);

  const commit = async (
    putData: Record<string, any>,
    merge = true,
    shallow = false
  ) => {
    if (!enabled$.value) return;
    await mutateDocUpsert({
      doc_id: doc_id$.value,
      data: merge && !shallow ? batchSet(undefined, putData) : putData,
      merge,
      shallow,
    });
  };

  const clear = async () => {
    if (!enabled$.value) return;
    await mutateDocUpsert({
      doc_id: doc_id$.value,
      data: {},
      merge: false,
      shallow: false,
    });
  };

  const ioevent = computed(() =>
    enabled$.value ? `${IOEVENT_DOC_CHANGE_prefix}${doc_id$.value}` : ""
  );

  watchEffect(() => useIOEvent(ioevent.value, reload));

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  return {
    doc_id$,

    // #crud
    data: data$,
    commit,
    clear,
    reload,

    // #aliases
    put: commit,

    // #state
    error,
    loading,
    IOEVENT: ioevent,
    enabled: enabled$,
    doc_id: docID,

    // #on/off
    toggleEnabled,
  };
};
