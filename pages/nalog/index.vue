<script setup lang="ts">
import {
  VSheetPinCodeRequired,
  VBtnUpdateProfileImage,
  VSelectAvailabilityPicker,
} from "@/components/app";

definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const {
  layout: { toolbarMainHeight },
} = useAppConfig();

const auth = useStoreApiAuth();
const emailVerified = computed(() => get(auth.user$, "email_verified"));
const displayLocation$ = computed(() =>
  get(auth.user$, "profile.displayLocation")
);

const FIELDS = [
  "firstName",
  "lastName",
  "phone",
  "address",
  "displayName",
  "displayLocation",
];
const toggleDisplayLocation = useToggleFlag(!!displayLocation$.value);
const {
  profilePatch,
  emailSendVerifyLink,
  passwordSendResetLink,
  drop: accountDrop,
  processing: formProcessing,
} = useMutationAccountsManage();
const accountDropHardLogout = () =>
  accountDrop(auth.uid).then(() => reloadNuxtApp({ path: "/", ttl: 1 }));
const { form, submit, valid } = useFormDataFields(
  "tLgA7XGp8",

  // { [field: string]: active:boolean }
  FIELDS.reduce((accum, field) => {
    accum[field] = true;
    return accum;
  }, <Record<string, boolean>>{}),

  {
    onSubmit: async (data: any) => {
      const patch = transform(
        data,
        (accum, value, field) => {
          if (null != value) {
            if ("displayLocation" == field) {
              accum["displayLocation"] = toggleDisplayLocation.isActive.value
                ? value
                : "";
            } else {
              accum[String(field)] = value;
            }
          }
        },
        <any>{}
      );
      if (!isEmpty(patch)) await profilePatch(auth.uid, patch);
    },
  }
);

// @utils
const restoreFormFieldsFromStore = () => {
  FIELDS.forEach((field) => {
    form[field].value = get(auth.profile, field);
  });
};

// @watch
onMounted(() => {
  watch(
    () => auth.profile,
    (profile) => {
      if (profile) restoreFormFieldsFromStore();
    },
    {
      immediate: true,
    }
  );
});

// @@eos
</script>
<template>
  <section class="page--nalog">
    <VForm @submit.prevent="submit" autocomplete="off">
      <VCard rounded="0" variant="text">
        <VToolbar :height="toolbarMainHeight" color="primary" class="ps-3">
          <template #prepend>
            <Icon
              name="streamline:interface-user-edit-actions-close-edit-geometric-human-pencil-person-single-up-user-write"
              size="1.25rem"
              class="opacity-30"
            />
            <VDivider vertical inset class="ms-3" />
          </template>
        </VToolbar>
        <VCardText class="max-w-[345px] mx-auto">
          <VRow justify="center" class="translate-y-1">
            <VBtnUpdateProfileImage />
          </VRow>
          <div class="*space-y-2 mt-3">
            <VSpacer class="mt-9" />
            <!-- @@availability -->
            <VSelectAvailabilityPicker />

            <VTextField
              v-model.trim="form.firstName.value"
              density="comfortable"
              label="Ime"
              variant="underlined"
            />
            <VTextField
              v-model.trim="form.lastName.value"
              density="comfortable"
              label="Prezime"
              variant="underlined"
            />
            <VTextField
              v-model.trim="form.phone.value"
              density="comfortable"
              label="Telefon"
              variant="underlined"
            />
            <VTextField
              v-model.trim="form.address.value"
              density="comfortable"
              label="Adresa stanovanja"
              variant="underlined"
            />
            <VTextField
              v-model.trim="form.displayName.value"
              density="comfortable"
              label="Korisničko ime"
              variant="underlined"
            />
            <VSpacer class="mt-2" />
            <VCheckboxBtn
              v-model="toggleDisplayLocation.isActive.value"
              label="Deli moju lokaciju"
              class="mx-auto"
              color="primary-darken-1"
            />
            <VSlideYReverseTransition>
              <VTextField
                v-if="toggleDisplayLocation.isActive.value"
                v-model.trim="form.displayLocation.value"
                density="comfortable"
                variant="underlined"
                single-line
                placeholder="Lokacija"
                clearable
              >
              </VTextField>
            </VSlideYReverseTransition>
          </div>
        </VCardText>

        <VCardActions class="justify-evenly max-w-[345px] mx-auto pt-5">
          <VBtn
            rounded="pill"
            variant="plain"
            color="secondary"
            @click="restoreFormFieldsFromStore"
          >
            <Icon size="1.22rem" name="jam:rubber" class="me-2 opacity-50" />
            <span>Poništi</span></VBtn
          >
          <VBtn
            :disabled="!valid || formProcessing"
            class="px-4"
            size="large"
            rounded="pill"
            variant="tonal"
            type="submit"
            elevation="1"
          >
            <Icon
              class="me-2 opacity-50"
              size="1.22rem"
              name="material-symbols:save"
            />
            <span>Sačvaj</span>
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
    <VDivider class="border-opacity-100 mt-8 w-[75%] mx-auto" />
    <div class="d-flex flex-col max-w-fit mx-auto space-y-5 pt-5 pb-12">
      <VBtn
        v-if="!emailVerified"
        @click="emailSendVerifyLink"
        size="large"
        variant="tonal"
        rounded="pill"
        class="px-5"
        color="warning-darken-1"
        elevation="1"
        >Potvrdi email</VBtn
      >
      <VBtn
        elevation="1"
        color="error"
        size="large"
        variant="tonal"
        rounded="pill"
        class="px-5"
      >
        <span>Promena lozinke</span>
        <VMenu
          :close-on-content-click="false"
          activator="parent"
          location="center"
        >
          <template #default="{ isActive }">
            <VSheetPinCodeRequired>
              <template #actions="{ pin, text }">
                <VBtn
                  @click="
                    passwordSendResetLink().then(() => {
                      isActive.value = false;
                    })
                  "
                  variant="tonal"
                  class="px-4"
                  rounded="pill"
                  size="large"
                  :disabled="pin != text"
                  elevation="1"
                >
                  <Icon
                    name="material-symbols:lock-reset-sharp"
                    size="1.78rem"
                    class="me-2"
                  />
                  <span> Obnova lozinke </span>
                </VBtn>
              </template>
            </VSheetPinCodeRequired>
          </template>
        </VMenu>
      </VBtn>
      <VDivider class="mt-8" />
      <VBtn
        size="large"
        class="px-5 !scale-[85%] opacity-60"
        color="error"
        rounded="pill"
      >
        <span> Brisanje naloga </span>
        <VMenu
          activator="parent"
          location="center"
          :close-on-content-click="false"
        >
          <template #default>
            <VSheetPinCodeRequired message="Pin za brisaje naloga:">
              <template #actions="{ pin, text }">
                <VBtn
                  @click="accountDropHardLogout"
                  color="error"
                  class="px-4"
                  rounded="pill"
                  size="large"
                  :disabled="pin != text"
                >
                  <Icon
                    size="1.55rem"
                    class="me-2 -translate-y-[2px]"
                    name="material-symbols:delete"
                  />
                  <span>Obriši nalog</span>
                </VBtn>
              </template>
            </VSheetPinCodeRequired>
          </template>
        </VMenu>
      </VBtn>
    </div>
  </section>
</template>
<style lang="scss" scoped></style>
