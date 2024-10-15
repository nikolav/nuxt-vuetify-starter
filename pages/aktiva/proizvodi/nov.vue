<script setup lang="ts">
import {
  VToolbarPrimary,
  VImgImagesPicker,
  VSnackbarSuccess,
} from "@/components/app";
import { schemaAssetsInput as si } from "@/schemas";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

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

const {
  form,
  submit,
  clear: formClear,
} = useFormDataFields(
  "la8cGSaxW4",
  {
    name: True,
    link: True,
    code: True,
    barcode: True,
  },
  {
    onSubmit: async (data) => {
      AID.value = undefined;
      toggleSuccessCommit.off();
      pc.begin();
      try {
        const d = assign(si.pick({ name: true, code: true }).parse(data), {
          data: si.omit({ name: true, code: true }).parse(data),
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
const { height: HMAX } = useElementSize(ref_9yvgmhpVs9DnAXGuV5Hm);
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
          <VContainer fluid max-width="812" class="mx-auto">
            <VRow>
              <VCol sm="6">
                <VImgImagesPicker
                  v-model="imagesPicked"
                  :key-images-cleared="KEY_ImagesCleared.ID.value"
                  :props-container="{
                    height: HMAX,
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
                <VCardActions class="mt-6 *pa-6">
                  <VBtn
                    @click="formReset()"
                    color="secondary"
                    variant="plain"
                    rounded="pill"
                    class="px-3"
                  >
                    <VIcon size="large" icon="$close" start />
                    <span> Poništi </span>
                  </VBtn>
                  <VSpacer />
                  <VBtn
                    elevation="1"
                    size="large"
                    type="submit"
                    variant="tonal"
                    rounded="pill"
                    class="px-4"
                    :disabled="pc.processing.value"
                  >
                    <Icon
                      class="opacity-50 me-2"
                      size="1.44rem"
                      name="material-symbols:save"
                    />
                    <span>Sačuvaj</span>
                  </VBtn>
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
