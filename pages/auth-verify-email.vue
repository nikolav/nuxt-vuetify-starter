<script setup lang="ts">
// import { isEmail } from "validator";
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
    <div
      class="position-fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
    >
      <VFadeTransition mode="out-in">
        <p v-if="!emailVerified" class="text-center text-h5 opacity-60">
          <strong>📤</strong> provera email adrese
        </p>
        <VEmptyState v-else title="Email adresa je uspešno potvrđena.">
          <template #media>
            <Icon
              class="text-success-darken-1"
              size="4rem"
              name="simple-icons:mailboxdotorg"
            />
          </template>
          <template #headline>
            <span class="text-no-wrap">
              <VIcon
                color="success-darken-1"
                size="2.22rem"
                start
                icon="$complete"
              />
              <span class="opacity-60 text-h5">{{ emailVerified }}</span>
            </span>
          </template>
        </VEmptyState>
      </VFadeTransition>
    </div>
    <NuxtLink
      v-if="emailVerified"
      class="position-fixed top-4 left-4"
      :to="{ name: 'index' }"
    >
      <VBtn color="white" icon size="x-large">
        <VIcon icon="$prev" size="x-large" />
      </VBtn>
    </NuxtLink>
  </section>
</template>
<style lang="scss" scoped></style>
