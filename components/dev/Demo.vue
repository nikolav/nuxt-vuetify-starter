<script setup lang="ts">
import { Iconx } from "@/components/icons";
// 8rWqBKIKsWZ4pbf1
import { Test, Dump } from "@/components/dev";
const ICONS_DEFAULT = [
  "calendar",
  "cancel",
  "checkboxIndeterminate",
  "checkboxOff",
  "checkboxOn",
  "clear",
  "close",
  "complete",
  "delete",
  "delimiter",
  "dropdown",
  "edit",
  "error",
  "expand",
  "file",
  "first",
  "info",
  "last",
  "loading",
  "menu",
  "minus",
  "next",
  "plus",
  "prev",
  "radioOff",
  "radioOn",
  "ratingEmpty",
  "ratingFull",
  "ratingHalf",
  "sortAsc",
  "sortDesc",
  "subgroup",
  "success",
  "unfold",
  "warning",
];

// @@eos
</script>
<template>
  <VResponsive :max-width="320" class="mx-auto">
    <VIcon
      size="1.22rem"
      v-for="icon in ICONS_DEFAULT"
      :key="icon"
      :icon="`$${icon}`"
    />
  </VResponsive>
  <VDivider class="mt-4" />
  <Iconx icon="$iconFrikomLogo" size="12rem" />
</template>
<style lang="scss" scoped></style>
