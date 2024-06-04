<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { Spinner } from "@/components/spinners";
const {
  key: { APP_PROCESSING },
} = useAppConfig();
const processing = useGlobalFlag(APP_PROCESSING);

// #eos
</script>

<template>
  <VFadeTransition>
    <div
      v-if="processing"
      class="position-fixed left-1/2 -translate-x-[50%] top-1/2 -translate-y-[50%] z-[9999]"
    >
      <Spinner v-bind="$attrs" />
    </div>
  </VFadeTransition>
</template>

<style scoped></style>
