// .useUniqueId
export const useUniqueId = (initial = true, prefix_ = `${idGen()}:`) => {
  const idGen_ = () => `${uniqueId(prefix_)}`;
  const ID = ref(initial ? idGen_() : "");
  const update = () => {
    ID.value = idGen_();
  };

  return assign(update, { ID });
};
