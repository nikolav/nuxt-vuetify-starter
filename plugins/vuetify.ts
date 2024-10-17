import "vuetify/styles";
import {
  createVuetify,
  // ThemeDefinition
} from "vuetify";
import { md2 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { light, dark } from "@/assets/themes";
import { SSR } from "@/config";
import {
  IconAccountKey,
  IconAppCogFill,
  IconBellOffOutline,
  IconFactory,
  IconFrikomLogo,
  IconKeyWriteFill,
  IconUsersGroup,
  IconBox3DEdit,
} from "@/components/icons";

import { srLatn } from "vuetify/locale";

// # --default-light-theme
// const demoLightTheme: ThemeDefinition = {
//   dark: false,
//   colors: {
//     background: '#FFFFFF',
//     surface: '#FFFFFF',
//     primary: '#6200EE',
//     secondary: '#03DAC6',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   }
// };

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: SSR,
    blueprint: md2,

    // @useDisplay composable configuration options
    // https://next.vuetifyjs.com/en/features/display-and-platform/#interface
    // display: {
    //   mobileBreakpoint: "sm",
    //   thresholds: {
    //     xs: 0,
    //     sm: 340,
    //     md: 540,
    //     lg: 800,
    //     xl: 1280,
    //   },
    // },

    // https://next.vuetifyjs.com/en/features/theme/
    // https://next.vuetifyjs.com/en/features/theme/#theme-object-structure
    theme: {
      defaultTheme: "light",
      themes: {
        light,
        dark,
      },
      variations: {
        colors: [
          "primary",
          "secondary",
          "success",
          "info",
          "warning",
          "error",
          "primary2",
          "primary3",
          "accent1",
          "accent2",
          "complement",
        ],
        lighten: 5,
        darken: 5,
      },
    },

    // aliases: {
    //   MyButton: VBtn,
    //   MyButtonAlt: VBtn,
    // },

    // component/alias props
    defaults: {
      global: {
        // ripple: true,
      },
      // MyButton: {
      //   color: 'primary',
      //   variant: 'tonal',
      // },
      // VCard: {
      //   MyButton: { color: 'secondary' },
      //   VBtn: { color: 'primary' },
      // },
      VCol: {
        cols: 12,
      },
      // <CustomComponent>: {
      //   "foo:1": "bar",
      // },
    },

    icons: {
      defaultSet: "mdi",
      aliases: {
        ...aliases,
        // # override
        // menu: IconMenu,
        // # add: <VIcon icon="$other">
        // iconCustom: IconCustom,
        iconFrikomLogo: IconFrikomLogo,
        iconFactory: IconFactory,
        iconAppCogFill: IconAppCogFill,
        iconUsersGroup: IconUsersGroup,
        iconBellOffOutline: IconBellOffOutline,
        iconKeyWriteFill: IconKeyWriteFill,
        iconAccountKey: IconAccountKey,
        iconBox3DEdit: IconBox3DEdit,
      },
      sets: {
        mdi,
      },
    },
    locale: {
      locale: "srLatn",
      messages: { srLatn },
      // fallback: "en",
      // locale: 'zhHans',
      // messages: { zhHans, pl, sv }
    },
    date: {
      locale: {
        srLatn: "sr-Latn-RS",
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});

// interface IconAliases {
//   [name: string]: IconValue;
//   calendar: IconValue;
//   cancel: IconValue;
//   checkboxIndeterminate: IconValue;
//   checkboxOff: IconValue;
//   checkboxOn: IconValue;
//   clear: IconValue;
//   close: IconValue;
//   complete: IconValue;
//   delete: IconValue;
//   delimiter: IconValue;
//   dropdown: IconValue;
//   edit: IconValue;
//   error: IconValue;
//   expand: IconValue;
//   file: IconValue;
//   first: IconValue;
//   info: IconValue;
//   last: IconValue;
//   loading: IconValue;
//   menu: IconValue;
//   minus: IconValue;
//   next: IconValue;
//   plus: IconValue;
//   prev: IconValue;
//   radioOff: IconValue;
//   radioOn: IconValue;
//   ratingEmpty: IconValue;
//   ratingFull: IconValue;
//   ratingHalf: IconValue;
//   sortAsc: IconValue;
//   sortDesc: IconValue;
//   subgroup: IconValue;
//   success: IconValue;
//   unfold: IconValue;
//   warning: IconValue;
// }
