<script setup lang="ts">
// @@eos
</script>
<template>
  <section class="layout--default">
    <VAppBar elevation="1" density="comfortable">
      <VAppBarTitle>@demo:app</VAppBarTitle>
      <div class="d-flex items-center gap-5 justify-center me-4">
        <NuxtLinkLocale to="/">index</NuxtLinkLocale>
        <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
      </div>
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped></style>
