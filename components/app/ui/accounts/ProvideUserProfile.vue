<script setup lang="ts">
// ##imports
// ##config
const props = defineProps<{ uid: any }>();
// ##utils
// ##icons
// ##refs
// ##state ##data ##auth
const auth = useStoreApiAuth();
const isUserOther = computed(
  () => props.uid && auth.uid && props.uid != auth.uid
);
const { users } = useQueryUsers([props.uid], isUserOther);
const userOtherProfile = computed(() => get(first(users.value), "profile"));
// ##computed
const profile = computed(() =>
  isUserOther.value ? userOtherProfile.value : auth.profile
);
// ##forms ##helpers
// ##watch
// ##hooks:lifecycle

// @@eos
</script>
<template>
  <slot :profile="profile" />
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
