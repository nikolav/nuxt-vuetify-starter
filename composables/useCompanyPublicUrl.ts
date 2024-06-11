export const useCompanyPublicUrl = (
  mayberefComId: any,
  mayberefBusinessName: any
) => {
  const url$ = ref();
  const {
    urls: { appPublic, comPages, QUERY },
  } = useAppConfig();
  watchEffect(() => {
    const businessName = toValue(mayberefBusinessName);
    const cid = toValue(mayberefComId);
    if (!(businessName && cid)) return;
    url$.value = `${trimEnd(appPublic, "/")}/${trim(
      comPages,
      "/"
    )}?${QUERY}=${encodeURIComponent(
      words(businessName).concat(String(cid)).join("-").toLocaleLowerCase()
    )}`;
  });

  return url$;
};
