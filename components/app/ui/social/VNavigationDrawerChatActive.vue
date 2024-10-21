<script setup lang="ts">
// ##imports
import { useDisplay } from "vuetify";
// import { Iconx } from "@/components/icons";
import {
  VBtnMenuTopicPublish,
  VDataIteratorRenderChatSimple,
} from "@/components/app";
// ##config
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{ title?: any; propsContainer?: any }>();
const DRAWER_WIDTH = 392;
// ##utils
const { smAndUp, width: VW } = useDisplay();
const { isActive, clear } = useGlobalVariableChatActive();
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
      class="ma-0 *pa-0"
      v-bind="propsContainer"
    >
      <div
        ref="ref_bsLbRm"
        class="__placer fill-height pb--nZVyISI0uNh4I scrollbar-thin overflow-auto"
      >
        <VCardTitle v-if="title || $slots.title">
          <slot name="title">
            {{ title }}
          </slot>
        </VCardTitle>
        <VCardText>
          <VDataIteratorRenderChatSimple @chat-messages-init="NTscrollBottom" />
        </VCardText>
      </div>
    </VCard>
    <span class="position-absolute top-0 end-0 z-[1]">
      <slot name="close" :clear="clear" :isActive="isActive">
        <VBtn @click="clear" icon="$close" variant="text" color="secondary">
          <slot name="close-icon">
            <VIcon icon="$close" size="large" />
          </slot>
        </VBtn>
      </slot>
    </span>
    <VBtnMenuTopicPublish @posted="scrollBottomIfEnd" />
  </VNavigationDrawer>
</template>
<style lang="scss" scoped>
.pb--nZVyISI0uNh4I {
  padding-bottom: 8.122rem !important;
}
</style>
