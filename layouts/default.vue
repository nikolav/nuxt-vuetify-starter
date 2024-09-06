<script setup lang="ts">
// @@eos
</script>
<template>
  <section class="layout--default">
    <VAppBar elevation="1" density="comfortable">
      <VAppBarTitle>@demo:app</VAppBarTitle>
      <div class="d-flex items-center gap-5 justify-center me-4">
        <NuxtLink :to="{ name: 'index' }">index</NuxtLink>
        <NuxtLink :to="{ name: 'demo' }">demo</NuxtLink>
        <NuxtLink :to="{ name: 'auth-login' }">auth</NuxtLink>
      </div>
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped></style>
