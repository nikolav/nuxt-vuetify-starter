import type { IUser } from "@/types";
import { Q_users, Q_usersOnly } from "@/graphql";
export const useQueryUsers = (UIDS?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_AUTH_NEWUSER },
  } = useAppConfig();
  const uids = ref();
  const isAll_ = computed(() => isEmpty(uids.value));
  watchEffect(() => {
    uids.value = toValue(UIDS);
  });
  const {
    result,
    load: queryStart,
    refetch,
    loading,
  } = useLazyQuery<{ users?: IUser[]; usersOnly?: IUser[] }>(
    isAll_.value ? Q_users : Q_usersOnly,
    isAll_.value ? undefined : { uids },
    {
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const reload = async () => await refetch();
  const users = computed(
    () => (isAll_.value ? result.value?.users : result.value?.usersOnly) || []
  );
  useOnceMountedOn(true, queryStart);
  watchEffect(() => useIOEvent(IOEVENT_AUTH_NEWUSER, reload));
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);
  return { uids, users, reload };
};
