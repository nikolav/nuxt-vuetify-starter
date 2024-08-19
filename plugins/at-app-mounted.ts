import {
  fetchAndActivate,
  isSupported as RCIsSupported,
} from "firebase/remote-config";
import { remoteConfig } from "@/services/firebase";

// #https://nuxt.com/docs/getting-started/error-handling#vue-rendering-lifecycle
export default defineNuxtPlugin((nuxtApp) => {
  // @init
  const hooks = [
    // debug
    () => {
      console.log({ "@hook app:mounted": Date.now() });
    },

    // firebase remote-config
    async () => {
      const serviceRC = (await RCIsSupported())
        ? await remoteConfig()
        : undefined;
      if (!serviceRC) return;
      const res = await fetchAndActivate(serviceRC);
      console.log({ "remoteConfig:fetchAndActivate": res });
    },
  ];

  // add hooks
  hooks.forEach((hook) => nuxtApp.hook("app:mounted", hook));
});
