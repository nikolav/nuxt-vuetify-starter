<script setup lang="ts">
import { authLoginCreds } from "@/schemas";
const auth = useStoreApiAuth();
const toggleIsHiddenPassword = useToggleFlag(true);
const iconNameShowHidePassword = computed(() =>
  toggleIsHiddenPassword.isActive.value
    ? "icon-park-outline:preview-open"
    : "icon-park-outline:preview-close-one"
);

const {
  form,
  submit: authSubmit,
  valid: authValid,
} = useFormDataFields(
  "MwPg4rGKHOPOSK",
  {
    creds: (value) => authLoginCreds.safeParse(value).success,
  },
  {
    onSubmit: async (data) => {
      const [email, password] = String(data.creds).split(":");
      await auth.login({ email, password });
    },
  }
);

const {
  vars: { FLAG_SHOW_AUTH_BACKGROUND },
} = useAppConfig();
const authBgActive = useState(FLAG_SHOW_AUTH_BACKGROUND);
onMounted(() => {
  authBgActive.value = true;
});
onUnmounted(() => {
  authBgActive.value = false;
});
// @@eos
</script>
<template>
  <VForm id="ID--WtXCbXD" @submit.prevent="authSubmit" autocomplete="off">
    <VTextField
      center-affix
      autofocus
      class="px-[2px]"
      rounded="s-pill"
      variant="solo-filled"
      name="creds"
      v-model.trim="form.creds.value"
      placeholder="korisnik@email.com:lozinka"
      clearable
      :type="toggleIsHiddenPassword.isActive.value ? 'password' : 'text'"
    >
      <template #append>
        <VBtn
          :color="authValid ? 'primary' : 'seconary'"
          :disabled="!authValid"
          elevation="2"
          variant="elevated"
          size="large"
          icon
          type="submit"
          class="fill-height"
          rounded="e-pill"
        >
          <Icon
            class="-translate-x-px opacity-60"
            size="1.55rem"
            name="material-symbols:lock-open-rounded"
          />
        </VBtn>
      </template>
      <template #prepend-inner>
        <Icon
          class="opacity-40 ms-1 me-2"
          size="1.55rem"
          name="material-symbols-light:key-rounded"
        />
      </template>
      <template #append-inner>
        <VBtn
          density="comfortable"
          variant="plain"
          icon
          class="translate-x-[.33rem]"
          color="secondary"
          @click.stop="toggleIsHiddenPassword"
        >
          <Icon
            size="1.22rem"
            class="*opacity-60"
            :name="iconNameShowHidePassword"
          />
        </VBtn>
      </template>
    </VTextField>
  </VForm>
</template>
<style lang="scss" scoped></style>
<style lang="scss">
#ID--WtXCbXD .v-input__append {
  margin-inline-start: -1px !important;
}
</style>
