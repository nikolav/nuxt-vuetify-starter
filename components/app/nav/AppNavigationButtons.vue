<script setup lang="ts">
import { useDisplay } from "vuetify";
import NAV from "~/assets/app/nav.json";

const { smAndUp } = useDisplay();
// @@eos
</script>
<template>
  <NuxtLink v-for="(node, i) in NAV" :key="node.title" :to="{ name: node.to }">
    <VBtn
      :class="[
        smAndUp && i < NAV.length ? `mb-2` : undefined,
        smAndUp ? 'd-block mx-auto' : undefined,
      ]"
      icon
      variant="plain"
      color="secondary"
    >
      <Icon :size="node?.size || '1rem'" :name="node.icon" />
    </VBtn>
  </NuxtLink>
</template>
<style lang="scss" scoped></style>

