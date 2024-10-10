<script setup lang="ts">
// iZityEVO
const isActive = defineModel<boolean>();

const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();

// @@eos
</script>
<template>
  <VSnackbar
    v-model="isActive"
    location="bottom"
    color="success-darken-1"
    rounded="pill"
    :transition="DEFAULT_TRANSITION"
  >
    <VListItem density="comfortable" class="ps-2 pe-0">
      <template #prepend>
        <VIcon icon="$complete" size="1.55rem" />
      </template>
      <VListItemTitle class="text-body-1 ps-0 text-start">
        <slot />
      </VListItemTitle>
      <template #append>
        <VBtn
          density="comfortable"
          variant="plain"
          icon
          @click="isActive = false"
          class="translate-x-1"
          color="on-success"
        >
          <VIcon icon="$close" size="1.55rem" />
        </VBtn>
      </template>
    </VListItem>
  </VSnackbar>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
