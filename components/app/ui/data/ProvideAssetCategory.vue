<script setup lang="ts">
// ##imports
// ##config
const props = defineProps<{ asset?: any }>();
const {
  db: {
    Assets: {
      categories: { CATEGORY_KEY_ASSETS_prefix },
    },
  },
} = useAppConfig();

// ##utils
const { categoryNodeByTag } = useCategoryAssets();
// ##icons
// ##refs ##flags
// ##data ##auth ##state
// ##computed
const categoryNode = computed(() =>
  categoryNodeByTag(
    find(props.asset?.tags, (t: string) =>
      t.startsWith(CATEGORY_KEY_ASSETS_prefix)
    )
  )
);

// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head

// @@eos
</script>
<template>
  <slot
    class="component--ProvideAssetCategory"
    v-bind="categoryNode?.value()"
  />
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
