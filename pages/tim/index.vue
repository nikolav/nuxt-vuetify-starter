<script setup lang="ts">
import { Dump } from "@/components/dev";
import { renderIcon } from "@/components/icons";
import { VChipPlus } from "@/components/app";
import { useDisplay } from "vuetify";

definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { smAndUp } = useDisplay();
const {
  app: { TOOLTIPS_OPEN_DELAY, SEARCH_DEBOUNCE_DELAY },
} = useAppConfig();

const iconCheckOff = renderIcon("mdi:checkbox-blank-circle-outline");
const iconCheckOn = renderIcon("mdi:checkbox-marked-circle");
const iconSearch = renderIcon("material-symbols:search", {
  class: "opacity-50",
});

// @data
const { users, reload: usersReload } = useQueryUsers();
// @refs
const groupsSelected = ref<string[]>();
const groupSelectionMany = ref<string[]>([]);
const isEmptyGroupsSelected = computed(() => isEmpty(groupsSelected.value));
// @computed
const groupsAll = computed(() =>
  sortBy(union(...map(users.value, "groups")), caseUpper)
);
const usersFilteredGroups = computed(() =>
  isEmpty(groupsSelected.value)
    ? users.value
    : filter(users.value, (user) =>
        some(groupsSelected.value, (g) => user.groups?.includes(g))
      )
);

// @utils
const {
  page$,
  length: totPages,
  perPage,
} = usePaginatedData({
  data: users,
  perPage: 3,
});
const headers = [
  // { title: "ID", key: "id" },
  // { title: "Email", key: "email" },
  {
    title: "",
    key: "data-table-select",
  },
  {
    title: "Osoba",
    key: "fullname",
    value: (node: any) =>
      get(node, "profile.displayName", "") ||
      [get(node, "profile.lastName", ""), get(node, "profile.firstName", "")]
        .filter(Boolean)
        .join(", ") ||
      get(node, "email"),
  },
  {
    title: "Grupe",
    key: "groups",
    value: (node: any) => get(node, "groups", []).join(", "),
    sortable: false,
  },
];
// @refs
const usersSearch = ref();
const usersDataFilter = ref();
watch(
  usersSearch,
  debounce((search: string) => {
    usersDataFilter.value = search || undefined;
  }, SEARCH_DEBOUNCE_DELAY)
);
const filterClear = () => {
  usersSearch.value = undefined;
  groupsSelected.value = groupSelectionMany.value = [];
};

const toggleToolbarSecondary = useToggleFlag();
const selection = ref<any[]>([]);

// @helpers
const usersSelectAll = () => {
  selection.value = [...users.value];
};
const usersSelectAllOff = () => {
  selection.value = [];
};
const usersSelectToggle = () => {
  selection.value = differenceBy(users.value, selection.value, "id");
};
const showUserScreen = (uid: any) =>
  navigateTo({ name: "tim-uid", params: { uid } });
const noUsers = computed(() => isEmpty(users.value));
const sizeUsers = computed(() => len(users.value));
const calcValueOf = (maybeCallableOrValue: any, node: any) =>
  isFunction(maybeCallableOrValue)
    ? maybeCallableOrValue(node)
    : maybeCallableOrValue;

// @forms
const { submit } = useFormDataFields(
  "1wT3W6ug6",
  {},
  {
    onSubmit: () => {
      groupsSelected.value = groupSelectionMany.value;
    },
  }
);
// @@eos
</script>
<template>
  <section class="page--tim">
    <VCard density="comfortable" variant="text" rounded="0">
      <VDataTable
        v-model="selection"
        :items="usersFilteredGroups"
        :headers="headers"
        :items-per-page="perPage"
        :page="page$"
        :search="usersDataFilter"
        hide-default-footer
        hover
        color="primary"
        density="compact"
        return-object
        show-select
        id="ID--1QknrimP7"
      >
        <template #top>
          <VToolbar
            v-if="!toggleToolbarSecondary.isActive.value"
            :height="32"
            color="primary"
            class="px-0"
          >
            <span class="d-flex items-center gap-2 ps-2">
              <em class="opacity-50">{{ selection.length }}</em>
              <span>&#47;</span>
              <VBadge
                v-if="!noUsers"
                color="primary-lighten-2"
                inline
                :content="sizeUsers"
                class="opacity-50 mx-0 px-0 -translate-x-1"
              />
            </span>
            <VBtn
              @click="usersSelectAll"
              density="compact"
              icon
              variant="plain"
              color="on-primary"
            >
              <Icon name="fluent:select-all-on-24-regular" size="1.33rem" />
              <VTooltip
                activator="parent"
                text="Svi"
                location="bottom"
                :open-delay="TOOLTIPS_OPEN_DELAY"
              />
            </VBtn>
            <VBtn
              @click="usersSelectAllOff"
              density="compact"
              icon
              variant="plain"
              color="on-primary"
            >
              <Icon name="fluent:select-all-off-24-regular" size="1.33rem" />
              <VTooltip
                activator="parent"
                text="Poništi"
                location="bottom"
                :open-delay="TOOLTIPS_OPEN_DELAY"
              />
            </VBtn>
            <VBtn
              @click="usersSelectToggle"
              density="compact"
              icon
              variant="plain"
              color="warning-lighten-1"
            >
              <Icon name="fluent:select-all-on-24-regular" size="1.33rem" />
              <VTooltip
                activator="parent"
                text="Suprotno"
                location="bottom"
                :open-delay="TOOLTIPS_OPEN_DELAY"
              />
            </VBtn>
            <VBtn
              @click="toggleToolbarSecondary"
              density="compact"
              icon
              variant="plain"
            >
              <Icon name="material-symbols:search" size="1.33rem" />
              <VTooltip
                activator="parent"
                text="Traži"
                location="bottom"
                :open-delay="TOOLTIPS_OPEN_DELAY"
              />
            </VBtn>
            <VBtn
              size="small"
              @click="usersReload"
              density="comfortable"
              icon
              variant="plain"
              class="-ms-[4px]"
            >
              <VIcon icon="$loading" />
            </VBtn>
            <VSpacer />
            <VPagination
              v-if="1 < totPages"
              v-model="page$"
              :length="totPages"
              :total-visible="smAndUp ? 1 : 0"
              variant="text"
              color="on-primary"
              rounded="circle"
              density="comfortable"
              size="small"
            >
              <template #item>
                <small class="opacity-50 pt-[6px] d-inline-block">{{
                  `${page$} / ${totPages}`
                }}</small>
              </template>
            </VPagination>
          </VToolbar>
          <VToolbar v-else :height="32" color="primary-lighten-2" floating>
            <template #prepend>
              <VBtn
                @click="toggleToolbarSecondary"
                variant="text"
                icon="$prev"
                density="compact"
              />
            </template>
            <VToolbarItems class="min-w-[13rem]" id="ID--JnatwQ3c">
              <!-- @@search:users -->
              <VTextField
                v-model="usersSearch"
                autofocus
                center-affix
                density="compact"
                placeholder="Pretraga"
                single-line
                class="scale-[70%] -translate-y-[3px] -translate-x-7"
                variant="solo"
                rounded="pill"
                :append-inner-icon="iconSearch"
              />
            </VToolbarItems>
            <VSpacer />
            <!-- @@filter:clear -->
            <template v-if="usersDataFilter || !isEmptyGroupsSelected">
              <VBtn
                @click="filterClear"
                icon
                variant="plain"
                size="small"
                density="comfortable"
              >
                <Icon
                  size="1rem"
                  name="material-symbols:filter-alt-off-outline"
                />
              </VBtn>
            </template>
            <!-- @@groups:select -->
            <VBtn
              v-if="0 < groupsAll?.length"
              icon
              size="small"
              density="comfortable"
            >
              <Icon size="1.22rem" name="material-symbols:filter-list" />
              <VMenu activator="parent" location="bottom end">
                <VSheet density="compact">
                  <VForm @submit.prevent="submit" autocomplete="off">
                    <VList class="py-0" variant="flat" density="compact">
                      <VListItem
                        v-for="groupName in groupsAll"
                        lines="one"
                        :key="groupName"
                        class="ps-1"
                        @click="
                          groupsSelected = groupSelectionMany = [groupName]
                        "
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
                    <VBtn
                      type="submit"
                      class="mt-2"
                      rounded="0"
                      block
                      variant="tonal"
                      >ok</VBtn
                    >
                  </VForm>
                </VSheet>
              </VMenu>
            </VBtn>
          </VToolbar>
        </template>
        <template #headers="{ columns, isSorted, getSortIcon, toggleSort }">
          <tr class="text-body-2">
            <template v-for="column in columns" :key="column.key">
              <td>
                <span class="d-flex items-center">
                  <template v-if="isSorted(column)">
                    <VIcon
                      :size="14"
                      :icon="getSortIcon(column)"
                      class="-translate-y-px"
                    />
                  </template>
                  <small
                    class="ms-1 opacity-50"
                    :class="[column.sortable ? 'cursor-pointer' : undefined]"
                    @click="() => column.sortable && toggleSort(column)"
                    >{{ column.title }}</small
                  >
                </span>
              </td>
            </template>
          </tr>
        </template>

        <template
          #item="{ internalItem, item, isSelected, toggleSelect, columns }"
        >
          <tr @click="showUserScreen(item.id)" class="cursor-pointer">
            <template v-for="col in columns" :key="col.key">
              <td
                v-if="'data-table-select' === col.key"
                style="width: 1%"
                class="ps-1 pe-0"
              >
                <VCheckboxBtn
                  class="mx-0"
                  @click.stop
                  :model-value="isSelected(internalItem)"
                  @update:model-value="toggleSelect(internalItem)"
                  density="compact"
                  :false-icon="iconCheckOff"
                  :true-icon="iconCheckOn"
                  color="primary"
                  base-color="secondary-lighten-1"
                ></VCheckboxBtn>
              </td>
              <td
                v-else-if="col.key == 'groups'"
                :class="[smAndUp ? undefined : 'px-0 ps-1']"
              >
                <VChipPlus
                  :items="item.groups"
                  :size="smAndUp ? undefined : 'x-small'"
                />
              </td>
              <td
                v-else-if="col.key == 'fullname'"
                :class="[smAndUp ? undefined : 'px-0']"
              >
                <strong
                  :class="[item.is_manager ? 'text-primary' : undefined]"
                  >{{ calcValueOf(col.value, item) }}</strong
                >
              </td>
              <td v-else>
                <span>{{ calcValueOf(col.value, item) }}</span>
              </td>
            </template>
          </tr>
        </template>
      </VDataTable>
    </VCard>
    <VFab
      absolute
      appear
      :to="{ name: 'tim-dodaj-osobu' }"
      icon="$plus"
      class="!fixed !z-[9999]"
      :class="[smAndUp ? 'end-20 bottom-6' : 'end-6 bottom-20']"
      :size="smAndUp ? undefined : 'small'"
    />
  </section>
</template>
<style lang="scss">
#ID--1QknrimP7 table {
  table-layout: auto;
}
</style>
<style lang="scss" scoped></style>
<style lang="scss">
#ID--JnatwQ3c .v-input__append {
  margin-inline-start: 8px !important;
}
</style>
