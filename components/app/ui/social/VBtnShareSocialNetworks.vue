<script setup lang="ts">
// ##imports
import { Iconx } from "@/components/icons";

// ##config
const props = withDefaults(
  defineProps<{
    item: {
      url: string;
      title?: string;
      description?: string;
      quote?: string;
      hashtags?: string;
      twitterUser?: string;
    };
    networks?: any;
    small?: boolean;
    propsMenu?: any;
    propsIconShare?: any;
    propsShareButtons?: any;
  }>(),
  {
    networks: {
      facebook: {
        icon: {
          icon: "ion:social-facebook",
          size: "1.66rem",
        },
      },
      twitter: {
        icon: {
          icon: "ri:twitter-x-fill",
          size: "1.5rem",
        },
      },
      messenger: {
        icon: {
          icon: "ri:messenger-line",
          size: "1.66rem",
        },
      },
      viber: {
        icon: {
          icon: "simple-icons:viber",
          size: "1.5rem",
        },
      },
      linkedin: {
        icon: {
          icon: "ri:linkedin-line",
          size: "1.5rem",
        },
      },
      sms: {
        icon: {
          icon: "material-symbols:sms-outline-rounded",
          size: "1.5rem",
          class: "translate-y-[2px]",
        },
      },
      email: {
        icon: {
          icon: "material-symbols:mail-outline",
          size: "1.5rem",
        },
      },
    },
  }
);
const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
// ##utils
// ##icons
// ##refs ##flags
// ##data ##auth ##state
// ##computed
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head

// @@eos
</script>
<template>
  <VBtn
    icon
    variant="text"
    class="component--VBtnShareSocialNetworks"
  >
    <slot name="icon">
      <Iconx icon="mdi:share-variant" size="1.5rem" v-bind="propsIconShare" />
    </slot>
    <VMenu
      activator="parent"
      location="center"
      :transition="DEFAULT_TRANSITION"
      v-bind="propsMenu"
    >
      <VSheet
        class="d-flex items-center"
        :class="[small ? undefined : 'gap-1 pa-2 pe-3']"
        rounded="pill"
      >
        <template v-for="(node, network) in networks" :key="network">
          <ShareNetwork :network="network" v-bind="item">
            <slot :name="`btn:${network}`" :item="node" :network="network">
              <VBtn
                icon
                variant="text"
                :density="small ? 'comfortable' : undefined"
                v-bind="propsShareButtons"
              >
                <Iconx v-if="small" v-bind="node.icon" size="1.22rem" />
                <Iconx v-else v-bind="node.icon" />
              </VBtn>
            </slot>
          </ShareNetwork>
        </template>
      </VSheet>
    </VMenu>
  </VBtn>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
