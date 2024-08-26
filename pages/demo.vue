<script setup lang="ts">
import { Dump } from "@/components/dev";
import { renderIcon } from "@/components/icons";
// definePageMeta({
//   layout: false,
// });

const {
  icon: {
    aliases: { github },
  },
} = useAppConfig();
const IconFoo = renderIcon(github, { class: "translate-y-px" });

const t$ = ref();

// @@eos
</script>
<template>
  <section class="page--demo">
    <VResponsive max-width="550" class="mx-auto overflow-visible">
      
    </VResponsive>
  </section>
</template>
<style lang="scss" scoped></style>
