<script setup lang="ts">
// ##imports
// ##config
const props = defineProps<{ item?: any }>();
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
  <VSheet elevation="1" class="component--VSheetChatItemSimple pa-2">
    <h5>{{ item.data.name }}</h5>
    <p>{{ item.data.message }}</p>
  </VSheet>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
