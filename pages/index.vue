<script setup lang="ts">
import { useDisplay } from "vuetify";
import { AuthLogin } from "@/components/app/auth";
import { Redirect } from "@/components/utils";

const { height: wh } = useDisplay();
// @@ss
const auth = useStoreApiAuth();
// @@eos
</script>
<template>
  <section class="page--index">
    <VResponsive
      v-if="!auth.isAuthenticated$"
      max-width="598"
      class="mx-auto -translate-y-[50%]"
      :style="`margin-top: ${wh / 2}px;`"
    >
      <AuthLogin />
    </VResponsive>
    <Redirect v-else :to="{ name: 'app' }" />
  </section>
</template>
<style lang="scss" scoped></style>
