<script setup lang="ts">
// CULzxE

// config, utils
const availability = defineModel<any>();
const {
  app: { DEFAULT_TRANSITION },
  acconts: { availabilityStatus, availabilityUI: VSELECT_ITEMS_CONFIG },
} = useAppConfig();
const itvalue = (type: string) => ({
  title: VSELECT_ITEMS_CONFIG[type].title,
  value: type,
});
const availability_items = map(availabilityStatus, (_v, type) => itvalue(type));

// refs
const ref_cLSaD2AEHC = ref();
const { width: W_vselect_list } = useElementSize(ref_cLSaD2AEHC);

// store, data
const auth = useStoreApiAuth();
const { data, availability_commit } = useDocUsersAvailabilityStatus();
const store = computed(() => data.value?.data);

// watchers
//  availability: { title: string; value: string }
watch(availability, async (availability) => {
  if (!availability?.value) return;
  await availability_commit(auth.uid, availability.value);
});

// init:vselect
useOnceMountedOn(store, () => {
  const val = store.value[auth.uid];
  const value = findKey(availabilityStatus, (v: string) => val == v);
  if (value) {
    availability.value = itvalue(value);
  }
});

// @@eos
</script>
<template>
  <VSelect
    class="component--VSelectAvailabilityPicker px-2 my-3"
    ref="ref_cLSaD2AEHC"
    v-model="availability"
    return-object
    hide-selected
    :transition="DEFAULT_TRANSITION"
    :menu-props="{ location: 'center', width: W_vselect_list }"
    :list-props="{ class: 'py-0', rounded: 'lg' }"
    single-line
    label="Prisutnost"
    rounded="pill"
    variant="solo-filled"
    center-affix
    :items="availability_items"
  >
    <template v-if="availability" #prepend-inner>
      <VIcon
        size="1.78rem"
        start
        :color="VSELECT_ITEMS_CONFIG[availability.value].icon.color"
        :icon="VSELECT_ITEMS_CONFIG[availability.value].icon.name"
      />
    </template>
    <template #selection="{ item }">
      <span class="ms-3 text-h6">
        {{ item.title }}
      </span>
    </template>
    <template #item="{ item, props: props_ }">
      <VListItem lines="one" v-bind="props_">
        <template #prepend>
          <VIcon
            :color="VSELECT_ITEMS_CONFIG[item.value].icon.color"
            :icon="VSELECT_ITEMS_CONFIG[item.value].icon.name"
          />
        </template>
        <template #title>
          <span class="text-body-1">
            {{ VSELECT_ITEMS_CONFIG[item.value].title }}
          </span>
        </template>
      </VListItem>
    </template>
  </VSelect>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
