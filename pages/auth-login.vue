<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  middleware: "guest",
});
const auth = useStoreApiAuth();
const authAdmin = async () =>
  await auth.login({
    email: "admin@nikolav.rs",
    password: "5ba8de29-93bb-5bc2-9e03-b1a8c7c6737b",
  });

// @@eos
</script>
<template>
  <section class="page--auth-login">
    <p>@auth:login</p>
    <VResponsive max-width="550" class="mx-auto overflow-visible">
      <VBtn @click="authAdmin">login:admin</VBtn>
      <VBtn @click="auth.logout()">logout</VBtn>
    </VResponsive>
    <Dump :data="{ user: auth.user$ }" />
  </section>
</template>
<style lang="scss" scoped></style>
