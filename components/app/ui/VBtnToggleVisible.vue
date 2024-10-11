<script setup lang="ts">
// vz2gq2o9AGK4U2l
const isActive = defineModel<boolean>();
const icon = computed(() =>
  isActive.value
    ? "icon-park-outline:preview-close-one"
    : "icon-park-outline:preview-open"
);
// @@eos
</script>
<template>
  <VBtn
    class="component--VBtnTogglePasswordInptType"
    variant="plain"
    color="secondary"
    density="comfortable"
    icon
  >
    <slot name="icon" :icon="icon" :isActive="isActive">
      <Icon size="1rem" :name="icon" />
    </slot>
  </VBtn>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
