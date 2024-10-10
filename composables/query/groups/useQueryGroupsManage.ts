import {
  Q_groupsList,
  M_groupsGUConfigure,
  M_groupsAdd,
  M_assetsRemove,
  M_assetsUpdate,
} from "@/graphql";
import type { IAsset, RecordJson, TJsonLiteral } from "@/types";
export const useQueryGroupsManage = (GIDS?: any) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: {
      AssetsIOEvents: { GROUPS_CHANGE: IOEVENT_GROUPS_CHANGE },
    },
  } = useAppConfig();
  const gids = ref();
  watchEffect(() => {
    gids.value = toValue(GIDS);
  });

  const {
    result,
    load: queryStart,
    refetch,
    loading,
  } = useLazyQuery<{ groupsList: IAsset[] }>(
    Q_groupsList,
    { gids },
    {
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const ls = computed(() => result.value?.groupsList || []);
  const reload = async () => await refetch();
  useOnceMountedOn(true, queryStart);

  const { mutate: mutateGUConfig, loading: guLoading } =
    useMutation(M_groupsGUConfigure);
  const { mutate: mutateGroupsAdd, loading: groupsAddLoading } =
    useMutation(M_groupsAdd);
  const { mutate: mutateAssetsRemove, loading: assetsRemoveLoading } =
    useMutation(M_assetsRemove);
  const { mutate: mutateAssetsUpdate, loading: assetsUpdateLoading } =
    useMutation(M_assetsUpdate);

  // g({'+22': [1, 2], '-3': [5], '+3': [45]})
  const g = async (guConfig: RecordJson) => await mutateGUConfig({ guConfig });
  const add = async (name: string, fields?: RecordJson) =>
    await mutateGroupsAdd({ name, fields });
  const drop = async (...aids: TJsonLiteral[]) =>
    await mutateAssetsRemove({ aids });
  // assetsUpdate(aid: ID!, fields: JsonData): JsonData!
  const update = async (aid: TJsonLiteral, fields: RecordJson) =>
    await mutateAssetsUpdate({ aid, fields });

  const processing = computed(
    () =>
      loading.value ||
      guLoading.value ||
      groupsAddLoading.value ||
      assetsRemoveLoading.value ||
      assetsUpdateLoading.value
  );
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(processing);

  useIOEvent(IOEVENT_GROUPS_CHANGE, reload);

  return {
    // @ref
    gids,

    // @crud
    ls,
    add,
    drop,
    update,
    reload,
    // @configure groups
    //  g({ '+2': [1], '+1 -3': [3] })
    g,

    // @flags
    processing,

    // @alias
    groups: ls,
  };
};
