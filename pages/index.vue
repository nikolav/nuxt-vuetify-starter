<script setup lang="ts">
import { Dump } from "@/components/dev";
import { ProvideTranslation } from "@/components/lang";

const { n, d, t, locale } = useI18n();
const setLocale_ = (value: string) => {
  locale.value = value;
};
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
        <VBtn color="primary" @click="setLocale_('sr-Latn-RS')"
          >sr-Latn-RS</VBtn
        >
        <VBtn color="primary" @click="setLocale_('sr-Cyrl-RS')"
          >sr-Cyrl-RS</VBtn
        >
        <VBtn @click="setLocale_('en')">en</VBtn>
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
            q: 'A menos que intentes hacer algo más allá de lo que ya dominas, nunca crecerás.',
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
