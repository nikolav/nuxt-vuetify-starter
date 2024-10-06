<script setup lang="ts">
import { useDisplay } from "vuetify";
import { VBtnToggleVisible, VSnackbarSuccess } from "@/components/app";

// config, utils
const cardMaxWidth = 392;
const TIMEOUT_REDIRECT_LOGOUT = 5123;
const {
  app: { TOOLTIPS_OPEN_DELAY },
  layout: { toolbarMainHeight },
} = useAppConfig();
const route = useRoute();
const key = computed(() => get(route.query, "key"));

// refs
const passwordResetAccountID = ref();
const togglePasswordInput = useToggleFlag(true);
const inputType = computed(() =>
  togglePasswordInput.isActive.value ? "password" : "text"
);

// store, auth
const auth = useStoreApiAuth();
const timeoutLogout = useSetTimeout(auth.logout);
const { passwordReset, processing } = useMutationAccountsManage();
const { height: VHeight, width: VW } = useDisplay();

// helpers, forms
const { form, submit: submitPasswordReset } = useFormDataFields(
  "7chpiRlIfJFw",
  {
    password1: True,
    password2: True,
  },
  {
    onSubmit: async (fields) => {
      if (!passwordsMatch.value) return;
      if (!key.value) return;
      try {
        passwordResetAccountID.value = get(
          await passwordReset(key.value, fields.password1),
          "status.id"
        );
      } catch (error) {
        console.error(error);
      }
    },
  }
);
const passwordsMatch = computed(
  () =>
    form.password1.value &&
    form.password2.value &&
    form.password1.value === form.password2.value
);

// watchers
watch(
  passwordResetAccountID,
  (uid) => {
    if (uid) timeoutLogout(TIMEOUT_REDIRECT_LOGOUT);
  },
  {
    once: true,
  }
);

// @@eos
</script>
<template>
  <section
    class="page--auth-password-reset-form d-flex justify-center items-center"
    :style="`height: calc(${VHeight}px - 1px);`"
  >
    <VSnackbarSuccess
      :timeout="TIMEOUT_REDIRECT_LOGOUT"
      v-model="passwordResetAccountID"
    >
      <span>Lozinka je uspešno obnovljena.</span>
    </VSnackbarSuccess>
    <VForm @submit.prevent="submitPasswordReset" autocomplete="off">
      <VCard
        rounded="t-lg"
        :width="cardMaxWidth < VW ? cardMaxWidth : VW"
        class="mx-auto"
      >
        <VToolbar
          :height="toolbarMainHeight"
          elevation="0"
          color="primary-lighten-2"
        >
          <VToolbarTitle class="text-body-1 opacity-50 text-center"
            ><span>Nova lozinka</span></VToolbarTitle
          >
          <template #append>
            <NuxtLink :to="{ name: 'index' }">
              <VBtn density="comfortable" icon variant="plain">
                <VIcon size="1.25rem" icon="$close" />
                <VTooltip
                  activator="parent"
                  location="bottom"
                  text="Odustani"
                  :open-delay="TOOLTIPS_OPEN_DELAY"
                />
              </VBtn>
            </NuxtLink>
          </template>
          <template #prepend>
            <VIcon
              size="1.55rem"
              class="opacity-50"
              start
              icon="$iconAccountKey"
            />
            <VDivider vertical inset />
          </template>
        </VToolbar>
        <!-- @@fiields -->
        <VCardText class="pa-5">
          <VTextField
            :type="inputType"
            density="comfortable"
            v-model.trim="form.password1.value"
            label="Lozinka"
            variant="outlined"
            center-affix
            rounded="pill"
            clearable
            color="primary"
          >
            <template #prepend-inner>
              <Icon
                class="opacity-40 ms-1 me-2"
                size="1.55rem"
                name="material-symbols-light:key-rounded"
              />
            </template>
            <template #append-inner>
              <!-- @@ -->
              <VBtnToggleVisible
                v-model="togglePasswordInput.isActive.value"
                @click="togglePasswordInput"
              >
                <template #icon="{ icon }">
                  <Icon size="1.33rem" :name="icon" />
                </template>
              </VBtnToggleVisible>
            </template>
          </VTextField>
          <VTextField
            :type="inputType"
            density="comfortable"
            v-model.trim="form.password2.value"
            label="Lozinka ponovo"
            variant="outlined"
            center-affix
            rounded="pill"
            clearable
            color="primary"
          >
            <template #prepend-inner>
              <Icon
                class="opacity-40 ms-1 me-2"
                size="1.55rem"
                name="mdi:key-chain-variant"
              />
            </template>
          </VTextField>
        </VCardText>
        <VCardActions class="justify-center pb-7 *pe-5">
          <VBtn
            elevation="1"
            class="px-3"
            size="x-large"
            variant="tonal"
            rounded="pill"
            type="submit"
            :disabled="!(key && passwordsMatch) || processing"
          >
            <template #prepend>
              <Icon
                name="material-symbols:lock-reset-sharp"
                size="1.78rem"
                class="opacity-50"
              />
            </template>
            <span> Sačuvaj </span>
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped></style>
