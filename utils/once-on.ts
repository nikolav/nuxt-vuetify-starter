export const onceOn = (onValue$: any, callback: (...args: any[]) => void) => {
  const initialized = ref();
  const onceCallback = once((...args: any[]) => {
    try {
      callback(...args);
    } catch (error) {
      throw error;
    } finally {
      nextTick(() => {
        initialized.value = true;
      });
    }
  });
  watchEffect(() => {
    const val = toValue(onValue$);
    if (val) onceCallback(val);
  });
  return readonly(initialized);
};
