export default defineNuxtRouteMiddleware(() => {
  console.info("--mw-authorized");
  const auth = useStoreApiAuth();
  if (!auth.isAuthenticated$) return navigateTo({ name: "index" });
});
