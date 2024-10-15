<script setup lang="ts">
const props = defineProps<{ uid?: any }>();
const { availability: a } = useDocUsersAvailabilityStatus();
const availability_ = computed(() => a(props.uid));
// @@eos
</script>
<template>
  <slot :availability="availability_" />
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
