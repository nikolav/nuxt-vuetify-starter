<script setup lang="ts">
import {
  VToolbarPrimary,
  VImgImagesPicker,
  VSnackbarSuccess,
  VBtnSave,
  VBtnReset,
} from "@/components/app";
import { schemaAssetsInput as si } from "@/schemas";
import { Iconx } from "@/components/icons";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();

const toggleSuccessCommit = useToggleFlag();
const imagesPicked = ref();
const AID = ref();

const { firebasePathAssets } = useTopics();
const { upload: fbsUpload } = useFirebaseStorage(() =>
  firebasePathAssets(AID.value)
);
const { commit } = useQueryManageAssetsProducts();

const pc = useProcessMonitor();
const { watchProcessing } = useStoreAppProcessing();
watchProcessing(() => pc.processing.value);

const { categories_select_menu } = useCategoryAssets();
const FIELDS_RECORD = ["name", "code", "notes"];
const FIELDS_RECORD_wcategory = [...FIELDS_RECORD, "category"];
const {
  form,
  submit,
  clear: formClear,
  valid: formValid,
} = useFormDataFields(
  "la8cGSaxW4",
  {
    name: true,
    link: true,
    code: true,
    barcode: true,
    notes: true,
    category: true,
  },
  {
    schema: si.pick({ name: true }).passthrough(),
    onSubmit: async (data) => {
      AID.value = undefined;
      toggleSuccessCommit.off();
      pc.begin();
      try {
        const d = assign(pick(data, FIELDS_RECORD_wcategory), {
          data: omit(data, FIELDS_RECORD_wcategory),
        });
        AID.value = get(await commit(d), "data.assetsUpsert.status.asset.id");
        if (!AID.value) throw "--no-asset-saved";
        if (!isEmpty(imagesPicked.value)) {
          await fbsUpload(
            reduce(
              imagesPicked.value,
              (accum, item) => {
                accum[item.file.name] = { file: item.file };
                return accum;
              },
              <Record<string, any>>{}
            )
          );
        }
      } catch (error) {
        //
        pc.setError(error);
      } finally {
        pc.done();
      }
      if (!pc.error.value) pc.successful();
    },
  }
);

const KEY_ImagesCleared = useUniqueId();
const formReset = () => {
  formClear();
  KEY_ImagesCleared();
};

onMounted(() => {
  watch(pc.success, (success_) => {
    if (!success_) return;
    toggleSuccessCommit.on();
    formReset();
  });
});

//
const ref_9yvgmhpVs9DnAXGuV5Hm = ref();
const { width: WSELECT } = useElementSize(ref_9yvgmhpVs9DnAXGuV5Hm);
// @@eos
</script>
<template>
  <section class="page--aktiva-prodizvodi-nov">
    <VSnackbarSuccess v-model="toggleSuccessCommit.isActive.value">
      <NuxtLink :to="{ name: 'aktiva-proizvodi-pid', params: { pid: AID } }">
        <a class="text-decoration-underline text-body-1 underline-offset-[6px]"
          >📄 Proizvod je uspešno sačuvan.
        </a>
      </NuxtLink>
    </VSnackbarSuccess>
    <VForm @submit.prevent="submit" autocomplete="off">
      <VCard :disabled="pc.processing.value" variant="text" rounded="0">
        <VToolbarPrimary
          :props-title="{ class: 'font-italic text-body-1' }"
          text="Ulistaj proizvod"
        >
          <template #prepend>
            <Icon
              class="opacity-40 ms-1"
              size="1.5rem"
              name="mage:box-3d-plus"
            />
          </template>
        </VToolbarPrimary>
        <VCardText>
          <VContainer fluid max-width="812" class="mx-auto">
            <VRow>
              <VCol sm="6">
                <VImgImagesPicker
                  v-model="imagesPicked"
                  :key-images-cleared="KEY_ImagesCleared.ID.value"
                  :props-container="{
                    height: 255,
                  }"
                />
              </VCol>
              <VCol sm="6">
                <div class="__sizer" ref="ref_9yvgmhpVs9DnAXGuV5Hm">
                  <VTextField
                    v-model.trim="form.name.value"
                    autofocus
                    clearable
                    variant="underlined"
                  >
                    <template #prepend-inner>
                      <Iconx
                        size="1rem"
                        class="opacity-20 translate-y-[2px] me-1"
                        icon="mdi:tag"
                      />
                    </template>
                    <template #label>
                      <span>Naziv </span><span class="text-error">*</span>
                    </template>
                  </VTextField>
                  <VSelect
                    v-model="form.category.value"
                    class="px-5 mt-2"
                    rounded="pill"
                    variant="solo-filled"
                    :items="categories_select_menu"
                    :transition="DEFAULT_TRANSITION"
                    :menu-props="{
                      location: 'center',
                      width: WSELECT,
                    }"
                    :list-props="{
                      class: 'py-0',
                      density: 'compact',
                    }"
                  >
                    <template #label>
                      <span class="d-flex items-center">
                        <Iconx
                          size=".82rem"
                          class="opacity-50 me-2"
                          icon="mdi:folder"
                        />
                        <span>Robna grupa</span>
                        <span class="text-error">&nbsp;*</span>
                      </span>
                    </template>
                    <template #prepend-inner>
                      <pre class="__spacer me-2" />
                    </template>
                  </VSelect>
                  <VTextField
                    v-model.trim="form.code.value"
                    clearable
                    variant="underlined"
                    label="Šifra"
                  >
                    <template #prepend-inner>
                      <Iconx
                        size="1rem"
                        class="opacity-20 me-1 translate-y-[2px]"
                        icon="ri:hashtag"
                      />
                    </template>
                  </VTextField>
                  <VTextField
                    v-model.trim="form.barcode.value"
                    clearable
                    variant="underlined"
                    label="Barkod"
                  >
                    <template #prepend-inner>
                      <Iconx
                        size="1rem"
                        class="opacity-20 me-1 translate-y-[2px]"
                        icon="material-symbols:barcode"
                      />
                    </template>
                  </VTextField>
                  <VTextField
                    v-model.trim="form.link.value"
                    clearable
                    variant="underlined"
                    label="Link"
                  >
                    <template #prepend-inner>
                      <Iconx
                        size="1rem"
                        class="opacity-20 me-1 translate-y-[2px]"
                        icon="material-symbols:link-rounded"
                      />
                    </template>
                  </VTextField>
                  <VTextarea
                    v-model.trim="form.notes.value"
                    clearable
                    variant="underlined"
                    label="Opis"
                    rows="4"
                  >
                    <template #prepend-inner>
                      <Iconx
                        size="1rem"
                        class="opacity-20 me-1 translate-y-[2px]"
                        icon="$edit"
                      />
                    </template>
                  </VTextarea>
                </div>
                <VCardActions class="mt-6 *pa-6">
                  <VBtnReset @click="formReset()" />
                  <VSpacer />
                  <VBtnSave
                    type="submit"
                    :disabled="pc.processing.value || !formValid"
                  />
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
