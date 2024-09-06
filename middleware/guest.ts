export default defineNuxtRouteMiddleware(() => {
  console.info("--mw-guest");
  const auth = useStoreApiAuth();
  if (auth.isAuthenticated$) return abortNavigation();
});
