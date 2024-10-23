const DEFAULT_displayName = "Korisnik";
export const useQueryUserData = (UID?: any) => {
  const uidProvided = ref();
  watchEffect(() => {
    uidProvided.value = toValue(UID);
  });
  const { users, reload, loading } = useQueryUsers(() => [uidProvided.value]);
  const user = computed(() => first(users.value));
  const uid = computed(() => user.value?.id);
  const profile = computed(() => user.value?.profile || {});

  // ##utils:computed
  const { $dd } = useNuxtApp();
  const firstName = computed(() =>
    String(profile.value?.firstName || "").trim()
  );
  const lastName = computed(() => String(profile.value?.lastName || "").trim());
  const phone = computed(() => String(profile.value?.phone || "").trim());
  const address = computed(() => String(profile.value?.address || "").trim());
  const email = computed(() => user.value?.email);
  const groups = computed(() => user.value?.groups || []);
  const { chatUserChannel } = useTopics();
  const {
    app: { DEFAULT_NO_IMAGE_AVAILABLE },
  } = useAppConfig();
  const displayName = computed(() =>
    startCase(
      String(
        profile.value?.displayName ||
          [firstName.value, lastName.value].filter(Boolean).join(" ") ||
          matchEmailStart(email.value) ||
          DEFAULT_displayName
      ).trim()
    )
  );
  const displayLocation = computed(() => profile.value?.displayLocation);
  const chatChannel = computed(() =>
    [chatUserChannel(uid.value), "--title", kebabCase(displayName.value)].join(
      " "
    )
  );
  const avatarImage = computed(
    () => profile.value?.avatarImage || DEFAULT_NO_IMAGE_AVAILABLE
  );
  const job = computed(() => profile.value?.job || undefined);
  const joinedAt = computed(() =>
    user.value?.created_at ? $dd.utc(user.value.created_at) : undefined
  );
  const employedAt = computed(() =>
    profile.value?.employed_at
      ? $dd.utc(String(profile.value?.employed_at))
      : undefined
  );

  return {
    reload,
    loading,
    //
    uid,
    user,
    profile,
    //
    firstName,
    lastName,
    phone,
    email,
    address,
    displayName,
    displayLocation,
    chatChannel,
    avatarImage,
    groups,
    job,
    employedAt,
    joinedAt,
    //
    DEFAULT_displayName,
  };
};
