<script setup lang="ts">
// ##imports
// import { Dump } from "@/components/dev";
import { Iconx } from "@/components/icons";
import {
  VSheetHeaderBodyFooter,
  VBtnGroupTopicLikeDislike,
} from "@/components/app";
// ##config
const props = withDefaults(
  defineProps<{
    item?: any;
    remove?: any;
  }>(),
  {
    remove: noop,
  }
);
const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
// ##utils
const { $dd } = useNuxtApp();
const { likesDocs } = useTopics();
// ##icons
// ##refs ##flags
const uid = inject(key_UID);
// ##data ##auth ##state
// ##computed
const topicLikesDocChatMessage = computed(() => likesDocs(props.item?.id));
const ownsMessage = computed(() => uid?.value == props.item?.data.uid);
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head

// @@eos
</script>
<template>
  <VSheetHeaderBodyFooter
    :item="item"
    rounded
    :elevation="ownsMessage ? 3 : 1"
    class="component--VSheetChatItemSimple pa-2"
    :props-header="{ class: 'align-baseline' }"
    :props-footer="{ class: 'd-flex justify-end gap-0' }"
    :props-body="{ class: 'prose' }"
    :color="ownsMessage ? 'primary-lighten-5' : undefined"
  >
    <template #append>
      <span class="d-flex items-start gap-2">
        <VBtnGroupTopicLikeDislike
          :topic="topicLikesDocChatMessage"
          small
          light
          :class="[ownsMessage ? 'opacity-50' : undefined]"
          :props-buttons="{ disabled: ownsMessage }"
        />
        <VBtn
          v-if="ownsMessage"
          color="error"
          icon
          variant="plain"
          size="small"
          density="comfortable"
          class="opacity-40"
        >
          <Iconx size="1.22rem" icon="mdi:trash-can" />
          <VMenu
            activator="parent"
            location="center"
            :transition="DEFAULT_TRANSITION"
          >
            <VSheetHeaderBodyFooter
              class="pa-4"
              rounded
              :props-header="{ class: 'text-center' }"
              :props-footer="{ class: 'd-flex justify-center pt-5' }"
            >
              <template #title>
                <strong class="text-error-darken-2">Obriši ovu poruku?</strong>
              </template>
              <template #footer>
                <VBtn @click="remove" rounded="pill" color="error">
                  <Iconx
                    size="1.33rem"
                    icon="mdi:trash-can"
                    class="me-1 opacity-50"
                  />
                  <span>ok</span>
                </VBtn>
              </template>
            </VSheetHeaderBodyFooter>
          </VMenu>
        </VBtn>
      </span>
    </template>
    <template #title="{ item }">
      <span class="font-italic opacity-75 ps-1">{{ item.data.name }}</span>
    </template>
    <template #body="{ item }">
      <p>
        {{ item.data.message }}
      </p>
    </template>
    <template #footer="{ item }">
      <pre
        class="opacity-50"
      ><small>{{ $dd.utc(item.created_at).fromNow(true) }}</small></pre>
    </template>
  </VSheetHeaderBodyFooter>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
