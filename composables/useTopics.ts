// utils;
// calc keys for data fetching
export const useTopics = () => {
  const {
    app: { COOKIE_ANONYMOS_USER },
    docs: {
      CHAT_ORDER_COM_USER_prefix,
      COM_PHOTOS_prefix,
      PRODUCT_IMAGES,
      USER_AVAILABILITY_STATUS,
    },
    key: {
      CHAT_MAIN,
      COM_LIKES_prefix,
      COM_RATING_prefix,
      MAILING_LIST,
      POST_IMAGES_prefix,
      POSTS_CHAT_prefix,
      POSTS_LIKES_prefix,
      PRODUCT_RATING_prefix,
      PRODUCTS_LIKES_prefix,
      TOPIC_CHAT_COM_prefix,
      TOPIC_CHAT_PRODUCTS_prefix,
      TOPIC_RATING_POSTS_prefix,
      USER_CONFIG_PREFERENCES,
    },
    firebase: {
      messaging: { KEY_FCM_DEVICE_TOKENS },
      storage: { PATH_PROFILE_AVATARS, PATH_ASSETS_IMAGES },
    },
    io: { IOEVENT_ACCOUNTS_UPDATED_prefix },
  } = useAppConfig();
  const comChat = (comid: number | undefined) =>
    comid ? `${TOPIC_CHAT_COM_prefix}${comid}` : "";
  const productChat = (pid: number | undefined) =>
    pid ? `${TOPIC_CHAT_PRODUCTS_prefix}${pid}` : "";
  const productImages = (pid: number | undefined) =>
    pid ? `${PRODUCT_IMAGES}${pid}` : "";
  const ratingProduct = (pid: number | undefined) =>
    pid ? `${PRODUCT_RATING_prefix}${pid}` : "";
  const likesProduct = (pid: number | undefined) =>
    pid ? `${PRODUCTS_LIKES_prefix}${pid}` : "";
  const ratingCompany = (uid: number | undefined) =>
    uid ? `${COM_RATING_prefix}${uid}` : "";
  const chatOrder = (
    oid: number | undefined,
    cid: number | undefined,
    uid: number | undefined
  ) =>
    oid && cid && uid
      ? `${CHAT_ORDER_COM_USER_prefix}${oid}:${cid}:${uid}`
      : "";
  const userPhotos = (uid: number | undefined) =>
    uid ? `${COM_PHOTOS_prefix}${uid}` : "";
  const comLikes = (uid: number | undefined) =>
    uid ? `${COM_LIKES_prefix}${uid}` : "";
  const postImage = (sid: number | undefined, imageId: number | undefined) =>
    sid && imageId ? `${POST_IMAGES_prefix}${sid}:${imageId}` : "";
  const ratingPosts = (sid: number | undefined) =>
    sid ? `${TOPIC_RATING_POSTS_prefix}${sid}` : "";
  const likesPosts = (sid: number | undefined) =>
    sid ? `${POSTS_LIKES_prefix}${sid}` : "";
  const chatPosts = (sid: number | undefined) =>
    sid ? `${POSTS_CHAT_prefix}${sid}` : "";
  const userConfig = (uid: number | undefined) =>
    uid ? `${USER_CONFIG_PREFERENCES}${uid}` : "";
  const userDeviceTokens = (uid: number | undefined) =>
    uid ? `${KEY_FCM_DEVICE_TOKENS}${uid}` : "";
  const userAnonymous = (key: string) => `${COOKIE_ANONYMOS_USER}:${key}`;
  const ioeventAccountUpdated = (uid: any) =>
    uid ? `${IOEVENT_ACCOUNTS_UPDATED_prefix}${uid}` : "";
  const firebasePathAvatars = (uid: any) =>
    uid ? `${trimEnd(PATH_PROFILE_AVATARS, "/")}/${uid}` : "";
  const userAvailabilityStatus = () => USER_AVAILABILITY_STATUS;
  const firebasePathAssets = (uid: any) =>
    uid ? `${trimEnd(PATH_ASSETS_IMAGES, "/")}/${uid}` : "";

  return {
    CHAT_MAIN,
    MAILING_LIST,
    //
    chatOrder,
    comChat,
    likesProduct,
    productChat,
    productImages,
    ratingCompany,
    ratingProduct,
    userPhotos,
    comLikes,
    postImage,
    ratingPosts,
    likesPosts,
    chatPosts,
    userConfig,
    userDeviceTokens,
    userAnonymous,
    userAvailabilityStatus,
    firebasePathAvatars,
    firebasePathAssets,
    //
    ioeventAccountUpdated,
  };
};
