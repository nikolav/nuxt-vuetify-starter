<script setup lang="ts">
import { ProvideUserAvailability } from "@/components/app";
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{ uid?: any }>();
const {
  acconts: { availabilityUI },
  app: { TOOLTIPS_OPEN_DELAY },
} = useAppConfig();
// @@eos
</script>
<template>
  <ProvideUserAvailability
    class="component--VBadgeUserAvailability"
    :uid="uid"
    v-slot="{ availability }"
  >
    <VBadge
      v-if="availability in availabilityUI"
      color="transparent"
      inline
      class="*!scale-[85%] translate-y-[3px] px-0 mx-0"
      v-bind="$attrs"
    >
      <VTooltip
        location="bottom"
        :open-delay="TOOLTIPS_OPEN_DELAY"
        :text="availabilityUI[availability].title"
        activator="parent"
      />
      <template #badge>
        <VIcon v-bind="availabilityUI[availability].icon" />
      </template>
    </VBadge>
  </ProvideUserAvailability>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
