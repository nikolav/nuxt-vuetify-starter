export const useQuerySelector = (qselector: string) => {
  const ref_node = ref();
  onMounted(() => {
    ref_node.value = document.querySelector(qselector);
  });
  return ref_node;
};
