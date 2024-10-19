// UgaO7qWtC1r1Xg1vl
import type { IAsset, RecordJson } from "@/types";
import {
  Q_assetsList,
  M_assetsUpsert,
  M_assetsRemove,
  M_groupsGUConfigure,
} from "@/graphql";
import { schemaHasFieldName as sHasName } from "@/schemas";
// @@useQueryManageAssets
export const useQueryManageAssets = (ASSETS_TYPE?: any, AIDS?: any) => {
  const type = ref();
  watchEffect(() => {
    type.value = toValue(ASSETS_TYPE);
  });

  const aids = ref();
  watchEffect(() => {
    aids.value = toValue(AIDS);
  });

  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
  } = useAppConfig();

  const {
    result,
    load: queryStart,
    refetch,
    loading,
  } = useLazyQuery<{
    assetsList: IAsset[];
  }>(
    Q_assetsList,
    {
      aids,
      type,
    },
    { pollInterval: STORAGE_QUERY_POLL_INTERVAL }
  );
  const { mutate: mutateAssetsUpsert, loading: loadingUpsert } =
    useMutation(M_assetsUpsert);
  const { mutate: mutateAssetsRemove, loading: loadingAssetsRemove } =
    useMutation(M_assetsRemove);
  const { mutate: mutateGUConfig, loading: loadingGU } =
    useMutation(M_groupsGUConfigure);

  //
  const assets = computed(() => result.value?.assetsList || []);
  const length = computed(() => assets.value.length);
  const reload = async () => await refetch();
  const commit = async (fields: any, aid?: any) =>
    await mutateAssetsUpsert({
      fields: assign({}, aid ? fields : sHasName.passthrough().parse(fields), {
        type: type.value,
      }),
      aid,
    });
  const remove = async (aids: any) => await mutateAssetsRemove({ aids });
  // group({'+22': [1, 2], '-3': [5], '+3': [45]})
  const group = async (guConfig: RecordJson) =>
    await mutateGUConfig({ guConfig });

  const { watchProcessing } = useStoreAppProcessing();
  const processing = computed(
    () =>
      loading.value ||
      loadingUpsert.value ||
      loadingAssetsRemove.value ||
      loadingGU.value
  );
  watchProcessing(processing);

  useOnceMountedOn(true, () => queryStart());

  const ioevent = computed(() => type.value || "");
  watchEffect(() => useIOEvent(ioevent.value, reload));

  return {
    // @refs
    aids,
    type,

    // @crud
    assets,
    length,
    commit,
    remove,
    reload,

    // @groups:(un)assign
    group,

    // @flags
    processing,
  };
};
