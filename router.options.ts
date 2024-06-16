import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  scrollBehavior: (_to, _from, savedPosition) =>
    new Promise((resolve) => resolve(savedPosition || undefined)),
  // new Promise((resolve) => resolve(savedPosition || { top: 0 })),
};
