import { Iconx } from "@/components/icons";
export default defineNuxtPlugin({
  name: "register-global-components",
  enforce: "post",
  parallel: true,
  setup: (nuxtapp) => {
    nuxtapp.vueApp.component("Iconx", Iconx);
  },
});
