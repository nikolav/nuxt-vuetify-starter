<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    foo?: string;
  }>(),
  {
    foo: "",
  }
);
// @@eos
</script>
<template>
  <section class="__Test">
    <div v-if="$slots.prepend" class="__prepend">
      <slot name="prepend" />
    </div>
    <div class="__default">
      <slot />
    </div>
    <div v-if="$slots.append" class="__append">
      <slot name="append" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
.__Test {
  display: grid;
  grid-template-areas: "prepend default append";
  grid-auto-columns: auto 1fr auto;
  gap: 0;
  > div {
    margin: 0;
    padding: 0;
  }
}
.__prepend {
  grid-area: prepend;
}
.__default {
  grid-area: default;
}
.__append {
  grid-area: append;
}
</style>
