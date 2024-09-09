export default defineNuxtRouteMiddleware(() => {
  console.info("--mw-authorized");
  const auth = useStoreApiAuth();
  const {
    app: { REDIRECT_UNAUTHORIZED_ROUTE_NAME },
  } = useAppConfig();
  if (!auth.isAuthenticated$)
    return navigateTo({ name: REDIRECT_UNAUTHORIZED_ROUTE_NAME });
});
