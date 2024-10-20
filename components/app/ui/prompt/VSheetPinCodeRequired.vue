<script setup lang="ts">
// lYnRSjqINePwkYZaP4z
const pin = defineModel();
const props = withDefaults(
  defineProps<{
    message?: string | undefined;
    pinLength?: string | number | undefined;
    propsTextfield?: any;
    propsActions?: any;
  }>(),
  {
    pinLength: 4,
    message: "Pin za promenu lozinke:",
  }
);
onMounted(() => {
  pin.value = String(
    sampleSize(idGen().split(""), Number(props.pinLength)).join("")
  ).toLocaleUpperCase();
});
const code = ref();

// @@eos
</script>
<template>
  <VSheet
    class="component--VSheetPinCodeRequired pa-2"
    max-width="320"
    rounded="lg"
  >
    <VCardText class="space-y-2 text-center">
      <slot :pin="pin">
        <p class="text-medium-emphasis">
          {{ message }}
        </p>
        <pre class="text-lg">{{ pin }}</pre>
      </slot>
      <div class="__spacer mt-3" />
      <VTextField
        v-model="code"
        clearable
        density="compact"
        variant="outlined"
        single-line
        label="Unesi pin kod"
        rounded="lg"
        v-bind="propsTextfield"
      />
      <VCardActions class="justify-center" v-bind="propsActions">
        <slot name="actions" :pin="pin" :text="code">
          <VBtn :disabled="code != pin">ok</VBtn>
        </slot>
      </VCardActions>
    </VCardText>
  </VSheet>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
