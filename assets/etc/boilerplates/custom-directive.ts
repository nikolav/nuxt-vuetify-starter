// #https://vuejs.org/guide/reusability/custom-directives.html#custom-directives
export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.directive(":name", (el, binding) => {
    // body
  });
});
