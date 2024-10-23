<script setup lang="ts">
// 8rWqBKIKsWZ4pbf1
import { Test, Dump } from "@/components/dev";
import { ProvideAssetsGroupAvatar } from "@/components/app";

const ok = async (message: any) => {};
// @@eos
</script>
<template>
  <VBtn @click="ok">ok</VBtn>
  <ProvideAssetsGroupAvatar :gid="101" v-slot="{ avatarImage }">
    <VImg :src="avatarImage" />
  </ProvideAssetsGroupAvatar>
</template>
<style lang="scss" scoped></style>
