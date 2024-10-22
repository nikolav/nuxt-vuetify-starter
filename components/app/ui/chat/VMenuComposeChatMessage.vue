<script setup lang="ts">
// ##imports
import { useDisplay } from "vuetify";
import { z } from "zod";
import { Iconx } from "@/components/icons";
// ##config
const props = defineProps<{
  loading?: boolean;
  resetId?: any;
  topic?: any;
}>();
const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
const emit = defineEmits<{
  (e: "message", msg: string): void;
}>();

// ##utils
const { smAndUp, width: VW } = useDisplay();
const schemaChatMessage = z.object({
  name: z.string().min(1),
  message: z.string().min(1),
});

// ##icons
// ##refs ##flags
const menuIsActive = defineModel<any>();
// ##data ##auth ##state
const auth = useStoreApiAuth();
// ##computed
// ##forms ##helpers ##handlers
const { submit, form, valid, clear } = useFormDataFields(
  `5bzJ7E9Dkx:${props.topic}`,
  {
    name: true,
    message: true,
  },
  {
    schema: schemaChatMessage,
    onSubmit: (data: any) => {
      // const msg = { ...data, uid: auth.uid, name: auth.displayName };
      emit("message", data.message);
      nextTick(clear);
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
watch(() => props.resetId, formReset);
// ##hooks:lifecycle
// ##head

// @@eos
</script>
<template>
  <VMenu
    activator="parent"
    location="top end"
    v-model="menuIsActive"
    :width="smAndUp ? 345 : VW"
    :transition="DEFAULT_TRANSITION"
    :close-on-content-click="false"
    :offset="22"
  >
    <VSheet :rounded="smAndUp ? 'lg ts-xl' : 'lg'" class="pa-3 ps-5">
      <VBtn
        @click="menuIsActive = false"
        variant="plain"
        color="secondary"
        icon="$close"
        position="absolute"
        class="top-1 end-1 z-[1]"
      />
      <VForm :disabled="loading" @submit.prevent="submit" autocomplete="off">
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
              class="opacity-20 me-1 -translate-y-px"
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
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
