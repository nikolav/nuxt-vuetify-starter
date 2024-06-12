<script setup lang="ts">
import type { IAuthProfile } from "@/types";
import { Dump } from "@/components/dev";
import { UID } from "@/keys";

definePageMeta({
  layout: false,
});

const uid = inject(UID);

const { sendMail } = useSendMail();
const mail = async () => {
  const res = await sendMail({
    subject: "simple:subj",
    template: "simple",
    data: {
      text: "simple:text",
    },
  });
  console.log({ res });
};

// @@eos
</script>
<template>
  <section class="page--demo">
    <div class="d-flex items-center gap-5 justify-center ma-2">
      <NuxtLinkLocale to="/">index</NuxtLinkLocale>
      <NuxtLinkLocale to="o-nama">o-nama</NuxtLinkLocale>
      <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    </div>
    <hr />
    <VBtn @click="mail">mail</VBtn>
  </section>
</template>
<style lang="scss" scoped></style>
