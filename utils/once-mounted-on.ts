export const onceMountedOn = (refGetterValue: any, callback: () => void) => {
  const initialized = ref();
  const onceInitCallback = once(() => {
    try {
      callback();
    } catch (error) {
      // rethrow
      throw error;
    } finally {
      initialized.value = true;
      // nextTick(() => {
      //   initialized.value = true;
      // });
    }
  });
  onMounted(() => {
    watchEffect(() => {
      if (toValue(refGetterValue)) onceInitCallback();
    });
  });
  return readonly(initialized);
};
