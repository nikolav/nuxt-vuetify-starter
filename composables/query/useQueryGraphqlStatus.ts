import { Q_apiStatus } from "@/graphql";
export const useQueryGraphqlStatus = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const {
    result,
    load: queryStart,
    refetch,
  } = useLazyQuery(Q_apiStatus, undefined, {
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
  });
  const status = computed(() => get(result.value, "status"));
  const reload = async () => await refetch();
  onceMountedOn(true, queryStart);

  return {
    status,
    reload,
  };
};
