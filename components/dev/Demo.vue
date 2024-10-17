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

const URL =
  "https://media.australian.museum/media/dd/images/Some_image.width-1200.976d0a3.jpg";
const { file } = useFetchUrlToFileData();
const { upload } = useFirebaseStorage("/temp/images");

const dFile = async () => {
  console.log(await file(URL, "Some_image.width-1200.976d0a3.jpg"));
};

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
  <VBtn @click="dFile">ok</VBtn>
</template>
<style lang="scss" scoped></style>
