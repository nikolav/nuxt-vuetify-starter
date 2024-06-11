export const useStoryPublicUrl = (
  mayberefStoryId: any,
  mayberefStoryTitle: any
) => {
  const puburl = ref();
  const {
    urls: { appPublic, QUERY, storyPages },
  } = useAppConfig();
  watchEffect(() => {
    const sid = toValue(mayberefStoryId);
    const name = toValue(mayberefStoryTitle);
    if (!(name && sid)) return;
    // concat domain + path + query + id
    puburl.value = `${trimEnd(appPublic, "/")}/${trim(
      storyPages,
      "/"
    )}?${QUERY}=${encodeURIComponent(
      words(name).concat(String(sid)).join("-").toLocaleLowerCase()
    )}`;
  });

  return puburl;
};
