<script setup lang="ts">
// ##imports
// import { Dump } from "@/components/dev";
import {
  VToolbarPrimary,
  VBtnTopicChatToggle,
  VBadgeUserAvailability,
  VAvatarProfileImage,
  VCardTitleSectionStart,
  VBtnShowLocation,
} from "@/components/app";
import { Iconx } from "@/components/icons";

// ##config ##const
definePageMeta({
  middleware: "authorized",
  layout: "app-default",
});
const {
  icon: {
    aliases: { user: iconUser },
  },
} = useAppConfig();
// ##utils
const route = useRoute();
const UID = computed(() => route.params.uid);
// ##icons
// ##refs ##flags
// ##data ##auth ##state
const {
  reload,
  loading,
  //
  uid,
  user,
  profile,
  firstName,
  lastName,
  phone,
  email,
  address,
  displayLocation,
  displayName,
  chatChannel: topicChatChannel,
  avatarImage: avatar,
  job,
  groups,
  employedAt,
} = useQueryUserData(() => [UID.value]);
// ##computed
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head
useHead({ title: displayName });

// @@eos
</script>
<template>
  <section class="page--tim-uid">
    <VCard
      :disabled="loading"
      variant="text"
      rounded="0"
      elevation="0"
      class="pb-12 *overflow-visible"
    >
      <!-- :text="displayName" -->
      <VToolbarPrimary
        :props-title="{ class: 'font-italic text-h6 text-start ps-0 ms-3' }"
        :props-actions="{ class: 'pe-2' }"
        route-back-name="tim"
      >
        <template #title>
          <span class="d-flex items-center gap-2">
            <VBadgeUserAvailability :uid="uid" />
            <VBtnShowLocation
              class="-translate-x-[3px]"
              color="on-primary"
              variant="text"
              :uid="uid"
            />
            <span>{{ displayName }}</span>
          </span>
        </template>
        <template #prepend>
          <Iconx size="1rem" :icon="iconUser" class="opacity-30" />
        </template>
        <template #actions>
          <VBtnTopicChatToggle
            :topic="topicChatChannel"
            :props-icon="{ size: '1rem' }"
            density="comfortable"
            variant="plain"
          />
        </template>
      </VToolbarPrimary>

       <!-- @@size:all-fields -->
      <div class="__spacer__all_fields max-w-[592px] mx-auto">
        <VSpacer class="mt-5" />
        <VAvatarProfileImage
          :props-container="{ class: 'mx-auto' }"
          :image="avatar"
        />

        <!-- @@licne informacija -->
        <VSpacer class="mt-8" />
        <VCardTitleSectionStart
          :props-container="{ class: '*px-2' }"
          title="Lične informacije"
          class="border-b text-h6 opacity-40 text-center"
        ></VCardTitleSectionStart>
        <!-- @@fields -->
        <VCardText class="__spacer __RIC06yTf *space-y-0">
          <!-- @@field:fullname -->
          <template v-if="firstName || lastName">
            <VTextField
              class="fullname"
              variant="plain"
              readonly
              label="Ime i prezime"
              :model-value="[firstName, lastName].filter(Boolean).join(' ')"
            >
            </VTextField>
          </template>
          <!-- @@field:phone -->
          <template v-if="phone">
            <VTextField
              type="tel"
              class="phone"
              variant="plain"
              readonly
              label="Telefon"
              :model-value="phone"
            >
            </VTextField>
          </template>
          <!-- @@field:email -->
          <template v-if="email">
            <VTextField
              type="email"
              class="email"
              variant="plain"
              readonly
              label="Email"
              :model-value="email"
            >
            </VTextField>
          </template>
          <!-- @@field:address -->
          <template v-if="address">
            <VTextField
              class="address"
              variant="plain"
              readonly
              label="Adresa stanovanja"
              :model-value="startCase(address)"
            >
            </VTextField>
          </template>
        </VCardText>

        <!-- @@poslovne informacija -->
        <VSpacer class="mt-8" />
        <VCardTitleSectionStart
          :props-container="{ class: '*px-2' }"
          title="Poslovne informacije"
          class="border-b text-h6 opacity-40 text-center"
        ></VCardTitleSectionStart>
        <VCardText class="__spacer __RIC06yTf *space-y-0">
          <!-- @@field:job -->
          <template v-if="job">
            <VTextField
              class="job"
              variant="plain"
              readonly
              label="Naziv radnog mesta"
              :model-value="startCase(job)"
            >
            </VTextField>
          </template>
          <!-- @@field:employedAt -->
          <template v-if="employedAt">
            <VTextField
              class="employedAt"
              variant="plain"
              readonly
              label="Datum zaposlenja"
              :model-value="employedAt.local().format('D. MMMM YYYY.')"
            >
            </VTextField>
          </template>
          <!-- @@field:groups -->
           <template v-if="!isEmpty(groups)">
            <VTextField
              class="groups"
              variant="plain"
              readonly
              label="Tim, grupa, odsek"
              :model-value="
                groups.map(startCase).join(`&nbsp;&nbsp;•&nbsp;&nbsp;`)
              "
            >
            </VTextField>
          </template>
        </VCardText>
      </div>
       <VSpacer class="mt-12" />
       <VCardActions>
         <VSpacer/>
         <div class="opacity-40">
              <pre>&nbsp;•&nbsp;</pre>
          </div>
          <VSpacer/>
      </VCardActions>
    </VCard>
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss">
.__RIC06yTf {
  .v-field__input {
    font-size: 133%;
    padding-inline-start: 0.5rem;
  }
}
</style>
