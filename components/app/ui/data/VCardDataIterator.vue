<script setup lang="ts">
// IS7qWevRGnAxp0Y
import { mergeProps } from "vue";
import { VBadgeSelectedOfTotal, VBtnFilterClear } from "@/components/app";
import { renderIcon } from "@/components/icons";

// @config
defineOptions({
  inheritAttrs: false,
});
const itemsSelected = defineModel<any[] | undefined>();
const props = withDefaults(
  defineProps<{
    items: any[];
    itemTitle?: string;
    itemValue?: any;
    itemTo?: any;
    itemGroups?: any;
    cardProps?: any;
    menuProps?: any;
    perPage?: number;
    reload?: any;
  }>(),
  {
    itemTitle: "title",
    itemValue: "id",
    itemTo: () => {
      return <any>{};
    },
    cardProps: {},
    menuProps: {},
    perPage: 5,
    reload: noop,
  }
);

const {
  app: { TOOLTIPS_OPEN_DELAY, SEARCH_DEBOUNCE_DELAY, DEFAULT_TRANSITION },
  layout: { toolbarMainHeight },
} = useAppConfig();

// @ui:icons
const iconCheckOff = renderIcon("mdi:checkbox-blank-circle-outline");
const iconCheckOn = renderIcon("mdi:checkbox-marked-circle");
const iconSearch = renderIcon("material-symbols:search", {
  class: "opacity-50",
});

// @refs
const textSearch = ref();
const searchTerm = ref();
const groupsSelected = ref<string[]>();
const isEmptyGroupsSelected = computed(() => isEmpty(groupsSelected.value));
const groupSelectionMany = ref<string[]>([]);
const groupsFromItems = (items: any[]) =>
  props.itemGroups
    ? sortBy(union(...map(items, props.itemGroups)), caseUpper)
    : undefined;
const groupsAll = computed(() => groupsFromItems(props.items));
const itemsFilteredGroups = computed(() =>
  isEmpty(groupsSelected.value)
    ? props.items
    : filter(props.items, (item) =>
        some(groupsSelected.value, (g) => props.itemGroups(item).includes(g))
      )
);

// @watch
watch(
  textSearch,
  debounce((search: string) => {
    searchTerm.value = search || undefined;
  }, SEARCH_DEBOUNCE_DELAY)
);

const length = computed(() => len(itemsFilteredGroups.value || []));
const toggleToolbarSecondary = useToggleFlag();
const itemsSelectAllOff = () => {
  itemsSelected.value = [];
};
const itemsSelectAllOn = () => {
  itemsSelected.value = itemsFilteredGroups.value;
};
const itemsSelectToggle = () => {
  itemsSelected.value = differenceBy(
    itemsFilteredGroups.value,
    itemsSelected.value,
    "id"
  );
};
const sizeItemsSelected = computed(() => len(itemsSelected.value || []));
const someSelected = computed(() => !isEmpty(itemsSelected.value));
const allSelected = computed(() => len(itemsSelected.value) == length.value);

const {
  page$,
  perPage: itemsPerPage,
  length: totPages,
} = usePaginatedData({
  perPage: props.perPage,
  data: itemsFilteredGroups,
});

// @helpers
const filterClear = () => {
  textSearch.value = undefined;
  groupsSelected.value = groupSelectionMany.value = [];
};

// @forms
const onSubmitApplyGroupFiler = () => {
  groupsSelected.value = groupSelectionMany.value;
};

// @@eos
</script>
<template>
  <VCard
    class="component--VCardDataIterator"
    density="comfortable"
    rounded="0"
    variant="text"
    v-bind="cardProps"
  >
    <!-- @@toolbar:primary -->
    <VToolbar
      v-if="!toggleToolbarSecondary.isActive.value"
      class="ps-1"
      color="primary"
      :height="toolbarMainHeight"
    >
      <template #prepend>
        <!-- @@selection:count -->
        <VBadgeSelectedOfTotal
          :model-value="sizeItemsSelected"
          :length="length"
        />
        <VDivider vertical inset class="ms-2" />
        <!-- @@btn:select:none -->
        <VBtn
          :disabled="!someSelected"
          @click="itemsSelectAllOff"
          density="comfortable"
          icon
          variant="plain"
          color="on-primary"
        >
          <Icon name="fluent:select-all-off-24-regular" size="1.44rem" />
          <VTooltip
            activator="parent"
            text="Poništi"
            location="bottom"
            :open-delay="TOOLTIPS_OPEN_DELAY"
          />
        </VBtn>
        <!-- @@btn:select:all -->
        <VBtn
          :disabled="allSelected"
          @click="itemsSelectAllOn"
          density="comfortable"
          icon
          variant="plain"
          color="on-primary"
        >
          <Icon name="fluent:select-all-on-24-regular" size="1.44rem" />
          <VTooltip
            activator="parent"
            text="Sve"
            location="bottom"
            :open-delay="TOOLTIPS_OPEN_DELAY"
          />
        </VBtn>
        <!-- @@btn:select:toggle -->
        <VBtn
          @click="itemsSelectToggle"
          density="comfortable"
          icon
          variant="plain"
          color="warning-lighten-1"
        >
          <Icon name="fluent:select-all-on-24-regular" size="1.44rem" />
          <VTooltip
            activator="parent"
            text="Suprotno"
            location="bottom"
            :open-delay="TOOLTIPS_OPEN_DELAY"
          />
        </VBtn>
        <!-- @@btn:search -->
        <VBtn
          @click="toggleToolbarSecondary"
          density="comfortable"
          icon
          variant="plain"
        >
          <Icon name="material-symbols:search" size="1.44rem" />
          <VTooltip
            activator="parent"
            text="Traži"
            location="bottom"
            :open-delay="TOOLTIPS_OPEN_DELAY"
          />
        </VBtn>
        <VSpacer />
        <!-- @@filter:clear -->
        <VBtnFilterClear
          v-if="searchTerm || !isEmptyGroupsSelected"
          @click="filterClear"
        />
      </template>
      <template #append>
        <VBtn
          @click="reload"
          variant="plain"
          size="small"
          icon
          density="comfortable"
        >
          <VIcon icon="$loading" />
        </VBtn>
        <VBtn
          v-if="$slots.menu"
          :disabled="!someSelected"
          density="comfortable"
          icon
          variant="text"
        >
          <Icon name="mdi:dots-vertical" size="1.35rem" />
          <VMenu
            activator="parent"
            location="bottom end"
            max-width="422"
            :transition="DEFAULT_TRANSITION"
            v-bind="menuProps"
          >
            <VSheet class="pa-0 ma-0">
              <slot name="menu" :selection="itemsSelected">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              </slot>
            </VSheet>
          </VMenu>
        </VBtn>
      </template>
    </VToolbar>
    <!-- @@toolbar:secondary -->
    <VToolbar
      v-else
      color="primary-lighten-2"
      :height="toolbarMainHeight"
      floating
    >
      <template #prepend>
        <VBtn
          @click="toggleToolbarSecondary"
          variant="text"
          icon="$prev"
          density="comfortable"
        />
      </template>
      <VToolbarItems class="min-w-[13.25rem] CLASS--u9IbL7JKG">
        <!-- @@search:users -->
        <VTextField
          v-model="textSearch"
          autofocus
          center-affix
          density="compact"
          placeholder="Pretraga"
          single-line
          class="scale-[82%] -translate-x-4"
          variant="solo"
          rounded="pill"
          :append-inner-icon="iconSearch"
          clearable
        />
      </VToolbarItems>
      <VSpacer />
      <!-- @@filter:clear -->
      <VBtnFilterClear
        v-if="searchTerm || !isEmptyGroupsSelected"
        @click="filterClear"
      />
      <!-- @@groups:select -->
      <VBtn v-if="0 < groupsAll?.length" icon density="comfortable">
        <Icon size="1.33rem" name="material-symbols:filter-list" />
        <VMenu activator="parent" location="bottom end">
          <VSheet density="compact">
            <VForm @submit.prevent="onSubmitApplyGroupFiler" autocomplete="off">
              <VList
                min-width="192"
                class="py-0"
                variant="flat"
                density="compact"
              >
                <VListItem
                  v-for="groupName in groupsAll"
                  lines="one"
                  :key="groupName"
                  class="ps-1"
                  @click="groupsSelected = groupSelectionMany = [groupName]"
                >
                  <template #prepend>
                    <VCheckboxBtn
                      v-model="groupSelectionMany"
                      :value="groupName"
                      color="primary"
                      density="comfortable"
                      @click.stop
                    />
                  </template>
                  <VListItemTitle class="ps-1">
                    {{ groupName }}
                  </VListItemTitle>
                </VListItem>
              </VList>
              <VBtn type="submit" class="mt-2" rounded="0" block variant="tonal"
                >ok</VBtn
              >
            </VForm>
          </VSheet>
        </VMenu>
      </VBtn>
    </VToolbar>
    <!-- @@data -->
    <VCardText class="pa-0 ma-0">
      <VDataIterator
        v-model="itemsSelected"
        :items="itemsFilteredGroups"
        :items-per-page="itemsPerPage"
        :page="page$"
        return-object
        :search="searchTerm"
        v-bind="$attrs"
      >
        <template #no-data>
          <slot name="no-data">
            <p>no data</p>
          </slot>
        </template>
        <template #default="{ items, isSelected, select }">
          <VList density="comfortable" variant="text" class="py-0">
            <!-- @@list:item -->
            <template v-for="node in items" :key="node.raw[itemValue]">
              <VListItem :value="node.raw[itemValue]" class="ps-2">
                <template #append="props_" v-if="$slots['list-item-append']">
                  <slot
                    name="list-item-append"
                    v-bind="mergeProps(props_, { item: node.raw })"
                  />
                </template>
                <template #prepend>
                  <VCheckboxBtn
                    base-color="secondary-lighten-1"
                    class="mx-0 scale-[109%]"
                    @click.stop
                    :model-value="isSelected(node)"
                    @update:model-value="select([node], !isSelected(node))"
                    density="comfortable"
                    :false-icon="iconCheckOff"
                    :true-icon="iconCheckOn"
                    color="primary"
                  ></VCheckboxBtn>
                </template>
                <VListItemTitle
                  class="ps-1 text-body-1"
                  @click="select([node], !isSelected(node))"
                >
                  <slot
                    name="list-item-title"
                    :item="node.raw"
                    :title="node.raw[itemTitle]"
                  >
                    <span>{{ node.raw[itemTitle] }}</span>
                  </slot>
                </VListItemTitle>
              </VListItem>
            </template>
          </VList>
        </template>
      </VDataIterator>
    </VCardText>
    <template #actions v-if="1 < totPages">
      <VSpacer />
      <VPagination
        v-model="page$"
        :length="totPages"
        :total-visible="1"
        variant="text"
        color="primary-darken-1"
        rounded="circle"
        density="comfortable"
      >
        <template #item>
          <small class="opacity-50 pt-2 d-inline-block">{{
            `${page$} / ${totPages}`
          }}</small>
        </template>
      </VPagination>
    </template>
  </VCard>
</template>
<style lang="scss" scoped></style>
<style lang="scss">
.CLASS--u9IbL7JKG .v-input__append {
  margin-inline-start: 8px !important;
}
</style>
