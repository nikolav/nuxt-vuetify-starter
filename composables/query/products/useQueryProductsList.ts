import { Q_productsList } from "@/graphql";
import type { IAsset } from "@/types";
export const useQueryProductsList = (PIDS: any = undefined) => {
  const pids = ref();
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  watchEffect(() => {
    pids.value = toValue(PIDS);
  });
  const {
    result,
    load: queryStart,
    refetch,
    loading,
  } = useLazyQuery<{
    productsList: IAsset[];
  }>(
    Q_productsList,
    {
      pids,
    },
    {
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const products = computed(() => result.value?.productsList || []);
  const reload = async () => await refetch();
  useOnceMountedOn(true, queryStart);

  const processing = computed(() => loading.value);
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(processing);

  return {
    pids,
    products,
    reload,
    processing,
  };
};
