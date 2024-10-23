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
      TOPIC_CHAT_USER_CHANNEL_prefix,
      TOPIC_CHAT_PRODUCTS_prefix,
      TOPIC_RATING_POSTS_prefix,
      USER_CONFIG_PREFERENCES,
      TOPIC_RATING_ASSETS_prefix,
      ASSETS_LIKES_prefix,
      TOPIC_CHAT_ASSETS_prefix,
      TOPIC_CHAT_ACTIVE,
      TOPIC_CHAT_ACTIVE_name,
      DOCS_LIKES_prefix,
      TOPIC_CHAT_ACTIVE_main,
    },
    firebase: {
      messaging: { KEY_FCM_DEVICE_TOKENS },
      storage: {
        PATH_PROFILE_AVATARS,
        PATH_ASSETS_IMAGES,
        PATH_ASSETS_AVATARS,
      },
    },
    io: { IOEVENT_ACCOUNTS_UPDATED_prefix },
  } = useAppConfig();
  const chatUserChannel = (uid?: any) =>
    uid ? `${TOPIC_CHAT_USER_CHANNEL_prefix}${uid}` : "";
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
  const firebasePathAssets = (aid: any) =>
    aid ? `${trimEnd(PATH_ASSETS_IMAGES, "/")}/${aid}` : "";
  const ratingAssets = (aid?: any) =>
    aid ? `${TOPIC_RATING_ASSETS_prefix}${aid}` : "";
  const likesAssets = (aid?: any) =>
    aid ? `${ASSETS_LIKES_prefix}${aid}` : "";
  const chatAssets = (aid?: any) =>
    aid ? `${TOPIC_CHAT_ASSETS_prefix}${aid}` : "";
  const likesDocs = (ddid?: any) => (ddid ? `${DOCS_LIKES_prefix}${ddid}` : "");
  const firebasePathAssetsAvatars = (id?: any) =>
    id ? `${trimEnd(PATH_ASSETS_AVATARS, "/")}/${id}` : "";

  return {
    CHAT_MAIN,
    MAILING_LIST,
    TOPIC_CHAT_ACTIVE,
    TOPIC_CHAT_ACTIVE_name,
    TOPIC_CHAT_ACTIVE_main,
    //
    chatOrder,
    chatUserChannel,
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
    firebasePathAssetsAvatars,
    ratingAssets,
    likesAssets,
    chatAssets,
    likesDocs,
    //
    ioeventAccountUpdated,
  };
};
