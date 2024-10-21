<script setup lang="ts">
// ##imports
import { VSheetChatItemSimple } from "@/components/app";
// ##config
const emit = defineEmits<{
  (e: "chatMessagesInit"): void;
}>();
// ##utils
// ##icons
// ##refs ##flags
// ##data ##auth ##state
const { chat, length: chatSize } = useDocsTopicChat();
// ##computed
// ##forms ##helpers ##handlers
const getkey_ = (node: any) => get(node, "raw.id");
// ##watch
useOnceMountedOn(chatSize, () => {
  emit("chatMessagesInit");
});
// ##hooks:lifecycle
// ##head

// @@eos
</script>
<template>
  <VDataIterator
    class="component--VListRenderChatSimple"
    :items="chat"
    :items-per-page="-1"
  >
    <template #no-data>
      <pre>no chat data</pre>
    </template>
    <template #default="{ items }">
      <div class="__spacer space-y-2">
        <template v-for="node in items" :key="getkey_(node)">
          <VSheetChatItemSimple :item="node.raw" />
        </template>
      </div>
    </template>
  </VDataIterator>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
