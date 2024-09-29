<script setup lang="ts">
import { Test, Dump } from "@/components/dev";

const {
  add,
  drop,
  profilePatch,
  policiesPatch,
  emailSendVerifyLink,
  passwordSendResetLink,
} = useMutationAccountsManage();

const policiesCommit = async (uid: any) => {
  const res = await policiesPatch({ [uid]: { email: true, storage: true } });
  console.log({ res });
};

const accountDrop = async (uid: any) => {
  const res = await drop(uid);
  console.log({ res });
};

const profilePatched = async (uid: any) => {
  const res = await profilePatch(uid, { "a.b": idGen() });
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
    <VBtn @click="emailSendVerifyLink">ok</VBtn>
  </VResponsive>
</template>
<style lang="scss" scoped></style>
