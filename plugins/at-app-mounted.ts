import { fetchAndActivate } from "firebase/remote-config";
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
    () => {
      remoteConfig().then(async (client) => {
        if (client) {
          try {
            const fetched = await fetchAndActivate(client);
            console.log({ "remoteConfig:fetchAndActivate": fetched });
          } catch (error) {
            console.error({ "remoteConfig:init:error": error });
          }
        }
      });
    },
  ];

  // add hooks
  hooks.forEach((hook) => nuxtApp.hook("app:mounted", hook));
});
