<script setup lang="ts">
// ##imports
import { Iconx } from "@/components/icons";
import { VMenuComposeChatMessage } from "@/components/app";
// ##config
const emit = defineEmits<{
  (e: "posted"): void;
}>();

// ##utils
const pc = useProcessMonitor();
const { isActive, topic } = useGlobalVariableChatActive();
// ##icons
// ##refs ##flags
const menuIsActive = ref();
const formResetID = useUniqueId();
// ##data ##auth ##state
const auth = useStoreApiAuth();
const { commit, loading } = useDocsTopicChat();
// ##computed
// ##forms ##helpers ##handlers
const onMessageSubmit = async (message: string) => {
  const msg = { message, uid: auth.uid, name: auth.displayName };
  try {
    pc.begin();
    if (!get(await commit(msg), "data.docsUpsert.id")) throw "--message-failed";
  } catch (error) {
    pc.setError(error);
  } finally {
    pc.done();
  }
  if (!pc.error.value) pc.successful();
};
// ##watch
watch(
  () => pc.success.value,
  (posted) => {
    if (posted) {
      formResetID();
      menuIsActive.value = false;
      emit("posted");
    }
  }
);
// ##hooks:lifecycle
// ##head

// @@eos
</script>
<template>
  <VSlideYReverseTransition>
    <VBtn
      v-if="isActive"
      color="on-surface"
      size="x-large"
      elevation="5"
      icon
      position="absolute"
      class="bottom-8 end-5 z-[1]"
    >
      <Iconx class="text-primary" size="1.82rem" icon="ion:paper-plane" />
      <VMenuComposeChatMessage
        v-model="menuIsActive"
        @message="onMessageSubmit"
        :loading="loading"
        :reset-id="formResetID.ID.value"
        :topic="topic"
      />
    </VBtn>
  </VSlideYReverseTransition>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
