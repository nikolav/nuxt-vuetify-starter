<script setup lang="ts">
const props = defineProps<{ to: any }>();
navigateTo(props.to);
// @@eos
</script>
<template>
  <slot />
</template>
