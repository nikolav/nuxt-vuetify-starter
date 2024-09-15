export default defineNuxtRouteMiddleware(() => {
  const {
    app: { MODE_DEBUG },
  } = useAppConfig();
  if (!MODE_DEBUG) return abortNavigation();
});
