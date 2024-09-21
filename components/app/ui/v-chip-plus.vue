<script setup lang="ts">
import type { OrNoValue } from "@/types";
defineOptions({
  inheritAttrs: false,
});
const props = withDefaults(
  defineProps<{ items: OrNoValue<any[]>; showIndex?: number }>(),
  {
    showIndex: 0,
  }
);

const {
  app: { TOOLTIPS_OPEN_DELAY, DEFAULT_TRANSITION },
} = useAppConfig();

const getLabel = <T = any>(node: T) => node;
const noLabels = computed(() => isEmpty(props.items));
const size = computed(() => len(props.items));
const labels = computed(() =>
  noLabels.value ? [] : map(props.items, getLabel)
);
// @@eos
</script>
<template>
  <span v-if="0 < size" class="component--v-chip-plus d-flex items-center">
    <VChip
      :text="labels[props.showIndex]"
      size="small"
      color="warning-darken-2"
      v-bind="$attrs"
    />
    <template v-if="1 < size">
      <VBadge inline color="primary-darken-2">
        <template #badge>
          <pre class="d-inline-block">+{{ size - 1 }}</pre>
        </template>
        <VMenu
          :transition="DEFAULT_TRANSITION"
          activator="parent"
          location="center"
          open-on-hover
          :open-delay="TOOLTIPS_OPEN_DELAY"
        >
          <VList
            class="py-0"
            variant="text"
            lines="one"
            base-color="primary-darken-2"
            rounded="lg"
            :items="labels"
            density="compact"
          />
        </VMenu>
      </VBadge>
    </template>
  </span>
</template>
<style lang="scss" scoped></style>
