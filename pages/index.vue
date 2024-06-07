<script setup lang="ts">
import { ProvideTranslation } from "@/components/lang";
const { n, d, t, locale, setLocale } = useI18n();
const date = new Date();

// @@eos
</script>
<template>
  <section class="page--index">
    <NuxtLinkLocale to="/">index</NuxtLinkLocale> |
    <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    <hr />
    <ProvideTranslation
      :query="{ q: 'trees', target: locale }"
      v-slot="{ translation }"
    >
      <p class="text-body-1">{{ translation }}</p>
    </ProvideTranslation>
    <pre>{{ locale }}</pre>
    <pre>{{ t("message.homeAddress") }}</pre>
    <VBtn color="primary" @click="setLocale('sr-Latn-RS')">sr-Latn-RS</VBtn>
    <VBtn color="primary" @click="setLocale('sr-Cyrl-RS')">sr-Cyrl-RS</VBtn>
    <VBtn @click="setLocale('en')">en</VBtn>
    |
    <NuxtLinkLocale to="o-nama">o-nama</NuxtLinkLocale>
    <hr />
    <p>
      {{ t("message.welcome") }} | {{ d(date, "long") }} |
      {{ n(122333, "currency") }}
    </p>
  </section>
</template>
<style lang="scss" scoped></style>
