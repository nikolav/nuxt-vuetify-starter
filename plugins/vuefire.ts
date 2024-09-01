import { VueFire } from "vuefire";
import { app as firebaseApp } from "@/services/firebase";
export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.use(VueFire, {
    firebaseApp,
    modules: [],
  });
});
