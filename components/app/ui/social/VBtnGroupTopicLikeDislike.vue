<script setup lang="ts">
const props = defineProps<{
  topic: string;
  light?: boolean;
  small?: boolean | undefined;
}>();

const { like, dislike, likesCount, dislikesCount, isLiked, isDisliked } =
  useTopicLikeDislike(() => props.topic);

// @@eos
</script>
<template>
  <VBtnGroup
    color="primary"
    :rounded="small ? 'lg' : 'pill'"
    density="compact"
    class="component--LikeDislike *:!text-lg"
    :class="small ? 'd-inline-block' : undefined"
    :divided="!small ? true : undefined"
    elevation="0"
    :border="!small ? true : undefined"
    :variant="light ? 'outlined' : 'flat'"
    v-bind="$attrs"
  >
    <VBtn
      @click="like(!isLiked)"
      slim
      :size="small ? 'x-small' : 'small'"
      class="px-0 mx-0"
      :class="[
        !isLiked ? 'opacity-50' : ['opacity-100', light ? 'bg-primary-2' : ''],
        small ? '!py-[3px]' : undefined,
      ]"
    >
      <strong
        :class="small ? 'text-sm' : undefined"
        class="translate-x-px -translate-y-[2px]"
        >👍🏼</strong
      ><small :class="!small ? 'ps-px' : undefined">
        <pre class="text-xs opacity-80">{{ likesCount }}</pre>
      </small>
    </VBtn>
    <VBtn
      @click="dislike(!isDisliked)"
      slim
      :size="small ? 'x-small' : 'small'"
      class="px-0 mx-0"
      :class="[
        !isDisliked
          ? 'opacity-50'
          : ['opacity-100', light ? 'bg-primary-2' : ''],
        small ? '!py-[3px]' : undefined,
      ]"
      ><strong
        :class="small ? 'text-sm' : undefined"
        class="-translate-y-px -translate-x-px"
        >👎🏼</strong
      ><small :class="!small ? 'ps-px' : undefined">
        <pre class="text-xs -translate-x-[2px]">{{ dislikesCount }}</pre>
      </small></VBtn
    >
  </VBtnGroup>
</template>
<style lang="scss" scoped></style>
