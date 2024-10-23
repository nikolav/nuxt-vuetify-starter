export const useQueryManageAssetsSites = (SIDS?: any) => {
  const {
    db: {
      Assets: {
        type: { PHYSICAL_STORE },
      },
    },
  } = useAppConfig();
  return useQueryManageAssets(PHYSICAL_STORE, SIDS);
};
