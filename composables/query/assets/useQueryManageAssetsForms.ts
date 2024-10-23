export const useQueryManageAssetsForms = (FIDS?: any) => {
  const {
    db: {
      Assets: {
        type: { DIGITAL_FORM },
      },
    },
  } = useAppConfig();
  return useQueryManageAssets(DIGITAL_FORM, FIDS);
};
