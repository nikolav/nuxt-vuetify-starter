export const useOnceMountedOn = (value$: any, callback: () => void) => {
  const initialized = ref(false);
  const mounted = useMounted();
  watch([mounted, () => toValue(value$)], ([isMounted, value]) => {
    if (initialized.value) return;
    if (!isMounted) return;
    if (!value) return;
    try {
      callback();
    } catch (error) {
      throw error;
    } finally {
      initialized.value = true;
    }
  });
  return readonly(initialized);
};
