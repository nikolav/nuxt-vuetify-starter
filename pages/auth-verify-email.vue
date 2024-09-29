<script setup lang="ts">
import { Dump } from "@/components/dev";
import { isEmail } from "validator";
const route = useRoute();
const key = computed(() => get(route.query, "key"));

const emailVerified = ref();

const { emailVerify } = useMutationAccountsManage();
useOnceMountedOn(key, async () => {
  emailVerified.value = get(
    await emailVerify(key.value),
    "data.accountsVeifyEmail.status.email"
  );
});

// @@eos
</script>
<template>
  <section class="page--auth-verify-email">
    <p v-if="emailVerified">
      Email &lt;{{ emailVerified }}&gt; successfully verified.
    </p>
    <Dump :data="{ emailVerified, key }" />
  </section>
</template>
<style lang="scss" scoped></style>
