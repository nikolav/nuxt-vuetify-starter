export const useRefAppMain = () => {
  const ref_appMain = inject(key_REF_APPMAIN);
  const layoutInfo = (name: string) => ref_appMain?.value.getLayoutItem(name);
  return { ref_appMain, layoutInfo };
};
