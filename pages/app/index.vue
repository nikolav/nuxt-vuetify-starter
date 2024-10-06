<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { status: FCMStatus, ping: FCMPing } = useMutationCloudMessagingPing();
const { send: viberSend } = useViberChannels();
const viberSendText = async () => {
  const content = `foo@${idGen()}`;
  console.log(`sending viber message: [${content}]`);
  console.log(
    await viberSend.text({
      "nikolav:default": content,
    })
  );
};

// @@eos
</script>
<template>
  <section class="page--dashboard">
    <h1>app</h1>
    <VBtn @click="FCMPing">FCM:ping</VBtn>
    <VBtn @click="viberSendText">viberSendText</VBtn>
    <Dump :data="{ FCMStatus }" />
  </section>
</template>
<style lang="scss" scoped></style>
