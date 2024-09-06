<script setup lang="ts">
const auth = useStoreApiAuth();
const loginAdmin = async () => {
  await auth.login({
    email: "admin@nikolav.rs",
    password: "5ba8de29-93bb-5bc2-9e03-b1a8c7c6737b",
  });
};
// @@eos
</script>
<template>
  <section class="page--index">
    <VResponsive max-width="550" v-if="!auth.isAuthenticated$">
      <VBtn variant="tonal" @click="loginAdmin">login:admin</VBtn>
    </VResponsive>
  </section>
</template>
<style lang="scss" scoped></style>
