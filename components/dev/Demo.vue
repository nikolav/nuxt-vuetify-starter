<script setup lang="ts">
import { Dump } from "@/components/dev";
import type { IInputFileUpload } from "@/types";

const { upload } = useFirebaseStorage("foo:OC2Bxvm6FOf");
const {
  open: showDialog,
  files,
  reset,
} = useFileDialog({ accept: "image/*", multiple: true });
const filesUpload = async () => {
  if (isEmpty(files.value)) return;
  const upl = reduce(
    files.value,
    (accum, file) => {
      accum[file.name] = { file, name: `${idGen()}.${file.name}` };
      return accum;
    },
    <IInputFileUpload>{}
  );

  const res = await upload(upl);
  console.log({ res });
};
// @@eos
</script>
<template>
  <VResponsive class="component--Demo mx-auto" :max-width="640">
    <VBtn @click="showDialog()">select</VBtn>
    <VBtn @click="filesUpload">upload</VBtn>
    <VBtn @click="reset()">reset</VBtn>
    <Dump :data="{ files }" />
  </VResponsive>
</template>
<style lang="scss" scoped></style>
