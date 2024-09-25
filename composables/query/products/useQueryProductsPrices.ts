// Q_productsListAllPrices
import type { IProduct } from "@/types";
import { Q_productsListAllPrices } from "@/graphql";
export const useQueryProductsPrices = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();
  const {
    result,
    load: queryStart,
    refetch,
    loading,
  } = useLazyQuery<{
    productsListAll: IProduct[];
  }>(Q_productsListAllPrices, undefined, {
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
  });
  const products$ = computed(() => get(result.value, "productsListAll") || []);
  const reload = async () => await refetch();
  useOnceMountedOn(true, queryStart);
  // onceMountedOn(true, async () => await queryStart());
  // const { runSetup: queryStart } = useRunSetupOnce(async () => await load());
  // onMounted(async () => {
  //   queryStart();
  //   await nextTick(reload);
  // });

  return {
    products$,
    loading,
    reload,
  };
};
