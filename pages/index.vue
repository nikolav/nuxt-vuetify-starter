<script setup lang="ts">
import { Dump } from "@/components/dev";
const { n, d, t, locale, setLocale } = useI18n();
const date = new Date();
const auth = useStoreApiAuth();
const authAdmin = async () =>
  await auth.login({
    email: "admin@nikolav.rs",
    password: "5ba8de29-93bb-5bc2-9e03-b1a8c7c6737b",
  });

// @@eos
</script>
<template>
  <section class="page--index">
    <div class="d-flex items-center gap-5 justify-center ma-2">
      <NuxtLinkLocale to="/">index</NuxtLinkLocale>
      <NuxtLinkLocale to="o-nama">o-nama</NuxtLinkLocale>
      <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    </div>
    <hr />
    <VCard max-width="640" class="mx-auto">
      <VCardActions>
        <VBtn color="primary" @click="setLocale('sr-Latn-RS')">sr-Latn-RS</VBtn>
        <VBtn color="primary" @click="setLocale('sr-Cyrl-RS')">sr-Cyrl-RS</VBtn>
        <VBtn @click="setLocale('en')">en</VBtn>
      </VCardActions>
      <VCardText>
        <pre>{{ locale }}</pre>
        <pre>{{ t("message.homeAddress") }}</pre>
        <p>
          {{ t("message.welcome") }} | {{ d(date, "long") }} |
          {{ n(122333, "currency") }}
        </p>
        <Dump :data="{ user: auth.user$ }" />
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="authAdmin">login</VBtn>
      </VCardActions>
    </VCard>
  </section>
</template>
<style lang="scss" scoped></style>
