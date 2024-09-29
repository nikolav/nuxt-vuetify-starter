<script setup lang="ts">
import { Dump } from "@/components/dev";
const route = useRoute();
const key = computed(() => get(route.query, "key"));

const email_verified = ref();

// const { verify_email } = useMutationAccountsManage();
// useOnceMountedOn(key, async () => {
//   email_verified.value = get(
//     await verify_email(key.value),
//     "data.accountsVeifyEmail.status.email"
//   );
// });

// @@eos
</script>
<template>
  <section class="page--auth-verify-email">
    <Dump :data="{ email_verified, key }" />
  </section>
</template>
<style lang="scss" scoped></style>
