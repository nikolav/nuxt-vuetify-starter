// # https://github.com/nicolasbeauvais/vue-social-sharing
import VueSocialSharing from "vue-social-sharing";
export default defineNuxtPlugin({
  name: "social-sharing",
  parallel: true,
  setup: (nuxtapp) => {
    nuxtapp.vueApp.use(VueSocialSharing);
  },
});
