<script setup lang="ts">
// ##imports
// ##config
const props = defineProps<{ aid: any }>();
// ##utils
const { firebasePathAssets } = useTopics();
// ##icons
// ##refs
const images = ref<string[]>([]);
// ##state ##data ##auth
const { ls, url } = useFirebaseStorage(() => firebasePathAssets(props.aid));
// ##computed
// ##forms ##helpers
// ##watch
// ##hooks:lifecycle
useOnceMountedOn(true, async () => {
  images.value = await Promise.all(
    map(await ls(), async (node) => await url(node.name))
  );
});

// @@eos
</script>
<template>
  <slot :images="images" />
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
