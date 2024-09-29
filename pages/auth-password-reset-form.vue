<script setup lang="ts">
const auth = useStoreApiAuth();
const email = computed(() => get(auth.user$, "email"));
const route = useRoute();
const key = computed(() => get(route.query, "key"));
const passwordResetAccountID = ref();
const timeoutLogout = useSetTimeout(auth.logout);
const { passwordReset } = useMutationAccountsManage();
useOnceMountedOn(key, async () => {
  // run password reset
  passwordResetAccountID.value = get(
    await passwordReset(key.value, "122"),
    "status.id"
  );
});
watch(
  passwordResetAccountID,
  (uid) => {
    if (uid) timeoutLogout(3456);
  },
  {
    once: true,
  }
);

// @@eos
</script>
<template>
  <section class="page--auth-password-reset-form">
    <p v-if="passwordResetAccountID">
      Lozinka za nalog &lt;{{ email }}&gt; uspesno obnovljena.
    </p>
  </section>
</template>
<style lang="scss" scoped></style>
