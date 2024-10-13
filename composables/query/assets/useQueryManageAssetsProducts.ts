export const useQueryManageAssetsProducts = (PIDS?: any) => {
  const {
    db: {
      Assets: {
        type: { PHYSICAL_PRODUCT },
      },
    },
  } = useAppConfig();
  return useQueryManageAssets(PHYSICAL_PRODUCT, PIDS);
};
