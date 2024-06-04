<script setup lang="ts">
const props = defineProps<{ data: any }>();
const data$ = computed(() => {
  try {
    return JSON.stringify(props.data, null, 2);
  } catch (error) {
    // pass
  }
  return props.data;
});
watchEffect(() => {
  console.log(props.data);
});
// @@eos
</script>
<template>
  <section class="component--dev.Dump">
    <small>
      <pre v-bind="$attrs">{{ data$ }}</pre>
    </small>
  </section>
</template>
<style lang="scss" scoped></style>
