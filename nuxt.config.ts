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
if (API_URL.startsWith("https"))
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
  // Set prerender to true to configure it to be prerendered
  // "/rss.xml": { prerender: true },
  // Set it to false to configure it to be skipped for prerendering
  // "/this-DOES-NOT-get-prerendered": { prerender: false },
  // Everything under /blog gets prerendered as long as it
  // is linked to from another page
  // "/blog/**": { prerender: true },

  //   // ...
  // },
  //
  // #Selective Pre-rendering @nitro
  // #https://nuxt.com/docs/getting-started/prerendering#selective-pre-rendering
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
    // "@nuxtjs/i18n",
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
    // https://auto-animate.formkit.com/#usage-vue
    "@formkit/auto-animate/nuxt",
  ],

  build: {
    transpile: ["vuetify"],
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      // fooBar: process.env.var
    },
  },

  hooks: {
    //   // # append dirs, extending default path
    //   // "components:dirs": (dirs) => {
    //   //   dirs.push({
    //   //     path: "/path",
    //   //     prefix: "App",
    //   //   });
    // async "prerender:routes"(ctx) {
    //   const { pages } = await fetch("https://api.some-cms.com/pages").then(
    //     (res) => res.json()
    //   );
    //   for (const page of pages) {
    //     ctx.routes.add(`/${page.name}`);
    //   }
    // },
  },

  // },

  // include auto import dirs
  //  OVERRIDING default path
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
    presets: [
      {
        from: "lodash/get",
        imports: [
          {
            name: "default",
            as: "get",
          },
        ],
      },
      {
        from: "lodash/identity",
        imports: [{ name: "default", as: "identity" }],
      },
      {
        from: "lodash/range",
        imports: [{ name: "default", as: "range" }],
      },
      {
        from: "lodash/pullAll",
        imports: [{ name: "default", as: "pullAll" }],
      },
      {
        from: "lodash/size",
        imports: [{ name: "default", as: "len" }],
      },
      {
        from: "validator/lib/isEmail",
        imports: [{ name: "default", as: "isEmail" }],
      },
    ],
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
      // titleTemplate: "%s | nikolav.rs",
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
    // quality: 80,
    // # globally initialize an $img helper
    // inject: true,
    // format: ["webp"],
    // #allow domains to be optimized
    // domains: ["nuxtjs.org"],
    //
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
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
    // inlineRouteRules: true,
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

  icon: {
    // componentName: "NuxtIcon",
    // #https://github.com/nuxt/icon?tab=readme-ov-file#custom-local-collections
    // provider: SSR ? undefined : "server",
    // provider: "server",
    // customCollections: [
    // {
    //   prefix: "my-icon",
    //   dir: "./assets/my-icons",
    // },
    // ],
  },
});
