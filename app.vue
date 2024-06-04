<script lang="ts" setup>
const { $theme } = useNuxtApp();
// #eos
</script>
<template>
  <VApp :theme="$theme.theme.value" class="component--app-main">
    <!-- @pages -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- @ui:status -->
    <NuxtLoadingIndicator color="red" />
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
