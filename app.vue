<script lang="ts" setup>
// #eos
</script>
<template>
  <section class="component--app">
    <!-- @pages -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- @ui:status -->
    <NuxtLoadingIndicator color="red" />
  </section>
</template>
<style lang="sass">
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
