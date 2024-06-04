<script setup lang="ts">
// For Nuxt 3
definePageMeta({
  colorMode: "light",
});
const cm$ = useColorMode();

const cmtoggle = () => {
  cm$.preference = "light" != cm$.preference ? "light" : "dark";
};

// @@eos
</script>
<template>
  <section class="page--index">
    <button @click="cmtoggle">cm</button>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In reiciendis id
      eius perspiciatis culpa dolorum laboriosam nisi possimus suscipit, amet
      corporis laudantium repellendus! Rem quibusdam nostrum ab eos esse? A.
    </p>
  </section>
</template>
<style lang="scss" scoped></style>
