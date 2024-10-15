<script setup lang="ts">
// G5c3pxAQijg
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
        <slot name="prepend">
          <VIcon icon="$complete" size="1.55rem" />
        </slot>
      </template>
      <VListItemTitle class="text-body-1 ps-0 text-start">
        <slot />
      </VListItemTitle>
      <template #append>
        <slot name="append" :isActive="isActive">
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
        </slot>
      </template>
    </VListItem>
  </VSnackbar>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
