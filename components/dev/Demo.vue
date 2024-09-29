<script setup lang="ts">
import { Test, Dump } from "@/components/dev";

const { policies_patch, add, drop } = useMutationAccountsManage();

const policiesCommit = async () => {
  const res = await policies_patch({ 11: { email: true, storage: true } });
  console.log({ res });
};

const accountDrop = async (uid: any) => {
  const res = await drop(uid);
  console.log({ res });
};

// @@eos
</script>
<template>
  <VResponsive :max-width="320" class="mx-auto">
    <VBtn @click="accountDrop(19)">ok</VBtn>
  </VResponsive>
</template>
<style lang="scss" scoped></style>
