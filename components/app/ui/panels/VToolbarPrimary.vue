<script setup lang="ts">
// XnWLC
const props = withDefaults(
  defineProps<{ routeBackName: string; dividerStart: boolean; text?: any }>(),
  {
    routeBackName: "aktiva-proizvodi",
    dividerStart: true,
  }
);
const {
  layout: { toolbarMainHeight },
} = useAppConfig();
const ROUTE_BACK_NAMED = { name: props.routeBackName };
// @@eos
</script>
<template>
  <VToolbar
    :height="toolbarMainHeight"
    class="component--VToolbarPrimary"
    color="primary"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
      <VDivider v-if="dividerStart" vertical inset class="ms-2" />
    </template>
    <template #append>
      <slot name="append" :toRoutePrev="ROUTE_BACK_NAMED">
        <VBtn
          size="small"
          :to="ROUTE_BACK_NAMED"
          icon="$close"
          variant="plain"
          density="comfortable"
        />
      </slot>
    </template>
    <slot name="title" :text="text">
      <VToolbarTitle
        class="text-center text-body-1 opacity-50 font-weight-light font-italic"
      >
        <span>{{ text }}</span>
      </VToolbarTitle>
    </slot>
  </VToolbar>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
