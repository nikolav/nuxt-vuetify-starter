export const onceMountedOn = (maybeRefOrValueOn: any, callback: () => void) => {
  const initialized = ref();
  const onceInitCallback = once(() => {
    try {
      callback();
    } catch (error) {
      // rethrow
      throw error;
    } finally {
      nextTick(() => {
        initialized.value = true;
      });
    }
  });
  onMounted(() => {
    watchEffect(() => {
      if (toValue(maybeRefOrValueOn)) onceInitCallback();
    });
  });
  return readonly(initialized);
};
