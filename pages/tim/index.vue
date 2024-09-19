<script setup lang="ts">
import { Dump } from "@/components/dev";
import { renderIcon } from "@/components/icons";

definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

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
  // {
  //   title: "Telefon",
  //   key: "phone",
  //   value: (node: any) => get(node, "profile.phone", ""),
  //   sortable: false,
  // },
];
const selection = ref([]);

// @@eos
</script>
<template>
  <section class="page--tim">
    <VCard density="comfortable" variant="text">
      <VToolbar :height="33" color="primary">
        <VBadge
          v-if="!isEmpty(users)"
          color="primary-lighten-2"
          inline
          :content="len(users)"
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
      <VDataTable
        :page="page$"
        hover
        v-model="selection"
        hide-default-footer
        color="primary"
        density="compact"
        item-value="id"
        return-object
        show-select
        :items="users"
        :items-per-page="perPage"
        :headers="headers"
        id="ID--1QknrimP7"
      >
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
          <tr
            @click="navigateTo({ name: 'tim-uid', params: { uid: item.id } })"
            class="cursor-pointer"
          >
            <template v-for="col in columns" :key="col.key">
              <td
                v-if="'data-table-select' === col.key"
                style="width: 1%"
                class="ps-1"
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
                  base-color="primary"
                ></VCheckboxBtn>
              </td>
              <td v-else>
                {{ isFunction(col.value) ? col.value(item) : col.value }}
              </td>
            </template>
          </tr>
        </template>
      </VDataTable>
    </VCard>
    <VFab
      :to="{ name: 'tim-dodaj-osobu' }"
      app
      location="bottom end"
      icon="$plus"
    />
  </section>
</template>
<style lang="scss">
#ID--1QknrimP7 table {
  table-layout: auto;
}
</style>
<style lang="scss" scoped></style>
