<script setup lang="ts">
// ##imports
// ##config
const props = withDefaults(defineProps<{ propsIcon?: any; text?: any }>(), {
  text: "Sačuvaj",
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
  <VBtn elevation="1" size="large" variant="tonal" rounded="pill" class="px-4">
    <slot>
      <Icon
        class="opacity-50 me-2"
        size="1.44rem"
        name="material-symbols:save"
        v-bind="propsIcon"
      />
      <span>{{ text }}</span>
    </slot>
  </VBtn>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
