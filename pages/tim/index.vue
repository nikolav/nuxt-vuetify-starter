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

const iconCheckOff = renderIcon("mdi:checkbox-blank-circle-outline");
const iconCheckOn = renderIcon("mdi:checkbox-marked-circle");

const { users, reload } = useQueryUsers();
const {
  page$,
  length: totPages,
  perPage,
} = usePaginatedData({
  data: users,
  perPage: 10,
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
const selection = ref([]);

// @helpers
const showUserScreen = (uid: any) =>
  navigateTo({ name: "tim-uid", params: { uid } });
const noUsers = computed(() => isEmpty(users.value));
const sizeUsers = computed(() => len(users.value));
const calcValueOf = (maybeCallableOrValue: any, node: any) =>
  isFunction(maybeCallableOrValue)
    ? maybeCallableOrValue(node)
    : maybeCallableOrValue;
// @@eos
</script>
<template>
  <section class="page--tim">
    <VCard density="comfortable" variant="text" rounded="0">
      <VDataTable
        v-model="selection"
        :items="users"
        :headers="headers"
        :items-per-page="perPage"
        hide-default-footer
        :page="page$"
        hover
        color="primary"
        density="compact"
        return-object
        show-select
        id="ID--1QknrimP7"
      >
        <template #top>
          <VToolbar :height="32" color="primary">
            <VBadge
              v-if="!noUsers"
              color="primary-lighten-2"
              inline
              :content="sizeUsers"
              class="opacity-50 ms-1"
            />
            <VSpacer />
            <VPagination
              variant="text"
              :total-visible="1"
              color="on-primary"
              rounded="circle"
              density="comfortable"
              size="small"
              v-if="1 < totPages"
              v-model="page$"
              :length="totPages"
            >
              <template #item>
                <small class="opacity-50 mt-1 d-inline-block">{{
                  `${page$} / ${totPages}`
                }}</small>
              </template>
            </VPagination>
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
