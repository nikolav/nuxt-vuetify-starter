<script setup lang="ts">
// 68jtQCbo3dk7ODjzicNc
defineOptions({
  inheritAttrs: false,
});
const LIST_MIN_WIDTH = 192;
const props = withDefaults(
  defineProps<{ items?: any[]; showIndex?: number }>(),
  {
    showIndex: 0,
  }
);

const {
  app: { TOOLTIPS_OPEN_DELAY, DEFAULT_TRANSITION },
} = useAppConfig();

// label getter --do-custom
const getLabel = identity;

const labels = computed(() =>
  filter(map(props.items || [], getLabel), Boolean)
);
const size = computed(() => len(labels.value));

const toggleMenuShowGroups = useToggleFlag();
// @@eos
</script>
<template>
  <span v-if="0 < size" class="component--v-chip-plus d-flex items-center">
    <VChip
      :text="`${labels[showIndex] || ''}`"
      size="small"
      color="warning-darken-2"
      @click.stop="1 < size && toggleMenuShowGroups.on()"
      v-bind="$attrs"
    />
    <VBadge
      v-if="1 < size"
      :content="`+${size - 1}`"
      inline
      color="primary-darken-2"
      @click.stop
    >
      <VMenu
        v-model="toggleMenuShowGroups.isActive.value"
        activator="parent"
        location="center"
        :transition="DEFAULT_TRANSITION"
      >
        <VList
          :items="labels"
          :min-width="LIST_MIN_WIDTH"
          class="py-0"
          variant="text"
          lines="one"
          base-color="primary-darken-2"
          density="compact"
        />
      </VMenu>
    </VBadge>
  </span>
</template>
<style lang="scss" scoped></style>
