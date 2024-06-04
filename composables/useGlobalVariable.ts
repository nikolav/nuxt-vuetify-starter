export const useGlobalVariable = (varname: string, _default?: any) => {
  const main$$ = useStoreMain();
  if (null != _default && !main$$.isSet(varname)) {
    main$$.put({ [varname]: _default });
  }
  return computed({
    get: () => main$$.get(varname),
    set: (val) => main$$.put({ [varname]: val }),
  });
};
