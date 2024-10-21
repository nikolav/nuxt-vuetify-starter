<script setup lang="ts">
// ##imports
import { useDisplay } from "vuetify";
import { Iconx } from "@/components/icons";
import { z } from "zod";
// ##config
const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
const emit = defineEmits<{
  (e: "posted"): void;
}>();

// ##utils
const pc = useProcessMonitor();
const schemaChatMessage = z.object({
  name: z.string().min(1),
  message: z.string().min(1),
});
const { smAndUp, width: VW } = useDisplay();
const { isActive, topic } = useGlobalVariableChatActive();
// ##icons
// ##refs ##flags
const uid = inject(key_UID);
const menuIsActive = ref();
// ##data ##auth ##state
const auth = useStoreApiAuth();
const { commit, loading } = useDocsTopicChat();
// ##computed
// ##forms ##helpers ##handlers
const { submit, form, valid } = useFormDataFields(
  `MY4Ob3T:${topic.value}`,
  {
    name: true,
    message: true,
  },
  {
    schema: schemaChatMessage,
    onSubmit: async (data: any) => {
      const msg = { ...data, uid: uid?.value, name: auth.displayName };
      try {
        pc.begin();
        if (!get(await commit(msg), "data.docsUpsert.id"))
          throw "--message-failed";
      } catch (error) {
        pc.setError(error);
      } finally {
        pc.done();
      }
      if (!pc.error.value) pc.successful();
    },
  }
);
const formReset = () => {
  form.message.value = undefined;
};
// ##watch
watchEffect(() => {
  form.name.value = auth.displayName;
});
watch(
  () => pc.success.value,
  (posted) => {
    if (posted) {
      formReset();
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
      <Iconx
        class="text-primary-darken-1"
        size="1.82rem"
        icon="ion:paper-plane"
      />
      <VMenu
        v-model="menuIsActive"
        :width="smAndUp ? 312 : VW"
        activator="parent"
        location="top end"
        :transition="DEFAULT_TRANSITION"
        :close-on-content-click="false"
        :offset="22"
      >
        <VSheet rounded="lg" class="pa-3">
          <VForm
            :disabled="loading"
            @submit.prevent="submit"
            autocomplete="off"
          >
            <VTextField
              v-model.trim="auth.displayName"
              placeholder="Korisnik"
              variant="plain"
              class="opacity-75"
            >
              <template #prepend-inner>
                <Iconx
                  size="1.25rem"
                  icon="ri:user-line"
                  class="opacity-20 me-1"
                />
              </template>
            </VTextField>
            <VTextarea
              v-model.trim="form.message.value"
              autofocus
              placeholder="Poruka..."
              variant="plain"
              clearable
            />
            <VCardActions>
              <VSpacer />
              <VBtn
                type="submit"
                :disabled="!valid"
                size="large"
                rounded="pill"
                variant="elevated"
                >ok</VBtn
              >
            </VCardActions>
          </VForm>
        </VSheet>
      </VMenu>
    </VBtn>
  </VSlideYReverseTransition>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
