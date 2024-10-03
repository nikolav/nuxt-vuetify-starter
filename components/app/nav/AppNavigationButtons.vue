<script setup lang="ts">
import { useDisplay } from "vuetify";
import NAV from "~/assets/app/nav.json";
import SUBNAV from "~/assets/app/subnav.json";

const props = withDefaults(defineProps<{ subnav?: boolean }>(), {
  subnav: false,
});

const route = useRoute();
const { smAndUp } = useDisplay();

const NAV$ = props.subnav ? get(SUBNAV, String(route.name).split("-")[0]) : NAV;
// @@eos
</script>
<template>
  <NuxtLink v-for="(node, i) in NAV$" :key="node.title" :to="{ name: node.to }">
    <VBtn
      :class="[
        smAndUp && i < NAV$.length ? `mb-2` : undefined,
        smAndUp ? 'd-block mx-auto' : undefined,
      ]"
      icon
      variant="plain"
      :color="
        node.to == route.name ? 'primary' : 'secondary'
      "
    >
      <VIcon
        v-if="node.icon.startsWith('$')"
        :icon="node.icon"
        :size="node?.size || '1em'"
      />
      <Icon v-else :size="node?.size || '1rem'" :name="node.icon" />
    </VBtn>
  </NuxtLink>
</template>
<style lang="scss" scoped></style>
