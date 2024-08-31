<script setup lang="ts">
import { Dump } from "@/components/dev";
import { ProvideTranslation } from "@/components/lang";
import {
  langCodeEn,
  langCodeSrLatn,
  langCodeSrCyr,
} from "@/config/i18n.lang-codes";

//
const { n, d, t, locale } = useI18n();
const setLocale_ = useI18NSetLocale();

const date = new Date();
const auth = useStoreApiAuth();
const authAdmin = async () =>
  await auth.login({
    email: "admin@nikolav.rs",
    password: "5ba8de29-93bb-5bc2-9e03-b1a8c7c6737b",
  });

const { data: dataApiStatus } = useFetchApiStatus();
const { status: graphqlStatus } = useQueryGraphqlStatus();

// @@eos
</script>
<template>
  <section class="page--index">
    <VCard max-width="640" class="mx-auto">
      <VCardActions>
        <VBtn color="primary" @click="setLocale_(langCodeSrLatn)"
          >sr-Latn-RS</VBtn
        >
        <VBtn color="primary" @click="setLocale_(langCodeSrCyr)"
          >sr-Cyrl-RS</VBtn
        >
        <VBtn @click="setLocale_(langCodeEn)">en</VBtn>
      </VCardActions>
      <VCardText>
        <pre>{{ locale }}</pre>
        <pre>{{ t("message.homeAddress") }}</pre>
        <p>
          {{ t("message.welcome") }} | {{ d(date, "long") }} |
          {{ n(122333, "currency") }}
        </p>
        <ProvideTranslation
          :query="{
            q: 'Ne laissez pas le bruit des opinions des autres étouffer votre propre voix intérieure. Ayez le courage de suivre votre cœur et votre intuition.',
            target: locale,
          }"
          v-slot="{ translation }"
        >
          <small>--</small>
          <p>{{ translation }}</p>
          <small>--</small>
        </ProvideTranslation>
        <Dump
          :data="{
            user: auth.user$,
            dataApiStatus,
            graphqlStatus,
          }"
        />
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="authAdmin">login</VBtn>
        <VBtn @click="auth.logout()">logout</VBtn>
      </VCardActions>
    </VCard>
  </section>
</template>
<style lang="scss" scoped></style>
