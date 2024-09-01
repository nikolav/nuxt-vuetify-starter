export default defineNuxtRouteMiddleware((routeTo) => {
  console.log("mw:access-log.global");
  console.log({ routeTo });
});
