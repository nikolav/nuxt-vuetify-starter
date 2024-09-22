<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { status: FCMStatus, ping: FCMPing } = useMutationCloudMessagingPing();

// @@eos
</script>
<template>
  <section class="page--dashboard">
    <h1>app</h1>
    <VBtn @click="FCMPing">FCM:ping</VBtn>
    <Dump :data="{ FCMStatus }" />
  </section>
</template>
<style lang="scss" scoped></style>
