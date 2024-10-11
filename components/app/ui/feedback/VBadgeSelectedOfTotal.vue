<script setup lang="ts">
// dTOAno
defineOptions({
  inheritAttrs: false,
});
const model = defineModel();
const props = defineProps<{ length: string | number }>();

// @@eos
</script>
<template>
  <span class="component--VBadgeSelectedOfTotal">
    <slot name="prepend" :length="length" :value="model">
      <small class="prepend opacity-50"> {{ model }} </small>
    </slot>
    <slot name="divider" :length="length" :value="model">
      <span class="divider opacity-50">
        <pre class="ps-1">/</pre>
      </span>
    </slot>
    <slot :length="length" :value="model">
      <span class="default">
        <VBadge
          color="primary-lighten-1"
          inline
          :content="length"
          v-bind="$attrs"
        />
      </span>
    </slot>
  </span>
</template>
<style lang="scss" scoped>
.component--VBadgeSelectedOfTotal {
  gap: 0;
  display: grid;
  grid-template-areas: "prepend divider default";
  align-items: center;
  .prepend {
    grid-area: "prepend";
  }
  .divider {
    grid-area: "divider";
  }
  .default {
    grid-area: "default";
  }
}
</style>
<style lang="scss"></style>
