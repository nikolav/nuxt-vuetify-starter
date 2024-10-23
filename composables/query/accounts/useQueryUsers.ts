import type { IUser } from "@/types";
import { Q_users, Q_usersOnly } from "@/graphql";
export const useQueryUsers = (UIDS?: any, $ENABLED: any = true) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_AUTH_NEWUSER, IOEVENT_ACCOUNTS_UPDATED },
  } = useAppConfig();
  const uidsProvided = ref();
  const isAll_ = computed(() => isEmpty(uidsProvided.value));
  watchEffect(() => {
    const uids_ = toValue(UIDS);
    uidsProvided.value = isEmpty(uids_)
      ? undefined
      : map(filter(uids_, isNumeric), Number);
  });
  const enabled = computed(() => toValue($ENABLED));
  const {
    result,
    load: queryStart,
    refetch,
    loading,
  } = useLazyQuery<{ users?: IUser[]; usersOnly?: IUser[] }>(
    isAll_.value ? Q_users : Q_usersOnly,
    isAll_.value ? undefined : { uids: uidsProvided },
    {
      enabled,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const users = computed(
    () => (isAll_.value ? result.value?.users : result.value?.usersOnly) || []
  );
  const uids = computed(() => map(users.value, "id") || []);
  const reload = async () => await refetch();
  useOnceMountedOn(true, queryStart);

  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);

  useIOEvent(IOEVENT_AUTH_NEWUSER, reload);
  useIOEvent(IOEVENT_ACCOUNTS_UPDATED, reload);

  return { uids, users, reload, enabled, loading };
};
