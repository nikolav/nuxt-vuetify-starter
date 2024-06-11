// Q_productsListAllPrices
import type { IProduct } from "@/types";
import { Q_productsListAllPrices } from "@/graphql";
export const useQueryProductsPrices = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    key: { PRODUCTS_CHANGE },
  } = useAppConfig();
  const { result, load, refetch, loading } = useLazyQuery<{
    productsListAll: IProduct[];
  }>(Q_productsListAllPrices, undefined, {
    pollInterval: STORAGE_QUERY_POLL_INTERVAL,
  });
  const products$ = computed(() => get(result.value, "productsListAll") || []);
  const reload = async () => await refetch();
  const { runSetup: queryStart } = useRunSetupOnce(async () => await load());
  onMounted(async () => {
    queryStart();
    await nextTick(reload);
  });
  const productsChanged$ = useGlobalVariable(PRODUCTS_CHANGE);
  watchEffect(async () => {
    if (productsChanged$.value) await reload();
  });

  return {
    products$,
    loading,
    reload,
  };
};
