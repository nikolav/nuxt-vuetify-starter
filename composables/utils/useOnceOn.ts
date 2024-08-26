export const useOnceOn = (value$: any, callback: <T = any>(v?: T) => void) => {
  const initialized = ref();
  watchEffect(() => {
    if (initialized.value) return;
    const value = toValue(value$);
    if (!value) return;
    try {
      callback(value);
    } catch (error) {
      throw error;
    } finally {
      initialized.value = true;
    }
  });

  return readonly(initialized);
};
