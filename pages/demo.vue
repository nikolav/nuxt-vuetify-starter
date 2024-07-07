<script setup lang="ts">
import { type ChartData } from "chart.js";
import { Dump } from "@/components/dev";

definePageMeta({
  layout: false,
});

const ref_6qiFpra2DMtLghiuo1B = ref();

import Chart from "chart.js/auto";
onMounted(() => {
  const chart = new Chart(ref_6qiFpra2DMtLghiuo1B.value, {
    type: "line",
    options: {
      animation: false,
      scales: {
        x: {
          type: "linear",
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
    data: {
      datasets: [
        {
          tension: 0.22,
          label: "lineChart",
          borderWidth: 5,
          data: [
            {
              x: 1,
              y: 12,
            },
            {
              x: 4,
              y: 11,
            },
            {
              x: 5,
              y: 22,
            },
          ],
        },
      ],
    },
  });
});

// @@eos
</script>
<template>
  <section class="page--demo">
    <div class="d-flex items-center gap-5 justify-center ma-2">
      <NuxtLinkLocale to="/">index</NuxtLinkLocale>
      <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    </div>
    <hr />
    <VSheet
      max-width="640"
      class="mx-auto pa-2 !bg-stone-50"
      elevation="1"
      rounded
    >
      <VResponsive :aspect-ratio="640 / 480">
        <canvas ref="ref_6qiFpra2DMtLghiuo1B" width="640" height="480" />
      </VResponsive>
    </VSheet>
  </section>
</template>
<style lang="scss" scoped></style>
