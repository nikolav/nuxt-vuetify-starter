<script setup lang="ts">
import { z } from "zod";
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

const { form, submit, valid } = useFormDataFields(
  "ZoQus7nYYc",
  {
    title: true,
  },
  {
    onSubmit: (data) => {
      console.log({ data });
    },
    schema: z.object({
      title: z.string().min(2),
    }),
  }
);

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
  <VForm @submit.prevent="submit" autocomplete="off">
    <VTextField label="title" v-model.trim="form.title.value" />
    <VBtn :disabled="!valid" type="submit">ok</VBtn>
  </VForm>
</template>
<style lang="scss" scoped></style>
