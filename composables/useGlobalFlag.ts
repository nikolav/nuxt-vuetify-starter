export const useGlobalFlag = (name: string) => {
  const flags = useStoreFlags();
  return computed({
    get: () => flags.isSet(name),
    set: (val: boolean) => {
      if (val) {
        flags.on(name);
      } else {
        flags.off(name);
      }
    },
  });
};
