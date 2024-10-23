<script setup lang="ts">
// .avatar[@.data:avatar] .name .region|category[@.tags:category] .location .notes
// ##imports
import { z } from "zod";
import {
  VImgPickerSingle,
  VBtnReset,
  VBtnSave,
  VSnackbarSuccess,
  VToolbarPrimary,
} from "@/components/app";
import { Iconx } from "@/components/icons";
// ##config ##const
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});
const {
  app: { DEFAULT_TRANSITION },
  icon: {
    aliases: { location: iconLocation },
  },
} = useAppConfig();
const FIELDS_RECORD = ["name", "location", "notes"];
const FIELDS_RECORD_wcategory = [...FIELDS_RECORD, "category"];

// ##utils
const schemaInputAssetGroup = z.object({
  name: z.string().trim().min(1),
  category: z.string(),
});
const {
  groups: { categories_select_menu },
} = useCategoryAssets();
const pc = useProcessMonitor();

// ##icons
// ##refs ##flags
const avatarImage = ref();
const ref_ykDJKZRhf6dq67Nae = ref();
const avatarResetID = useUniqueId();
const new_GID = ref();
const toggleSuccessCommit = useToggleFlag();
// ##data ##auth ##state
const { commit } = useQueryManageAssetsGroups();
const { firebasePathAssetsAvatars } = useTopics();
const { upload: fbsUpload } = useFirebaseStorage(() =>
  firebasePathAssetsAvatars(new_GID.value)
);

// ##computed
const { width: WSELECT } = useElementSize(ref_ykDJKZRhf6dq67Nae);
// ##forms ##helpers ##handlers
const {
  form,
  submit,
  valid: formValid,
  clear,
} = useFormDataFields(
  "paFih0",
  {
    name: true,
    // region name @~/assets/app/categories.assets.groups.json
    category: true,
    location: true,
    notes: true,
  },
  {
    schema: schemaInputAssetGroup,
    onSubmit: async (data) => {
      new_GID.value = undefined;
      toggleSuccessCommit.off();
      pc.begin();
      try {
        const d = assign(pick(data, FIELDS_RECORD_wcategory), {
          data: omit(data, FIELDS_RECORD_wcategory),
        });
        new_GID.value = get(
          await commit(d),
          "data.assetsUpsert.status.asset.id"
        );
        if (!new_GID.value) throw "--no-asset-saved";
        if (avatarImage.value) {
          if (
            !get(
              await fbsUpload({
                avatarImage: {
                  file: avatarImage.value.file,
                  name: "avatarImage",
                },
              }),
              "0.avatarImage"
            )
          )
            throw "--upload-failed";
        }
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
  clear();
  avatarResetID();
};
// ##watch
// ##hooks:lifecycle
// ##head
useHead({ title: "Nova grupa" });

onMounted(() => {
  watch(pc.success, (success_) => {
    if (!success_) return;
    toggleSuccessCommit.on();
    formReset();
  });
});

// @@eos
</script>
<template>
  <section class="page--aktiva-grupe-nova">
    <VSnackbarSuccess v-model="toggleSuccessCommit.isActive.value">
      <NuxtLink :to="{ name: 'aktiva-grupe-gid', params: { gid: new_GID } }">
        <a class="text-decoration-underline text-body-1 underline-offset-[6px]"
          >📄 Grupa je uspešno sačuvana.
        </a>
      </NuxtLink>
    </VSnackbarSuccess>

    <VCard variant="text" rounded="0" elevation="0" class="__spacer pa-0 ma-0">
      <VToolbarPrimary
        :props-title="{ class: 'font-italic text-body-1' }"
        text="Napravi novu grupu"
        route-back-name="aktiva-grupe"
      >
        <template #prepend>
          <Iconx
            class="opacity-30 ms-1"
            size="1.55rem"
            icon="material-symbols-light:group-add-outline"
          />
        </template>
      </VToolbarPrimary>
      <VForm
        class="max-w-[422px] mx-auto px-5"
        @submit.prevent="submit"
        autocomplete="off"
      >
        <VImgPickerSingle
          :props-container="{ width: 192, height: 192, class: 'mx-auto mt-5' }"
          rounded="circle"
          v-model="avatarImage"
          :reset-id="avatarResetID.ID.value"
        />
        <div class="__sizer space-y-2 mt-5" ref="ref_ykDJKZRhf6dq67Nae">
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
              <span>Naziv grupe </span><span class="text-error">*</span>
            </template>
          </VTextField>

          <VTextField
            v-model.trim="form.location.value"
            clearable
            variant="underlined"
            label="Lokacija"
          >
            <template #prepend-inner>
              <Iconx
                size="1rem"
                class="opacity-20 me-1 translate-y-[2px]"
                :icon="iconLocation"
              />
            </template>
          </VTextField>

          <VSelect
            v-model="form.category.value"
            class="px-5 mt-3"
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
            }"
          >
            <template #label>
              <span class="d-flex items-center">
                <Iconx
                  size=".82rem"
                  class="opacity-50 me-2"
                  icon="mdi:folder"
                />
                <span>Region </span>
                <span class="text-error">&nbsp;*</span>
              </span>
            </template>
            <template #prepend-inner>
              <pre class="__spacer me-2" />
            </template>
          </VSelect>

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
          <VCardActions class="mt-6 mb-16 *pa-6">
            <VBtnReset @click="formReset()" />
            <VSpacer />
            <VBtnSave
              type="submit"
              :disabled="pc.processing.value || !formValid"
            />
          </VCardActions>
        </div>
      </VForm>
    </VCard>
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
