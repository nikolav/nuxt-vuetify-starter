<script setup lang="ts">
import { useDisplay } from "vuetify";
import { AppNavigationButtons } from "@/components/app";

const auth = useStoreApiAuth();
const route = useRoute();
const { smAndUp } = useDisplay();
const {
  app: { TOOLTIPS_OPEN_DELAY, MODE_DEBUG, DEFAULT_TRANSITION },
} = useAppConfig();

const { ID_subnav, hasNavSecondary, sidebarMainHeight, appBarTitle } =
  useSidebarMenu();

// @@eos
</script>
<template>
  <section class="layout--appDefault">
    <VAppBar elevation="1" density="comfortable">
      <!-- @@logo -->
      <template #prepend>
        <NuxtLink :to="{ name: 'index' }">
          <VIcon
            class="ms-2 -rotate-[3deg]"
            :class="[smAndUp ? undefined : 'scale-[91%]']"
            size="4.55rem"
            icon="$iconFrikomLogo"
          />
        </NuxtLink>
      </template>
      <VAppBarTitle
        v-if="appBarTitle"
        class="ms-1 font-italic font-weight-thin text-body-1 text-primary"
        >{{ appBarTitle }}</VAppBarTitle
      >
      <VSpacer v-if="!smAndUp" />
      <VBtn
        v-if="MODE_DEBUG"
        size="small"
        rounded="pill"
        :to="{ name: 'demo' }"
        variant="plain"
        >demo</VBtn
      >
      <VBtn size="large" density="comfortable" icon variant="plain">
        <Icon size="1.55rem" name="mdi:dots-vertical" />
        <VMenu
          :transition="DEFAULT_TRANSITION"
          activator="parent"
          location="bottom end"
        >
          <VList
            variant="plain"
            class="py-0"
            lines="one"
            density="comfortable"
            min-width="192"
          >
            <!-- item:account -->
            <VListItem :to="{ name: 'nalog' }" value="Moj nalog" class="ps-3">
              <template #prepend>
                <Icon size="1.44rem" name="material-symbols:account-circle" />
              </template>
              <VListItemTitle class="ps-4">Moj nalog</VListItemTitle>
            </VListItem>
            <!-- spacer -->
            <VDivider opacity="100" class="mt-2" />
            <!-- item:logout -->
            <VListItem @click="auth.logout" value="Kraj" class="ps-3">
              <template #prepend>
                <Icon size="1.25rem" name="tdesign:poweroff" />
              </template>
              <VListItemTitle class="ps-4">Kraj</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
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
