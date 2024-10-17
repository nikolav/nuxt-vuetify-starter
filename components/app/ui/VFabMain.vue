<script setup lang="ts">
// daVORcblZd8JD
import { useDisplay } from "vuetify";
const { smAndUp } = useDisplay();

// @@eos
</script>
<template>
  <VFab
    absolute
    appear
    icon="$plus"
    class="!fixed !z-[1555]"
    :class="[smAndUp ? 'end-20 bottom-6' : 'end-6 bottom-20']"
  />
</template>
<style lang="scss" scoped></style>
