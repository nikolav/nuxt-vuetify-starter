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
            class="ms-2 -rotate-[3deg]"
            size="4.55rem"
            icon="$iconFrikomLogo"
          />
        </NuxtLink>
      </template>
      <VSpacer v-if="!smAndUp" />
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
    </VAppBar>
    <!-- app:links -->
    <VNavigationDrawer
      :location="smAndUp ? 'end' : 'bottom'"
      rail
      permanent
      elevation="1"
      :class="[
        smAndUp ? 'pt-2' : undefined,
        smAndUp ? undefined : '*:flex *:justify-evenly',
      ]"
    >
      <VBtn
        v-for="n in 5"
        :class="[
          smAndUp && n < 5 ? `mb-2` : undefined,
          smAndUp ? 'd-block mx-auto' : undefined,
        ]"
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
