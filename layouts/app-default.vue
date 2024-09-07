<script setup lang="ts">
import { useDisplay } from "vuetify";

const auth = useStoreApiAuth();
const { smAndUp } = useDisplay();
const {
  app: { TOOLTIPS_OPEN_DELAY },
} = useAppConfig();

// @@eos
</script>
<template>
  <section class="layout--appDefault">
    <VAppBar elevation="1" density="comfortable">
      <template v-if="smAndUp" #prepend>
        <NuxtLink :to="{ name: 'index' }">
          <VIcon
            class="ms-2 -rotate-[2deg]"
            size="4.55rem"
            icon="$iconFrikomLogo"
          />
        </NuxtLink>
      </template>
      <div
        class="d-flex items-center gap-5 me-3"
        :class="smAndUp ? undefined : `mx-auto`"
      >
        <VBtn
          v-if="auth.isAuthenticated$"
          icon
          variant="plain"
          @click="auth.logout()"
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
    <!-- app:links -->
    <VNavigationDrawer
      location="end"
      rail
      permanent
      :rail-width="undefined"
      elevation="1"
      class="pt-1"
    >
      <VBtn
        v-for="n in 5"
        class="d-block mx-auto"
        :class="n < 5 ? `mb-2` : undefined"
        icon
        variant="text"
        :key="n"
        color="secondary-darken-2"
        >{{ n }}</VBtn
      >
    </VNavigationDrawer>
    <VMain>
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped></style>
