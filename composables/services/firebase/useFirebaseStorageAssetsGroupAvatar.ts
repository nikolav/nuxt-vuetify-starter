export const useFirebaseStorageAssetsGroupAvatar = (GID?: any) => {
  const gid = ref();
  const images = ref();
  const avatarImage = computed(() => first(images.value));
  const { firebasePathAssetsAvatars } = useTopics();
  watchEffect(() => {
    gid.value = toValue(GID);
  });
  const { ls, url } = useFirebaseStorage(() =>
    firebasePathAssetsAvatars(gid.value)
  );
  const imagesLoad = async () => {
    images.value = await Promise.all(
      map(await ls(), async (node) => await url(node.name))
    );
  };
  watchEffect(async () => {
    if (gid.value) await imagesLoad();
  });

  return {
    gid,
    avatarImage,
    images,
    reload: imagesLoad,
  };
};
