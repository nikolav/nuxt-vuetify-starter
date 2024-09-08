<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { form, submit, valid } = useFormDataFields(
  "7fnvK",
  {
    field1: (val) => 0 < len(val),
  },
  {
    onSubmit: (data) => {
      console.log({ data });
    },
  }
);

// @@eos
</script>
<template>
  <section class="page--dashboard">
    <h1>app</h1>
    <VForm autocomplete="off" @submit.prevent="submit">
      <VTextField
        label="Field"
        name="FIELD_1"
        v-model="form.field1.value"
        clearable
        density="comfortable"
      />
      <VBtn type="submit">submit [{{ `${valid ? "" : "!"}ok` }}]</VBtn>
    </VForm>
  </section>
</template>
<style lang="scss" scoped></style>
