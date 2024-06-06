<script setup lang="ts">
import { ProvideTranslation } from "@/components/lang";
const { n, d, t, setLocale, locale, locales } = useI18n();
const date = new Date();

// @@eos
</script>
<template>
  <section class="page--index">
    <ProvideTranslation
      :query="{ q: 'page', target: 'sr-Latn-RS' }"
      v-slot="{ translation }"
    >
      <VCardText>
        <p class="text-body-1">{{ translation }}</p>
      </VCardText>
    </ProvideTranslation>
    <pre>{{ locale }}</pre>
    <VBtn color="primary" @click="setLocale('sr-Latn-RS')">sr-Latn-RS</VBtn>
    <VBtn color="primary" @click="setLocale('sr-Cyrl-RS')">sr-Cyrl-RS</VBtn>
    <VBtn @click="setLocale('en')">en</VBtn>
    |
    <NuxtLinkLocale to="o-nama">o-nama</NuxtLinkLocale>
    <hr />
    <p>
      {{ t("message.welcome") }} | {{ d(date, "short") }} |
      {{ n(122333, "currency") }}
    </p>
    <hr />
    <VBtn @click="gtr">tr</VBtn>
  </section>
</template>
<style lang="scss" scoped></style>
