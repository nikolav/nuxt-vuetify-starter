export default defineNuxtRouteMiddleware(async () => {
  console.info("--mw-authorized");
  const auth = useStoreApiAuth();
  if (!auth.isAuthenticated$) return await navigateTo({ name: "auth-login" });
});
