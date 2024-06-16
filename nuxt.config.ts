import vitePluginVuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import trimEnd from "lodash/trimEnd";
import { ENDPOINT_GRAPHQL, API_URL, URL_APP_PUBLIC, SSR } from "./config";

const BASE_DIR = process.env.BASE_DIR;

type TMeta = Record<string, string>[];
const meta: TMeta = [
  { name: "description", content: "NuxtApp" },
  { name: "theme-color", content: "#fafafa" },
];

// --force-https
// <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
if (
  // /dnofiq4anfaqwrzctj\.xyz/.test(API_URL)
  API_URL.startsWith("https")
  // || /herokuapp\.com/.test(API_URL)
)
  meta.push({
    "http-equiv": "Content-Security-Policy",
    content: "upgrade-insecure-requests",
  });

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  // # client-side rendering;
  //  prerender    .true
  //  no-prerender .false
  ssr: SSR,

  // #hybrid-rendering
  // #https://nuxt.com/docs/getting-started/server#hybrid-rendering
  // #https://nuxt.com/docs/guide/concepts/rendering#:~:text=defineNuxtConfig(%7B-,routeRules,-%3A%20%7B
  // routeRules: {
  //   // Generated at build time for SEO purpose
  //   // "/": { prerender: true },
  //   // "/o-nama": { prerender: true },
  //   // Cached for 1 hour
  //   // "/api/*": { cache: { maxAge: 60 * 60 } },
  //   // Redirection to avoid 404
  //   // "/old-page": {
  //   //   redirect: { to: "/new-page", statusCode: 302 },
  //   // },
  //   // ...
  // },
  //
  // #Selective Pre-rendering @nitro
  // nitro: {
  //   prerender: {
  //     // routes: ['/user/1', '/user/2'],
  //     // ignore: ["/dynamic"],
  //   },
  // },
  // target: "static",
  // generate: { routes: [] },

  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    // https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // --at-ts-expect-error
        // config.plugins.push(vitePluginVuetify({ autoImport: true }));
        try {
          config.plugins &&
            config.plugins.push(
              vitePluginVuetify({
                autoImport: true,
                styles: {
                  configFile: "assets/styles/vuetify/settings.scss",
                },
              })
            );
        } catch (error) {
          // ignore
        }
      });
    },
    // https://apollo.nuxtjs.org/getting-started/quick-start
    "@nuxtjs/apollo",
  ],

  build: {
    transpile: ["vuetify"],
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      // apiBase: '/api'
    },
  },

  // hooks: {
  //   // # append dirs, extending default path
  //   // "components:dirs": (dirs) => {
  //   //   dirs.push({
  //   //     path: "/path",
  //   //     prefix: "App",
  //   //   });
  //   // },
  // },

  // include auto import dirs, overriding default path
  // components: [
  //   // {
  //   //   path: "/path",
  //   //   prefix: "App",
  //   // },
  // ],

  imports: {
    // @unimport
    // #disable auto-imports; use explicit imports from #imports
    // autoImport: false
    dirs: ["./keys"],
    //
    // presets: [
    //   {
    //     from: "lodash",
    //     imports: [
    //       "assign",
    //       "each",
    //       "escapeRegExp",
    //       "forEach",
    //       "get",
    //       "hasOwn",
    //       "noop",
    //       "once",
    //       "set",
    //       "some",
    //       "transform",
    //       "trimEnd",
    //       "uniqueId",
    //       "unset",
    //       {
    //         name: "get",
    //         as: "getPath",
    //       },
    //     ],
    //     // imports: [{ name: "get", as: "lodashGet" }],
    //   },
    // ],
  },

  app: {
    baseURL: BASE_DIR,
    buildAssetsDir: `${trimEnd(BASE_DIR, "/")}/_nuxt/`,
    //
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "app",
      titleTemplate: "%s | nikolav.rs",
      // https://www.geeksforgeeks.org/meta-tags-in-nuxt-js/
      meta,
      //
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
      ],
      bodyAttrs: {
        // class: "dark:selection:bg-white/20 scrollbar-thin-light",
      },
      noscript: [{ children: "JavaScript is required" }],
    },
    // transition pages
    pageTransition: { name: "BLUR", mode: "in-out" },
    // transition layouts
    layoutTransition: { name: "BLUR" },
  },

  css: [
    // default
    "~/assets/styles/main.scss",

    // vuetify
    "@mdi/font/css/materialdesignicons.css",
    "vuetify/lib/styles/main.sass",

    // plugin styles
    "animate.css",
    "@fancyapps/ui/dist/fancybox/fancybox.css",

    // https://github.com/surmon-china/videojs-player
    "video.js/dist/video-js.css",
  ],

  // https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/globals.scss" as *;',
        },
      },
    },
    define: {
      "process.env.DEBUG": false,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  i18n: {
    vueI18n: "./config/i18n.config.ts",
    defaultLocale: "sr-Latn-RS",
    baseUrl: URL_APP_PUBLIC,
    locales: [
      {
        code: "en",
        iso: "en",
        name: "English",
      },
      {
        code: "sr-Cyrl-RS",
        iso: "sr-Cyrl-RS",
        name: "Српски",
      },
      {
        code: "sr-Latn-RS",
        iso: "sr-Latn-RS",
        name: "Srpski",
        isCatchallLocale: true,
      },
    ],
    strategy: "prefix_and_default",
    customRoutes: "config",
    pages: {
      // demo: {
      //   en: "/demo",
      //   "sr-Cyrl-RS": "/prikaz-cyr",
      //   "sr-Latn-RS": "/prikaz",
      // },
    },
  },

  // #https://google-fonts.nuxtjs.org
  googleFonts: {
    families: {
      "Open+Sans": true,
      Roboto: true,
    },
    useStylesheet: true,
    download: false,
  },

  // https://image.nuxt.com/get-started/configuration
  image: {
    // quality: 92,
    // # globally initialize an $img helper
    // inject: true,
    // format: ["webp"],
    // domains: ["nuxtjs.org"],
    //
    // The screen sizes predefined by `@nuxt/image`:
    // screens: {
    //   xs: 320,
    //   sm: 640,
    //   md: 768,
    //   lg: 1024,
    //   xl: 1280,
    //   xxl: 1536,
    //   "2xl": 1536,
    // },
  },

  colorMode: {
    // preference: "system", // default value of $colorMode.preference
    // fallback: "light", // fallback value if not system preference found
    // hid: "nuxt-color-mode-script",
    // globalName: "__NUXT_COLOR_MODE__",
    // componentName: "ColorScheme",
    // classPrefix: "",
    classSuffix: "",
    // storageKey: "nuxt-color-mode",
  },

  tailwindcss: {
    cssPath: "~/assets/tailwind.css",
    configPath: "~/config/tailwind.config.ts",
    // # Import fully resolved config
    // # import tailwindConfig from '#tailwind-config'
    exposeConfig: true,
    // # Extend the Tailwind config
    // config: {},
    // injectPosition: 0,
    viewer: false,
  },

  experimental: {
    scanPageMeta: true,
    // typedPages: true,
  },

  // https://apollo.nuxtjs.org/getting-started/configuration#configuration
  // https://apollo.nuxtjs.org/getting-started/configuration#clients
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: ENDPOINT_GRAPHQL,
        httpLinkOptions: {
          // Enable sending cookies over cross-origin requests
          credentials: "include",
        },
        tokenName: "@apollo/token:l7iPx",
      },
    },
  },
});
