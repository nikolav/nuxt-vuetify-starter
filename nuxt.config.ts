// import vitePluginVuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// import { ENDPOINT_GRAPHQL, API_URL } from "./config";
// import { stripSlashesEnd } from "./utils/strip-slashes-end";
import trimEnd from "lodash/trimEnd";

const BASE_DIR = process.env.BASE_DIR;

type TMeta = Record<string, string>[];
const meta: TMeta = [
  { name: "description", content: "NuxtApp" },
  { name: "theme-color", content: "#fafafa" },
];

// --force-https
// <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
// if (
//   /dnofiq4anfaqwrzctj\.xyz/.test(API_URL)
//   // API_URL.startsWith("https")
//   // || /herokuapp\.com/.test(API_URL)
// )
//   meta.push({
//     "http-equiv": "Content-Security-Policy",
//     content: "upgrade-insecure-requests",
//   });

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  // # client-side only rendering; no prerender
  // ssr: false,

  // target: "static",
  // generate: { routes: [] },

  // #https://nuxt.com/docs/guide/concepts/rendering#:~:text=defineNuxtConfig(%7B-,routeRules,-%3A%20%7B
  // routeRules: {
  //   "/": { prerender: true },
  // },
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
  ],
  build: {
    // transpile: ["vuetify"],
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      // apiBase: '/api'
    },
  },
  hooks: {
    // # append dirs, extending default path
    // "components:dirs": (dirs) => {
    //   dirs.push({
    //     path: "/path",
    //     prefix: "App",
    //   });
    // },
  },
  // include auto import dirs, overriding default path
  components: [
    // {
    //   path: "/path",
    //   prefix: "App",
    // },
  ],
  imports: {
    // @unimport
    // #disable auto-imports; use explicit imports from #imports
    // autoImport: false
    dirs: ["./keys"],
    //
    presets: [
      {
        from: "lodash",
        imports: ["get", "trimEnd"],
        // imports: [{ name: "get", as: "lodashGet" }],
      },
    ],
  },
  app: {
    baseURL: BASE_DIR,
    buildAssetsDir: `${trimEnd(BASE_DIR, "/")}/_nuxt/`,
    //
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "",
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
    // pageTransition: { name: "BLUR", mode: "in-out" },
    // transition layouts
    // layoutTransition: { name: "BLUR" },
    // layoutTransition: false,
  },
  css: [
    // default
    "~/assets/styles/main.scss",
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
      // "process.env.DEBUG": false,
    },
    // vue: {
    //   template: {
    //     transformAssetUrls,
    //   },
    // },
  },

  //
  // #hybrid-rendering
  // #https://nuxt.com/docs/getting-started/server#hybrid-rendering
  // routeRules: {
  //   // Generated at build time for SEO purpose
  //   "/": { prerender: true },
  //   // Cached for 1 hour
  //   "/api/*": { cache: { maxAge: 60 * 60 } },
  //   // Redirection to avoid 404
  //   "/old-page": {
  //     redirect: { to: "/new-page", statusCode: 302 },
  //   },
  //   // ...
  // },
  //
  // #Selective Pre-rendering @nitro
  // nitro: {
  //   prerender: {
  //     // routes: ["/"],
  //     // ignore: ["/dynamic"],
  //   },
  // },
  //
  // @tw
  // tailwindcss: {
  //   cssPath: "~/assets/tailwind.css",
  //   configPath: "~/config/tailwind.config.ts",
  //   //
  //   // # Import fully resolved config
  //   // # import tailwindConfig from '#tailwind-config'
  //   exposeConfig: true,
  //   // config: {},
  //   // injectPosition: 0,
  //   viewer: false,
  // },
  // colorMode: {
  //   // preference: "system", // default value of $colorMode.preference
  //   // fallback: "light", // fallback value if not system preference found
  //   // hid: "nuxt-color-mode-script",
  //   // globalName: "__NUXT_COLOR_MODE__",
  //   // componentName: "ColorScheme",
  //   // classPrefix: "",
  //   classSuffix: "",
  //   // storageKey: "nuxt-color-mode",
  // },

  // #https://google-fonts.nuxtjs.org
  // googleFonts: {
  //   families: {
  //     "Open+Sans": true,
  //     "Roboto+Mono": true,
  //   },
  //   useStylesheet: true,
  //   download: false,
  // },

  // https://image.nuxt.com/get-started/configuration
  // image: {
  //   // quality: 92,
  //   // inject: true,
  //   // format: ["webp"],
  //   // domains: ["nuxtjs.org"],
  //   //
  //   // The screen sizes predefined by `@nuxt/image`:
  //   // screens: {
  //   //   xs: 320,
  //   //   sm: 640,
  //   //   md: 768,
  //   //   lg: 1024,
  //   //   xl: 1280,
  //   //   xxl: 1536,
  //   //   "2xl": 1536,
  //   // },
  // },

  // https://apollo.nuxtjs.org/getting-started/configuration#configuration
  // https://apollo.nuxtjs.org/getting-started/configuration#clients
  // apollo: {
  //   autoImports: true,
  //   authType: "Bearer",
  //   authHeader: "Authorization",
  //   tokenStorage: "cookie",
  //   proxyCookies: true,
  //   clients: {
  //     default: {
  //       httpEndpoint: ENDPOINT_GRAPHQL,
  //       httpLinkOptions: {
  //         // Enable sending cookies over cross-origin requests
  //         credentials: "include",
  //       },
  //       tokenName: "@apollo/token:McW3G38G4ic",
  //     },
  //   },
  // },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  i18n: {
    vueI18n: "./config/i18n.config.ts",
    defaultLocale: "sr",
    locales: ["sr", "en"],
    strategy: "prefix_and_default",
    customRoutes: "config",
    pages: {
      "o-nama": {
        en: "/about",
        sr: "/o-nama",
      },
    },
  },
  experimental: {
    scanPageMeta: true,
  },
  // #https://google-fonts.nuxtjs.org
  googleFonts: {
    families: {
      "Open+Sans": true,
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
});
