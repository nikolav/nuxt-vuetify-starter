<script setup lang="ts">
// ##imports
// ##config
const props = defineProps<{
  item?: any;
  propsHeader?: any;
  propsBody?: any;
  propsFooter?: any;
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
  <VSheet class="component--VSheetHeaderBodyFooter grid_">
    <!-- @@header -->
    <div class="header_" v-bind="propsHeader">
      <div class="prepend_">
        <slot name="prepend" :item="item" />
      </div>
      <div class="title_">
        <slot name="title" :item="item" />
      </div>
      <div class="append_">
        <slot name="append" :item="item" />
      </div>
    </div>
    <!-- @@body -->
    <section class="body_" v-bind="propsBody">
      <slot name="body" :item="item" />
    </section>
    <!-- @@footer -->
    <div class="footer_" v-bind="propsFooter">
      <slot name="footer" :item="item" />
    </div>
  </VSheet>
</template>
<style lang="scss" scoped>
.grid_ {
  display: grid;
  grid-template-areas: "header_" "body_" "footer_";
  gap: 0;
}
.header_ {
  display: grid;
  grid-area: header_;
  grid-template-columns: auto 1fr auto;
  gap: 0;
}
.body_ {
  grid-area: body_;
}
.footer_ {
  grid-area: footer_;
}
</style>
<style module></style>
<style lang="scss"></style>
