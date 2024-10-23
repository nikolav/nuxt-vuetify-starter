<script setup lang="ts">
// ##imports
// ##config ##const
const props = defineProps<{ gid?: any }>();
// ##utils
// ##icons
// ##refs ##flags
// ##data ##auth ##state
const { avatarImage } = useFirebaseStorageAssetsGroupAvatar(() => props.gid);
// ##computed
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head

// @@eos
</script>
<template>
  <slot :avatarImage="`${avatarImage || ''}`" />
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
