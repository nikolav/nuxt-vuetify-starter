<script setup lang="ts">
// ##imports
// ##config
const props = withDefaults(defineProps<{ propsIcon?: any; text?: any }>(), {
  text: "Poništi",
});
// ##utils
// ##icons
// ##refs ##flags
// ##state ##data ##auth
// ##computed
// ##forms ##helpers
// ##watch
// ##hooks:lifecycle

// @@eos
</script>
<template>
  <VBtn color="secondary" variant="plain" rounded="pill" class="px-3">
    <slot>
      <VIcon size="large" icon="$close" start v-bind="propsIcon" />
      <span> {{ text }} </span>
    </slot>
  </VBtn>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
