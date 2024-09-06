<script setup lang="ts">
import { useDisplay } from "vuetify";

const auth = useStoreApiAuth();
const { sm } = useDisplay();
const {
  app: { TOOLTIPS_OPEN_DELAY },
} = useAppConfig();

// @@eos
</script>
<template>
  <section class="layout--default">
    <VAppBar elevation="1" density="comfortable">
      <template v-if="sm" #prepend>
        <VIcon class="ms-1 -rotate-[2deg]" size="4rem" icon="$iconFrikomLogo" />
      </template>
      <div
        class="d-flex items-center gap-5 me-3"
        :class="sm ? undefined : `mx-auto`"
      >
        <VBtn
          v-if="auth.isAuthenticated$"
          icon
          variant="plain"
          @click="auth.logout()"
          density="comfortable"
        >
          <Icon size="1.22rem" name="ri:shut-down-line" />
          <VTooltip
            activator="parent"
            location="bottom"
            text="Odjava"
            :open-delay="TOOLTIPS_OPEN_DELAY"
          />
        </VBtn>
      </div>
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped></style>
