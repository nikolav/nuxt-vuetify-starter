<script setup lang="ts">
// ##notes
// updates
//   name, code, barcode, link, notes, images
// ##imports
import { useDisplay } from "vuetify";
import {
  VToolbarPrimary,
  VImgImagesPicker,
  VSnackbarSuccess,
  VBtnSave,
  VBtnReset,
} from "@/components/app";
import { Iconx } from "@/components/icons";
// ##config
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});
useHead({ title: "Ažuriraj proizvod" });
const IMAGE_PICKER_SIZE_MAX = {
  h: 255,
  w: 320,
};
// ##utils
const route = useRoute();
const { file } = useFetchUrlToFileData();
const { firebasePathAssets } = useTopics();
const pc = useProcessMonitor();
const { watchProcessing } = useStoreAppProcessing();
const { mdAndUp } = useDisplay();
// ##icons
// ##refs ##flags
const newProductImagesPicked = ref();
const imagesUpdated = ref();
const pid = computed(() => get(route.params, "pid"));
const toggleUpdateSuccess = useToggleFlag();
// ##state ##auth ##data
const { ls, url, rma, upload } = useFirebaseStorage(() =>
  firebasePathAssets(pid.value)
);
const { assets: products, commit } = useQueryManageAssetsProducts(() => [
  pid.value,
]);
// ##computed
const p = computed(() => first(products.value));
// ##forms ##helpers
const FIELDS = <any>{
  name: {
    label: "Naziv *",
    icon: {
      name: "mdi:tag",
      size: "1.22rem",
    },
  },
  code: {
    label: "Šifra",
    icon: {
      name: "ri:hashtag",
      size: "1rem",
    },
  },
  barcode: {
    path: "data.barcode",
    label: "Barkod",
    icon: {
      name: "material-symbols:barcode",
      size: "1rem",
    },
  },
  link: {
    path: "data.link",
    label: "Link",
    icon: {
      name: "material-symbols:link-rounded",
      size: "1rem",
    },
  },
  notes: {
    // type: "textarea",
    label: "Opis",
    icon: {
      name: "$edit",
      size: "1rem",
    },
  },
};

const fieldsSyncFromStore = () => {
  each(FIELDS, (item: any, field: string) => {
    const val = get(p.value, item.path || field);
    if (val) {
      form[field].value = val;
    }
  });
};
const fieldsResetFromStore = () => {
  each(FIELDS, (item: any, field: string) => {
    form[field].value = get(p.value, item.path || field);
  });
};

const {
  form,
  submit: formSubmit,
  // valid: formValid,
  // clear: formClear,
} = useFormDataFields(
  `fS2V1LZ9HE8PX1gNMq --${pid.value}`,
  reduce(
    keys(FIELDS),
    (res, field) => {
      res[field] = true;
      return res;
    },
    <any>{}
  ),
  {
    dump: null,
    schema: null,
    onSubmit: async () => {
      pc.begin(toggleUpdateSuccess.off);
      try {
        const dd = diffDump();
        if (isEmpty(dd) && !imagesUpdated.value) throw "--no-updates";

        if (!isEmpty(dd)) {
          if (
            // throw if no ID
            !get(
              await commit(dd, pid.value),
              "data.assetsUpsert.status.asset.id"
            )
          )
            throw "--no-upserts";
        }

        if (imagesUpdated.value) {
          // clear all, upload new
          await rma();
          await upload(
            reduce(
              newProductImagesPicked.value,
              (d, node) => {
                if (node.file) {
                  d[node.file.name] = {
                    file: node.file,
                  };
                }
                return d;
              },
              <any>{}
            )
          );
        }
      } catch (error) {
        pc.setError(error);
      } finally {
        pc.done(() => {
          // reset sending the same image again on repeated posts
          imagesUpdated.value = undefined;
        });
      }
      if (!pc.error.value) pc.successful(toggleUpdateSuccess.on);
    },
  }
);
// dump fields updated
const diffDump = () =>
  reduce(
    FIELDS,
    (d, item, field) => {
      const path = item.path || field;
      const newValue = form[field].value;
      if (newValue != get(p.value, path)) {
        set(d, path, newValue);
      }
      return d;
    },
    <any>{}
  );
// ##watch
watchProcessing(pc.processing);
// ##hooks:lifecycle
// render asset:images
useOnceMountedOn(true, async () => {
  newProductImagesPicked.value = await Promise.all(
    map(await ls(), async (node) => {
      const f = await file(await url(node.name), node.name);
      return {
        file: f,
        dataurl: await dataUrl(<File>f),
      };
    })
  );
});
// load asset:fields
useOnceMountedOn(p, fieldsSyncFromStore);
// ##handlers
const onUpdateModelValuePicker = (args: any[]) => {
  imagesUpdated.value = !isEmpty(args);
};

// @@eos
</script>
<template>
  <section class="page--aktiva-proizvodi-uredi-pid">
    <VSnackbarSuccess v-model="toggleUpdateSuccess.isActive.value">
      <span>Proizvod je uspešno ažuriran.</span>
    </VSnackbarSuccess>
    <VForm @submit.prevent="formSubmit" autocomplete="off">
      <VCard variant="text" rounded="0">
        <!-- @@toolbar:primary -->
        <VToolbarPrimary text="Ažuriraj proizvod">
          <template #prepend>
            <Iconx
              size="1.22rem"
              class="opacity-40 ms-1"
              icon="$iconBox3DEdit"
            />
          </template>
        </VToolbarPrimary>
        <VCardText>
          <VContainer max-width="892">
            <VRow>
              <VCol md="6">
                <!-- @@picker -->
                <VImgImagesPicker
                  v-model="newProductImagesPicked"
                  @update:model-value="onUpdateModelValuePicker"
                  :props-container="{
                    height: IMAGE_PICKER_SIZE_MAX.h,
                    maxWidth: IMAGE_PICKER_SIZE_MAX.w,
                    class: 'mx-auto',
                  }"
                  :height="IMAGE_PICKER_SIZE_MAX.h - 4"
                  :max-width="IMAGE_PICKER_SIZE_MAX.w"
                />
              </VCol>
              <VCol md="6">
                <!-- @@fields -->
                <!-- name, code, barcode, link, notes, images -->
                <div
                  class="__placer max-w-[512px] mx-auto"
                  :class="[mdAndUp ? undefined : 'mt-5']"
                >
                  <template v-for="(item, field) in FIELDS" :key="field">
                    <VTextField
                      v-if="'notes' != field"
                      v-model="form[field].value"
                      :label="item.label"
                      variant="underlined"
                      :name="field"
                    >
                      <template v-if="item.icon" #prepend-inner>
                        <Iconx
                          :size="item.icon.size"
                          class="opacity-20 me-2 translate-y-[2px]"
                          :icon="item.icon.name"
                        />
                      </template>
                    </VTextField>
                    <VTextarea
                      v-else-if="'notes' == field"
                      v-model="form[field].value"
                      :label="item.label"
                      variant="underlined"
                      :name="field"
                      rows="4"
                    >
                      <template v-if="item.icon" #prepend-inner>
                        <Iconx
                          :size="item.icon.size"
                          class="opacity-20 me-2 translate-y-1"
                          :icon="item.icon.name"
                        />
                      </template>
                    </VTextarea>
                  </template>
                  <VCardActions class="justify-around pa-5">
                    <VBtnReset @click="fieldsResetFromStore" />
                    <VBtnSave type="submit" :disabled="pc.processing.value" />
                  </VCardActions>
                </div>
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
      </VCard>
    </VForm>
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
