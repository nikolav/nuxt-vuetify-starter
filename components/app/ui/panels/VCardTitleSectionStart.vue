<script setup lang="ts">
// ##imports
// import { mergeProps } from "vue";
// ##config ##const
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  propsContainer?: any;
  propsExtension?: any;
  title?: any;
}>();
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
  <section
    class="component--VCardTitleSectionSectionStart grid_ *ma-0 *pa-0"
    v-bind="propsContainer"
  >
    <VCardTitle v-bind="$attrs">
      <div class="header_">
        <div class="prepend__">
          <slot name="prepend" />
        </div>
        <div class="default__">
          <slot :title="title">
            <span>{{ title }}</span>
          </slot>
        </div>
        <div class="actions__">
          <slot name="actions" />
        </div>
        <div class="append__">
          <slot name="append" />
        </div>
      </div>
    </VCardTitle>
    <div class="extension_" v-bind="propsExtension">
      <slot name="extension" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
.grid_ {
  display: grid !important;
  grid-template-areas: "header" "extension";
  gap: 0;
  .header_ {
    display: grid;
    grid-area: header;
    grid-template-columns: auto 1fr auto auto;
    gap: 0;
    align-items: center;
  }
  .extension_ {
    grid-area: extension;
  }
}
</style>
<style module></style>
<style lang="scss"></style>
