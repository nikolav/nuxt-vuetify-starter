import type { TStoreMain, TStoreFlags, IConfigDocs, IAppData } from "@/types";
import assign from "lodash/assign";
import { PRODUCTION$, URL_APP_PUBLIC } from "@/config";

const themeDark = "dark";
const themeLight = "light";
const TAG_USER_PROFILE_prefix = "@user:profile:6wSQNhAi:";

export default defineAppConfig({
  ADMIN_EMAIL: "admin@nikolav.rs",
  DEBUG: true !== PRODUCTION$,
  APP_USER_DEFAULT: {
    email: "korisnik@nikolav.rs",
    password: "korisnik@nikolav.rs",
  },
  app: {
    DEFAULT_TRANSITION: "slide-y-reverse-transition",
    DEFAULT_NO_IMAGE: "/no-image.jpg",
  },
  docs: {
    USER_PHOTOS_prefix: "@user:photos:",
    LIKEDISLIKE_CACHE_ID: "4OpsEOLNYG1wuF64OhBr",
    LIKES_preix: "@likes:",
    TAG_USER_PROFILE_prefix,
    TAG_USERS: "@users",
  },
  //
  key: {
    APP_MOUNTED: "Zkcmk4BnXHU",
    APP_PROCESSING: "FlaelfhZddK",
    CHAT_NAME: "QOPnfTw9",
    DISLIKES_STORE: "HwJ0dv9",
    INJECT_AUTHAPI: "WYvEK29UZIP",
    INJECT_THEME: "Aasnvy2eaxE",
    LIKES_STORE: "hqYqZ31rN4xwfb2qc",
    PROVIDE_APP_DATA: "Ud8dHoadmBgSr55P6gJ",
    THEME: "I0AOO9BgtWwscK7P",
    USER_CONFIG_PREFERENCES: "config:98BAXCnOynhYgm640So:",
  },
  //
  FIELDS_OMIT_STORAGE_META: ["id", "created_at", "updated_at", "__typename"],
  //
  DEFAULT_CONFIG_useApiDocs: <IConfigDocs>{ autoReload: true },
  defaults: {
    appData: <IAppData>{
      "admin:email": "admin@nikolav.rs",
    },
  },
  //
  api: {
    TAG_STORAGE: "@storage:",
  },
  //
  graphql: {
    // ~10min autoreload*
    STORAGE_QUERY_POLL_INTERVAL: 712345,
  },
  //
  stores: {
    gravatars: {
      BASE_URL: "https://www.gravatar.com/avatar",
      GRAVATARS_CACHE: "gravatars:DKueKjfBLJlRj7k",
      MODE: {
        monsterid: true,
        wavatar: true,
        robohash: true,
      },
      SIZE: 92,
    },
    main: {
      initial: <TStoreMain>{
        "app:name": "nikolav.rs",
      },
    },
    flags: {
      initial: <TStoreFlags>{},
    },
    auth: {
      KEY_ACCESS_TOKEN: ":sEe5xYuTL4q",
      KEY_USEFETCH_AUTHDATA: "GEXjh1kt9Oc",
      authDataFields: ["id", "email"],
      initial: () => "",
      authHeaders: (token: string, additional?: Record<string, any>) =>
        assign(
          token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
          additional || {}
        ),
    },
  },
  //
  io: {
    IOEVENT_AUTH_NEWUSER: "@auth:newuser",
    IOEVENT_COM_PHOTOS_CHANGE_prefix: "change:com-photos:",
    IOEVENT_DOC_CHANGE_prefix: "change://doc@",
    IOEVENT_DOCS_CHANGE_JsonData: "change:docs:JsonData:",
    IOEVENT_DOCS_CHANGE: "change:docs",
    IOEVENT_DOCS_TAGS_CHANGE_prefix: "change:docs:tags:",
    IOEVENT_FILES: "@files:updated",
    IOEVENT_ORDER_PRODUCTS_DELIVERY_AT: "5jzXPwQZmSnh2i5NTg:",
    IOEVENT_ORDER_PRODUCTS_STATUS: "GXV5QkH2yjmZ:",
    IOEVENT_ORDER_UPDATED: "@change:orders:xFeTiEWutrmUxHNp:",
    IOEVENT_ORDERS_CHANGE: "@orders:change:",
    IOEVENT_PACKAGES_PROMOTED_prefix: "@packages:promoted:",
    IOEVENT_POST_CHANGE_SINGLE_prefix: "@change:post:4alBPKP:",
    IOEVENT_POSTS_CHANGE: "@change:posts:GCe5RKIXQWDh",
    IOEVENT_PRODUCT_IMAGES_CHANGE_prefix: "change:product-images:",
    IOEVENT_PRODUCTS_CHANGE_prefix: "change:products::",
    IOEVENT_PRODUCTS_CHANGE_SINGLE_prefix: "change:products:DkL11YfpPI:",
    IOEVENT_PRODUCTS_CHANGE: "@change:products:all",
    IOEVENT_STORAGE_CHANGE: "@storage:",
    IOEVENT_STORY_PHOTOS_CHANGE_prefix: "@change:story:images:VDMf82FNKpfl6m:",
    IOEVENT_USER_POSTS_CHANGE_prefix: "@change:posts:rBN5PAj9uZM9wrOq5:",
  },
  theme: {
    DEFAULT: themeLight,
    DARK: themeDark,
    LIGHT: themeLight,
  },
  layout: {
    appBarHeight: 52,
    offsetTop: "1.22rem",
  },
  effect: {
    default: "headShake",
    duration: 890,
  },
  urls: {
    appPublic: URL_APP_PUBLIC,
    github: "https://github.com/nikolav/nuxtflask",
    QUERY: "q",
    TRANSLATION_ENDPOINT:
      "https://translation.googleapis.com/language/translate/v2",
  },
  storage: {
    MENU_CATEGORY: "7n0FS9ZxoVN",
  },
  links: {
    external: {
      GOOGLE_CALENDAR_EDIT_PAGE:
        "https://calendar.google.com/calendar/u/0?cid=dnVrb3ZpY25pa29sYTIwMTRAZ21haWwuY29t",
      SRC_GOOGLE_CALENDAR_IFRAME:
        "https://calendar.google.com/calendar/embed?height=480&wkst=2&ctz=Europe%2FBelgrade&bgcolor=%23ffffff&showTitle=0&showTabs=0&showCalendars=0&hl=sr&src=ZW4ucnMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uaXNsYW1pYyNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000&color=%237CB342",
    },
  },
  re: {},
  SEO: {
    title: "app.rs",
    ogTitle: "app.rs",
    description: "app.rs",
    ogDescription: "app.rs",
    ogImage: "https://nikolav.rs/app-rs-logo.png",
  },
  pdf: {
    DEFAULT_DOWNLOAD_FILENAME: "DEFAULT.pdf",
  },
  date: {
    ISO_FORMAT: "YYYY-MM-DD HH:mm:ss.SSSSSS",
  },
});
