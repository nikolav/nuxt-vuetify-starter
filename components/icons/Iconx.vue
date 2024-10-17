<script setup lang="ts">
const props = defineProps<{ icon?: any }>();
//
const isRenderFN = computed(() => !isString(props.icon));
const isVuetifyIcon = computed(
  () => !isRenderFN.value && String(props.icon).startsWith("$")
);
// @@eos
</script>
<template>
  <component v-if="isRenderFN" :is="icon" v-bind="$attrs" />
  <VIcon v-else-if="isVuetifyIcon" :icon="icon" v-bind="$attrs" />
  <Icon v-else :name="icon" v-bind="$attrs" />
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
