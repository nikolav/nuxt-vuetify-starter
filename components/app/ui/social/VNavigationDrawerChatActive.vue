<script setup lang="ts">
// ##imports
import { useDisplay } from "vuetify";
import { Iconx } from "@/components/icons";
import {
  VBtnMenuTopicPublish,
  VDataIteratorRenderChatSimple,
  VToolbarPrimary,
} from "@/components/app";
// ##config
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{ title?: any; propsContainer?: any }>();
const DRAWER_WIDTH = 392;
const {
  layout: { toolbarMainHeight },
} = useAppConfig();
// ##utils
const { smAndUp, width: VW } = useDisplay();
const { isActive, clear, chatTitle } = useGlobalVariableChatActive();
const ref_bsLbRm = ref();
// ##store ##auth ##data
// ##helpers ##handlers
const onUpdateModelValue = (m: any) => {
  if (!m) clear();
};
const { scrollBottom: NTscrollBottom, scrollBottomIfEnd } = useScrollBottom(
  ref_bsLbRm,
  isActive
);
// @@eos
</script>
<template>
  <VNavigationDrawer
    id="ID--zb9iXWnMPouoeieK"
    :model-value="isActive"
    @update:model-value="onUpdateModelValue"
    :width="smAndUp ? DRAWER_WIDTH : VW"
    location="right"
    temporary
    class="component--VNavigationDrawerChatActive z-[1] *bg-red"
    v-bind="$attrs"
  >
    <VCard
      height="100vh"
      variant="text"
      rounded="0"
      class="ma-0 pa-0"
      v-bind="propsContainer"
    >
      <VToolbarPrimary
        :text="chatTitle"
        :props-title="{ class: 'text-start font-italic text-body-1' }"
        elevation="1"
        color="primary-lighten-1"
      >
        <template #prepend>
          <Iconx
            size="1.33rem"
            class="ms-2 me-1 opacity-20"
            icon="streamline:chat-two-bubbles-oval"
          />
        </template>
        <template #append>
          <VBtn
            @click="clear"
            density="comfortable"
            icon
            variant="plain"
            size="small"
          >
            <Iconx icon="$close" size="1.33rem" />
          </VBtn>
        </template>
      </VToolbarPrimary>
      <div
        ref="ref_bsLbRm"
        class="__placer pb--nZVyISI0uNh4I scrollbar-thin overflow-auto"
        :style="`height: calc(100% - ${toolbarMainHeight}px - 1px)`"
      >
        <VCardText>
          <VDataIteratorRenderChatSimple @chat-messages-init="NTscrollBottom" />
        </VCardText>
      </div>
    </VCard>
    <VBtnMenuTopicPublish @posted="scrollBottomIfEnd" />
  </VNavigationDrawer>
</template>
<style lang="scss" scoped>
.pb--nZVyISI0uNh4I {
  padding-bottom: 8.122rem !important;
}
</style>
