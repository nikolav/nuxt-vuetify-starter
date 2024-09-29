<script setup lang="ts">
import { Test, Dump } from "@/components/dev";

const { add, drop, profile_patch, policies_patch, send_verify_email_link } =
  useMutationAccountsManage();

const policiesCommit = async (uid: any) => {
  const res = await policies_patch({ [uid]: { email: true, storage: true } });
  console.log({ res });
};

const accountDrop = async (uid: any) => {
  const res = await drop(uid);
  console.log({ res });
};

const profilePatch = async (uid: any) => {
  const res = await profile_patch(uid, { "a.b": idGen() });
  console.log({ res });
};

const accountsAddRand = async () => {
  const cred = `user.${idGen()}@nikolav.rs`;
  const res = await add({ email: cred, password: cred });
  console.log({ res });
};

// @@eos
</script>
<template>
  <VResponsive :max-width="320" class="mx-auto">
    <VBtn @click="send_verify_email_link">ok</VBtn>
  </VResponsive>
</template>
<style lang="scss" scoped></style>
