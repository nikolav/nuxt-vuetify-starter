export const useRequestNotificationsPermission = () => {
  const granted = ref<boolean>();
  useOnceMountedOn(true, () => {
    Notification.requestPermission().then((permission_) => {
      granted.value = "granted" == permission_;
    });
  });
  return readonly(granted);
};
