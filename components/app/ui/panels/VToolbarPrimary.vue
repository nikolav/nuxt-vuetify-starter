<script setup lang="ts">
// 1MEGCDgb23pxaFqEC
const props = withDefaults(
  defineProps<{
    routeBackName?: string;
    dividerStart?: boolean;
    text?: any;
    propsTitle?: any;
    propsActions?: any;
  }>(),
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
      <VToolbarItems class="*pe-1" v-bind="propsActions">
        <slot name="actions" />
      </VToolbarItems>
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
    <VToolbarTitle
      class="text-center opacity-50 font-weight-light"
      v-bind="propsTitle"
    >
      <slot name="title" :text="text">
        <span>{{ text }}</span>
      </slot>
    </VToolbarTitle>
  </VToolbar>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
