export const useI18NSetLocale = () => {
  const switchLocalePath = useSwitchLocalePath();
  const setLocale = async (value: string) =>
    await navigateTo(switchLocalePath(value));
  return setLocale;
};
