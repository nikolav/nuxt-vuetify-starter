<script setup lang="ts">
// 8rWqBKIKsWZ4pbf1
import { Test, Dump } from "@/components/dev";
import { VMenuComposeChatMessage } from "@/components/app";

const { chatMessageMany } = useQueryComms();

const ok = async (message: any) => {
  console.log(await chatMessageMany({ uids: [1, 6, 5, 7], message }));
};
// @@eos
</script>
<template>
  <VBtn @click="ok">ok</VBtn>
  <VBtn>
    <span>msg</span>
    <VMenuComposeChatMessage @message="ok" />
  </VBtn>
</template>
<style lang="scss" scoped></style>
