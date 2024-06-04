<script setup lang="ts">
// # https://valgeirb.github.io/vue3-popper/guide/api.html#api
import Popper from "vue3-popper";
import "@/assets/styles/components/Popup.scss";

// @@eos
</script>
<template>
  <Popper>
    <slot></slot>
    <template #content="props_">
      <slot name="content" v-bind="props_"></slot>
    </template>
  </Popper>
</template>
<style lang="scss" scoped></style>
