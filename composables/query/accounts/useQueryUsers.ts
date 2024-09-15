import type { IUser } from "@/types";
import { Q_users } from "@/graphql";
export const useQueryUsers = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_AUTH_NEWUSER },
  } = useAppConfig();
  const {
    result,
    load: queryStart,
    refetch,
    loading,
  } = useLazyQuery<{ users: IUser[] }>(Q_users, undefined, {
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
  });
  const reload = async () => await refetch();
  const users = computed(() => result.value?.users || []);
  useOnceMountedOn(true, queryStart);
  watchEffect(() => useIOEvent(IOEVENT_AUTH_NEWUSER, reload));
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(loading);
  return { users, reload };
};
