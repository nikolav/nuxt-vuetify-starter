<script setup lang="ts">
// 0e1ef4f7-59ba-5029-a73a-58d4854a4312
import {
  schemaAuthAccount,
  schemaAuthCredentialsWithPolicies,
} from "@/schemas";
import { VSnackbarSuccess, VSheetPinCodeRequired } from "@/components/app";

definePageMeta({
  middleware: "authorized",
  layout: "app-default",
});

const {
  layout: { toolbarMainHeight },
  app: { TOOLTIPS_OPEN_DELAY },
} = useAppConfig();

// @ref
const accountsAdded = ref();

// @data
const { add: accountsAdd } = useMutationAccountsManage();

// @flags
const togglePasswordIsVisible = useToggleFlag();
const toggleAccountCreated = useToggleFlag();

// @utils
const {
  form,
  valid,
  submit: submitAccountAdd,
  clear: formClear,
} = useFormDataFields(
  "l6xX6SYHp3UZRMnuW4q5",
  {
    email: true,
    password: true,
    policies: true,
  },
  {
    schema: schemaAuthCredentialsWithPolicies,
    onSubmit: async (data: any) => {
      try {
        accountsAdded.value = schemaAuthAccount.parse(
          get(await accountsAdd(data), "data.accountsAdd.status.account")
        );
      } catch (error) {
        accountsAdded.value = null;
        console.error(error);
      }
    },
  }
);

// @watch
onMounted(() => {
  watch(accountsAdded, (account: any) => {
    if (!account) return;
    toggleAccountCreated.on();
    formClear();
  });
});

// @handlers
const onCancel = formClear;

// @@eos
</script>
<template>
  <section class="page--nalog-nov">
    <VSnackbarSuccess
      v-model="toggleAccountCreated.isActive.value"
      id="ID--5fA7vgMWtjbmH"
    >
      Nalog je uspešno sačuvan.
    </VSnackbarSuccess>
    <VForm @submit.prevent autocomplete="off">
      <VCard rounded="t-0" variant="text">
        <VToolbar color="primary" :height="toolbarMainHeight" class="ps-3">
          <VToolbarTitle class="text-center font-italic text-body-1 opacity-50">
            Nov korisnički nalog
          </VToolbarTitle>
          <template #prepend>
            <Icon
              name="streamline:interface-user-add-actions-add-close-geometric-human-person-plus-single-up-user"
              class="opacity-30"
              size="1.25rem"
            />
            <VDivider vertical inset class="ms-3" />
          </template>
          <template #append>
            <NuxtLink :to="{ name: 'tim' }">
              <VBtn
                @click="onCancel"
                icon
                variant="plain"
                density="comfortable"
              >
                <VIcon icon="$close" size="small" />
                <VTooltip
                  :open-delay="TOOLTIPS_OPEN_DELAY"
                  text="Odustani"
                  location="bottom"
                  activator="parent"
                />
              </VBtn>
            </NuxtLink>
          </template>
        </VToolbar>
        <VCardText class="mt-3 max-w-[492px] mx-auto">
          <!-- @@eamil -->
          <VTextField
            rounded="pill"
            v-model.trim="form.email.value"
            variant="solo-filled"
            label="Email *"
            placeholder="korisnik@email.com"
            clearable
            single-line
            autofocus
          >
            <template #prepend-inner>
              <span class="ps-2" />
            </template>
          </VTextField>
          <!-- @@lozinka -->
          <VTextField
            rounded="pill"
            v-model.trim="form.password.value"
            variant="solo-filled"
            label="Lozinka *"
            :type="togglePasswordIsVisible.isActive.value ? 'text' : 'password'"
            clearable
            single-line
          >
            <template #prepend-inner>
              <span class="ps-2" />
            </template>
            <template #append-inner>
              <VBtn
                color="secondary"
                @click="togglePasswordIsVisible"
                icon
                variant="plain"
                density="comfortable"
              >
                <Icon
                  size="1.22rem"
                  :name="
                    togglePasswordIsVisible.isActive.value
                      ? 'mdi:eye'
                      : 'mdi:eye-off'
                  "
                />
              </VBtn>
            </template>
          </VTextField>
          <VSelect
            v-model="form.policies.value"
            label="Tip"
            closable-chips
            single-line
            chips
            rounded="pill"
            color="primary"
            variant="solo-filled"
            multiple
            :items="[
              {
                title: 'Administrator',
                value: 'admin',
              },
              {
                title: 'Menadžer',
                value: 'manager',
              },
              {
                title: 'Spoljni kontakt',
                value: 'external',
              },
            ]"
          >
            <template #prepend-inner>
              <span class="ps-2" />
            </template>
            <template #chip="{ item, props: props_ }">
              <VChip
                color="primary-darken-2"
                :text="item.raw.title"
                :value="item.raw.value"
                v-bind="props_"
              />
            </template>
          </VSelect>
        </VCardText>
        <VCardActions class="justify-center">
          <VBtn
            :disabled="!valid"
            class="px-5"
            rounded="pill"
            size="x-large"
            variant="elevated"
            :color="valid ? 'primary' : 'secondary'"
          >
            <VIcon start icon="$plus" class="opacity-50" size="large" />
            <span>Nov Nalog</span>
            <VMenu
              :close-on-content-click="false"
              activator="parent"
              location="center"
              v-slot="{ isActive }"
            >
              <VSheetPinCodeRequired message="Pin za aktivaciju naloga:">
                <template #actions="{ pin, text }">
                  <VBtn
                    type="submit"
                    @click="
                      submitAccountAdd().then(() => {
                        isActive.value = false;
                      })
                    "
                    class="px-4"
                    rounded="pill"
                    variant="elevated"
                    size="large"
                    :disabled="pin != text"
                  >
                    <Icon
                      name="streamline:interface-user-add-actions-add-close-geometric-human-person-plus-single-up-user"
                      size="1.22rem"
                      class="me-2 opacity-50"
                    />
                    <span>Aktiviraj Nalog</span>
                  </VBtn>
                </template>
              </VSheetPinCodeRequired>
            </VMenu>
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped></style>
<style lang="scss">
#ID--5fA7vgMWtjbmH .v-list-item__spacer {
  width: 1rem !important;
}
</style>
