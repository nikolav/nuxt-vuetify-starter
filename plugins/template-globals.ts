export default defineNuxtPlugin((nuxtapp) => {
  assign(nuxtapp.vueApp.config.globalProperties, {
    // fields
    FOO_global: "FOO:bHuiLyNfH4",
  });
});
