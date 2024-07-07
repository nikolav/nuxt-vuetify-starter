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
      ...(graphqlOptions || {}),
      // fetchPolicy: "no-cache",
    }
  );
  const data$ = computed(
    () =>
      (enabled$.value ? get(result.value, "docByDocId") : undefined) ||
      <IDoc<TDoc>>{}
  );
  const reload = async () => await refetch();
  onceMountedOn(enabled$, load);

  const { mutate: mutateDocUpsert } = useMutation<IDoc<TDoc>>(M_docUpsert);

  const commit = async (putData: Record<string, any>) => {
    if (!enabled$.value) return;
    // update clone
    const newData_ = batchSet(get(data$.value, "data"), putData);
    // console.log({ newData_ })
    await mutateDocUpsert({ data: newData_, doc_id: doc_id$.value });
  };

  const ioevent = computed(() =>
    enabled$.value ? `${IOEVENT_DOC_CHANGE_prefix}${doc_id$.value}` : ""
  );

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  watchEffect(() => useIOEvent(ioevent.value, reload));

  return {
    doc_id$,

    // #crud
    data: data$,
    commit,
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
