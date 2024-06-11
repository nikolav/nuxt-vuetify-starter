import type { IAuthProfile } from "@/types";
export const useProfileData = (UID?: any) => {
  const uid$ = ref();
  watchEffect(() => {
    uid$.value = toValue(UID);
  });
  const { authProfile } = useTopics();
  const { data } = useDoc<IAuthProfile>(() => authProfile(uid$.value));
  const profile = computed(() => get(data.value, "data"));
  const avatar = computed(() =>
    resourceUrl(get(data.value, "data.avatar.data.file_id"))
  );
  const fullName = computed(() =>
    niceName(profile.value?.firstName || "", profile.value?.lastName || "")
  );
  const publicUrl = useCompanyPublicUrl(
    uid$,
    () => profile.value?.businessName
  );
  return { profile, avatar, fullName, publicUrl };
};
