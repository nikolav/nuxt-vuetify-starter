<script lang="ts" setup>
import { SpinnerAppProcessing } from "@/components/ui";
import { Dump } from "@/components/dev";

const {
  app: { LOGOUT_RELOAD_PATH, MODE_DEBUG },
  vars: { FLAG_SHOW_AUTH_BACKGROUND },
} = useAppConfig();
const auth = useStoreApiAuth();
// const route = useRoute();
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
      // handle @logout
      if (!isAuth) {
        //  clear cache, hard reload
        return reloadNuxtApp({
          path: LOGOUT_RELOAD_PATH,
          persistState: false,
        });
      }
      // handle @login
      // # redirect to /app if auth updated at login pages
      // if (
      //   some(["index", "auth", "auth-register", "auth-login"], (name) =>
      //     String(route.name).includes(name)
      //   )
      // )
      await navigateTo({ name: "app" });

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

const authBgActive = useState(FLAG_SHOW_AUTH_BACKGROUND);

// #eos
</script>
<template>
  <VApp
    :theme="theme"
    :class="[
      'component--appMain',
      authBgActive ? 'v-app--authBgActive' : undefined,
    ]"
  >
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

.v-app--authBgActive {
  background-image: url("~/assets/images/svg/frikom-logo--auth-login.svg") !important;
  background-repeat: no-repeat !important;
  background-size: 105% !important;
  background-position: center 22% !important;
}
</style>
