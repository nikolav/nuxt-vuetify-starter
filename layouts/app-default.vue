<script setup lang="ts">
import { useDisplay } from "vuetify";
import { AppNavigationButtons } from "@/components/app";

const auth = useStoreApiAuth();
const route = useRoute();
const { smAndUp } = useDisplay();
const {
  app: { TOOLTIPS_OPEN_DELAY, MODE_DEBUG },
} = useAppConfig();

const { ID_subnav, hasNavSecondary, sidebarMainHeight } = useSidebarMenu();

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
        v-if="MODE_DEBUG"
        size="small"
        rounded="pill"
        :to="{ name: 'demo' }"
        variant="plain"
        >demo</VBtn
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
          text="Kraj"
          :open-delay="TOOLTIPS_OPEN_DELAY"
        />
      </VBtn>
    </VAppBar>
    <!-- nav primary -->
    <!-- app:links -->
    <VNavigationDrawer
      :id="ID_subnav"
      :location="smAndUp ? 'end' : 'bottom'"
      :floating="hasNavSecondary"
      :border="hasNavSecondary ? 0 : undefined"
      elevation="0"
      rail
      permanent
      :class="[
        smAndUp ? 'pt-2' : undefined,
        smAndUp ? undefined : '*:flex *:justify-evenly',
      ]"
    >
      <AppNavigationButtons />
    </VNavigationDrawer>
    <!-- nav secondary -->
    <VNavigationDrawer
      v-if="hasNavSecondary"
      :location="smAndUp ? 'end' : 'bottom'"
      :style="
        smAndUp ? undefined : `bottom: ${sidebarMainHeight}px !important;`
      "
      elevation="0"
      rail
      permanent
      :class="[
        'opacity-90',
        smAndUp ? 'pt-2' : undefined,
        smAndUp ? undefined : '*:flex *:justify-evenly',
      ]"
    >
      <AppNavigationButtons :key="route.fullPath" subnav />
    </VNavigationDrawer>
    <VMain>
      <slot />
    </VMain>
  </section>
</template>
<style lang="scss" scoped></style>
