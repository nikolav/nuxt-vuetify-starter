<script setup lang="ts">
import type { IAuthProfile } from "@/types";
import { Dump } from "@/components/dev";
import { UID } from "@/keys";

definePageMeta({
  layout: false,
});

const uid = inject(UID);

const ref_6qiFpra2DMtLghiuo1B = ref();

const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

import Chart from "chart.js/auto";
onMounted(() => {
  const chart = new Chart(ref_6qiFpra2DMtLghiuo1B.value, {
    type: "bar",
    options: {
      animation: false,
    },
    data: {
      labels: map(data, "year"),
      datasets: [
        {
          label: "Acquisitions by year",
          data: map(data, "count"),
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
      <NuxtLinkLocale to="o-nama">o-nama</NuxtLinkLocale>
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
