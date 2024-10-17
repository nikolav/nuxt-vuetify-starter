<script setup lang="ts">
// ##imports
import { ProvideUserProfile } from "@/components/app";
import { Iconx } from "@/components/icons";
// ##config
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{ uid: any; propsMenu?: any; propsSheet?: any }>();
const {
  app: { TOOLTIPS_OPEN_DELAY, DEFAULT_TRANSITION },
} = useAppConfig();
// ##utils
// ##icons
// ##refs
// ##state ##data ##auth
// ##computed
// ##forms ##helpers
// ##watch
// ##hooks:lifecycle

// @@eos
</script>
<template>
  <ProvideUserProfile :uid="uid" v-slot="{ profile }">
    <VBtn
      v-if="profile?.displayLocation"
      @click.stop
      class="component--VBtnShowLocation pa-0 ma-0"
      icon
      variant="plain"
      density="comfortable"
      size="small"
      color="secondary"
      v-bind="$attrs"
    >
      <slot name="icon">
        <Iconx size="1.22rem" icon="material-symbols:location-on" />
      </slot>
      <VMenu
        location="end center"
        :open-delay="TOOLTIPS_OPEN_DELAY"
        :transition="DEFAULT_TRANSITION"
        activator="parent"
        :close-on-content-click="false"
        v-bind="propsMenu"
      >
        <VSheet class="pa-1 px-2" v-bind="propsSheet">
          <slot name="location" :profile="profile">
            <span class="text-body-1">
              {{ profile.displayLocation }}
            </span>
          </slot>
        </VSheet>
      </VMenu>
    </VBtn>
  </ProvideUserProfile>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
