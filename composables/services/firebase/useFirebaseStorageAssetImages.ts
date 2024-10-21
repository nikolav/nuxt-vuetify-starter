export const useFirebaseStorageAssetImages = (AID?: any) => {
  const aid = ref();
  const images = ref();
  const { firebasePathAssets } = useTopics();
  watchEffect(() => {
    aid.value = toValue(AID);
  });
  const { ls, url } = useFirebaseStorage(() => firebasePathAssets(aid.value));
  const imagesLoad = async () => {
    images.value = await Promise.all(
      map(await ls(), async (node) => await url(node.name))
    );
  };
  watch(aid, async (ID) => {
    if (!ID) return;
    await imagesLoad();
  });

  return {
    id: aid,
    images,
    reload: imagesLoad,
  };
};
