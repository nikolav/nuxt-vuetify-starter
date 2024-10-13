<script setup lang="ts">
import { VToolbarPrimary, VImgImagesPicker } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const imagesPicked = ref();
const { form, submit, valid, clear } = useFormDataFields(
  "la8cGSaxW4",
  {
    name: True,
    link: True,
    code: True,
    barcode: True,
  },
  {
    onSubmit: noop,
  }
);
const { commit } = useQueryManageAssetsProducts();
const ref_9yvgmhpVs9DnAXGuV5Hm = ref();
const { height: HMAX } = useElementSize(ref_9yvgmhpVs9DnAXGuV5Hm);
// @@eos
</script>
<template>
  <section class="page--aktiva-prodizvodi-nov">
    <VForm @submit.prevent="submit" autocomplete="off">
      <VCard variant="text" rounded="0">
        <VToolbarPrimary text="Dodaj artikle">
          <template #prepend>
            <Icon
              class="opacity-40 ms-1"
              size="1.5rem"
              name="mage:box-3d-plus"
            />
          </template>
        </VToolbarPrimary>
        <VCardText>
          <VContainer fluid max-width="892" class="mx-auto">
            <VRow>
              <VCol sm="6">
                <VImgImagesPicker
                  v-model="imagesPicked"
                  :container-props="{ height: HMAX }"
                />
              </VCol>
              <VCol sm="6">
                <div class="__sizer" ref="ref_9yvgmhpVs9DnAXGuV5Hm">
                  <VTextField
                    v-model.trim="form.name.value"
                    autofocus
                    clearable
                    variant="underlined"
                    label="Naziv *"
                  />
                  <VTextField
                    v-model.trim="form.code.value"
                    clearable
                    variant="underlined"
                    label="Šifra"
                  />
                  <VTextField
                    v-model.trim="form.barcode.value"
                    clearable
                    variant="underlined"
                    label="Barkod"
                  />
                  <VTextField
                    v-model.trim="form.link.value"
                    clearable
                    variant="underlined"
                    label="Link"
                  />
                </div>
                <VCardActions>
                  <VSpacer />
                  <VBtn>ok</VBtn>
                </VCardActions>
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped></style>
