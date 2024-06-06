<script setup lang="ts">
import type { ITranslationQuery } from "@/types";
const props = defineProps<{ query: ITranslationQuery }>();
const { translation } = useFetchTranslationApi(() => props.query);
// @@eos
</script>
<template>
  <slot :translation="translation" />
</template>
<style lang="scss" scoped></style>
