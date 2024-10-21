<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  topic?: string;
  small?: boolean | undefined;
  text?: boolean | string | undefined;
}>();
const {
  rating,
  ratingsCount,
  rate,
  val: ratingValue,
  store,
} = useTopicRating(() => props.topic);

// @@eos
</script>
<template>
  <section class="component--TopicRating">
    <div class="d-flex items-center">
      <small
        class="text-[107%] px-2 align-self-center font-mono"
        :class="small && 'text-[88%] translate-y-[2px] opacity-30'"
      >
        {{ rating }}
      </small>
      <VDivider v-if="!small" vertical />
      <VRating
        :model-value="ratingValue"
        @update:model-value="rate"
        active-color="orange"
        color="secondary"
        hover
        clearable
        :density="small ? 'compact' : undefined"
        v-bind="$attrs"
      />
    </div>
    <p
      v-if="false !== text"
      class="ps-2 text-medium-emphasis *text-center -translate-y-[.55rem]"
    >
      <small v-if="true !== text">{{ text }}</small>
      <template v-else>
        <small>
          broj ocena
          <pre class="text-black d-inline-block">{{ ratingsCount }}</pre>
        </small>
      </template>
    </p>
  </section>
</template>
<style lang="scss" scoped></style>
