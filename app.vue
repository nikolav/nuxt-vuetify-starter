<script lang="ts" setup>
import { SpinnerAppProcessing } from "@/components/ui";
import { Dump } from "@/components/dev";

const {
  app: { LOGOUT_RELOAD_PATH },
} = useAppConfig();
const auth = useStoreApiAuth();
const route = useRoute();
// set default guest key @!auth
// onceOn(
useOnceOn(
  () => auth.initialized$ && !auth.isAuth$,
  () => {
    nextTick(() => {
      if (!auth.token$) auth.tokenPutDefault();
    });
  }
);
// onAuthStatus
watch(
  [() => auth.isAuth$, () => auth.isDefault$],
  async ([isAuth, isDefault]) => {
    if (!isDefault) {
      if (!isAuth) {
        // handle logouts;
        //  clear cache, hard reload
        return reloadNuxtApp({
          path: LOGOUT_RELOAD_PATH,
          persistState: false,
        });
      }
      // handle logins
      // # redirect to index if auth updated at login pages
      if (
        some(["auth-register", "auth-login"], (name) =>
          String(route.name).includes(name)
        )
      )
        await navigateTo({ name: "index" });

      // break
      return;
    }
    // default user auth status change
  }
);

// meta, seo --config
useHead({
  titleTemplate: (ttl) => (ttl ? `🌍 ${ttl} | nikolav.rs` : "nikolav.rs"),
});

// provide current user data
const uid = computed(() => auth.uid);
const token = computed(() => auth.token$ || "");
provide(key_UID, uid);
provide(key_TOKEN, token);

const {
  $theme: { theme },
} = useNuxtApp();

useSeoMeta({
  title: "NuxtApp",
  ogTitle: "nuxtapp",
  description: "nuxtapp",
  ogDescription: "nuxtapp",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});

// #cloud messaging
useFirebaseCloudMessaging({
  onMessage: (payload) => {
    console.log({ "firebaseCloudMessaging:payload --debug": payload });
  },
});

// #eos
</script>
<template>
  <VApp :theme="theme" class="component--app-main">
    <!-- @pages -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- @ui:status -->
    <NuxtLoadingIndicator color="red" />
    <SpinnerAppProcessing :opacity="0.81" />
  </VApp>
</template>
<style>
.BLUR-enter-active,
.BLUR-leave-active {
  transition: all 0.122s;
}

.BLUR-enter-from,
.BLUR-leave-to {
  opacity: 0;
  filter: blur(0.122rem);
}

.BLUR-leave-active {
  position: absolute;
  z-index: -1;
  width: 100%;
}
</style>
