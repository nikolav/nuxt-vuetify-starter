<script setup lang="ts">
import Chart from "chart.js/auto";
import { useDisplay } from "vuetify";
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { width: VW } = useDisplay();
const UID1 = useUniqueId();
watch(VW, debounce(UID1, 345));
const ref_k7h16SFrYOZ = ref();
const gradients = [
  ["#666"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
];

onMounted(() => {
  const chart = new Chart(ref_k7h16SFrYOZ.value, {
    type: "bar",
    data: {
      // labels: ["Foo", "Bar", "Baz"],
      datasets: [
        {
          stack: "@1",
          label: "set:1",
          data: [
            {
              ID: "Foo",
              meta: { value: 1 },
            },
            {
              ID: "Bar",
              meta: { value: 2 },
            },
            {
              ID: "Baz",
              meta: { value: 4 },
            },
          ],
        },
        {
          stack: "@1",
          label: "set:2",
          data: [
            {
              ID: "Foo",
              meta: { value: 2 },
            },
            {
              ID: "Bar",
              meta: { value: 5 },
            },
            {
              ID: "Baz",
              meta: { value: 1 },
            },
          ],
        },
      ],
    },
    options: {
      parsing: {
        xAxisKey: "ID",
        yAxisKey: "meta.value",
      },
      responsive: true,
      plugins: {
        legend: {
          // display: false,
        },
      },
      animation: false,
      scales: {
        x: {
          // stacked: true,
        },
        y: {
          // stacked: true,
          beginAtZero: true,
        },
      },
    },
  });
});

// @@eos
</script>
<template>
  <section class="page--dashboard">
    <h1>app</h1>
    <VResponsive :max-width="640" class="mx-auto bg-red-100">
      <canvas ref="ref_k7h16SFrYOZ" />
    </VResponsive>
    <Dump :data="{ ID: UID1.ID.value }" />
  </section>
</template>
<style lang="scss" scoped></style>
