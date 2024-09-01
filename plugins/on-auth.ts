export default defineNuxtPlugin(() => {
  const route = useRoute();
  const auth = useStoreApiAuth();
  // onAuthStatus
  watch(
    [() => auth.isAuth$, () => auth.isDefault$],
    async ([isAuth, isDefault]) => {
      if (!isDefault) {
        if (!isAuth) {
          // handle logouts;
          //  clear cache, hard reload
          return reloadNuxtApp({
            path: "/",
            persistState: false,
          });
        }
        // handle logins
        // # redirect to index if auth updated at login pages
        if (["auth-register", "auth-login"].includes(String(route.name)))
          await navigateTo({ name: "index" });

        // break
        return;
      }
      // default user auth status change
    }
  );
});
