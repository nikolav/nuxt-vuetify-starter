<script lang="ts" setup>
import { SpinnerAppProcessing } from "@/components/ui";
import { type MessagePayload } from "firebase/messaging";

const {
  app: { LOGOUT_RELOAD_PATH },
  vars: { FLAG_SHOW_AUTH_BACKGROUND },
  re: { ROUTE_NAMES_SKIP_REDIRECT_APP_ON_AUTHENTICATED },
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

const skipRedirectToAppOnAuthenticated = (routeName: any) =>
  some(ROUTE_NAMES_SKIP_REDIRECT_APP_ON_AUTHENTICATED, (re) =>
    String(routeName).match(re)
  );
// onAuthStatus
watch(
  () => auth.isAuthenticated$,
  async (isAuthenticated) => {
    isAuthenticated
      ? skipRedirectToAppOnAuthenticated(route.name)
        ? undefined
        : await navigateTo({ name: "app" })
      : reloadNuxtApp({
          path: LOGOUT_RELOAD_PATH,
          persistState: false,
          ttl: 1,
          // force: true,
        });
  }
);

// meta, seo --config
useHead({
  titleTemplate: (ttl) => (ttl ? `${ttl} | nikolav.rs` : "nikolav.rs"),
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
  onMessage: (payload: MessagePayload) => {
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
  /* background-image: url("~/assets/images/svg/frikom-logo--auth-login.svg") !important; */
  background-image: url("~/assets/images/svg/frikom-logo--teren.svg") !important;
  background-repeat: no-repeat !important;
  background-size: 102% !important;
  background-position: center 9% !important;
}
</style>
