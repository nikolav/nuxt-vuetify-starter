<script lang="ts" setup>
import { SpinnerAppProcessing } from "@/components/ui";
const {
  $theme: { theme },
} = useNuxtApp();
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
    <SpinnerAppProcessing :opacity="0.8" />
  </VApp>
</template>
<style>
.BLUR-enter-active,
.BLUR-leave-active {
  transition: all 0.55s;
}

.BLUR-enter-from,
.BLUR-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}

.BLUR-leave-active {
  position: absolute;
  z-index: -1;
  width: 100%;
}
</style>
