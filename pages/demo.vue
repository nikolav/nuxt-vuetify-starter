<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: false,
});

const file$ = ref();
const { onChange, open: filePicker } = useFileDialog({ accept: "image/*" });
onChange((lsFiles) => {
  file$.value = get(lsFiles, "[0]");
});
const { files, upload } = useApiStorage();
const imageUpload = async () => {
  if (!file$.value) return;
  const res = await upload({
    image: {
      file: file$.value,
    },
  });
  console.log({ res });
};
watchEffect(() => {
  console.log(file$.value);
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
    <VBtn @click="filePicker()">choose</VBtn>
    <VBtn @click="imageUpload">upload</VBtn>
    <Dump :data="files" />
  </section>
</template>
<style lang="scss" scoped></style>
