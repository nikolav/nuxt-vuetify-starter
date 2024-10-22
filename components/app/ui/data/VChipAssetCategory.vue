<script setup lang="ts">
// ##imports
import { ProvideAssetCategory } from "@/components/app";
// ##config
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{ asset?: any; showExtra?: boolean }>();
// ##utils
// ##icons
// ##refs ##flags
// ##data ##auth ##state
// ##computed
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head

// @@eos
</script>
<template>
  <ProvideAssetCategory v-if="asset" :asset="asset" v-slot="{ title, emoji }">
    <VChip
      color="primary"
      variant="tonal"
      elevation="1"
      size="large"
      class="component--VChipAssetCategory"
      v-bind="$attrs"
    >
      <template v-if="emoji && showExtra" #prepend>
        <i>{{ emoji }}</i>
      </template>
      <slot name="title" :title="title">
        <span class="ms-1">{{ title }}</span>
      </slot>
    </VChip>
  </ProvideAssetCategory>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
