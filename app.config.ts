import type { TStoreMain, TStoreFlags, IConfigDocs, IAppData } from "@/types";
import assign from "lodash/assign";
import {
  PRODUCTION$,
  URL_APP_PUBLIC,
  // CLOUD_TRANSLATION_API_KEY,
} from "@/config";

const themeDark = "dark";
const themeLight = "light";
const TAG_USER_PROFILE_prefix = "@user:profile:w175I1JG:";

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
    TRANSLATION_ENABLED: true,
    TRANSLATION_DEFAULTS: {
      format: "text",
      // key: CLOUD_TRANSLATION_API_KEY
    },
  },
  docs: {
    CHAT_ORDER_COM_USER_prefix: "e5iT1p1Mmx5HD@",
    COM_PHOTOS_prefix: "@com:photos:",
    LIKEDISLIKE_CACHE_ID: "4OpsEOLNYG1wuF64OhBr",
    LIKES_preix: "@likes:",
    PRODUCT_IMAGES: "@images:product:",
    TAG_USER_PROFILE_prefix,
    TAG_USERS: "@users",
    USER_PHOTOS_prefix: "@user:photos:",
  },
  //
  key: {
    PRODUCTS_CHANGE: "O36Bjz6COY6i",
    FLAG_CART_OPEN: "OBNwu3k37w3a6H",
    APP_MOUNTED: "Zkcmk4BnXHU",
    APP_PROCESSING: "FlaelfhZddK",
    CHAT_MAIN: "cLgtZdZLXHNdstzt",
    CHAT_NAME: "QOPnfTw9",
    COM_LIKES_prefix: "Y9tqzJgln0B::",
    COM_RATING_prefix: "rating:com:SiOobaXI2QXJgHs::",
    DISLIKES_STORE: "HwJ0dv9",
    INJECT_AUTHAPI: "WYvEK29UZIP",
    INJECT_THEME: "Aasnvy2eaxE",
    LIKES_STORE: "hqYqZ31rN4xwfb2qc",
    MAILING_LIST: "cSd5Bq0rtwfHFZtQdu",
    POST_IMAGES_prefix: "CkJmp2R984QY@",
    POSTS_CHAT_prefix: "chat:posts:xztHIGAXy3sicbWP6p:",
    POSTS_LIKES_prefix: "likes:posts:2DvdBZfT7zJvwWIAu:",
    PRODUCT_RATING_prefix: "rating:products:FHj8C6t30equ4D::",
    PRODUCTS_LIKES_prefix: "MEDs6Eov9fHBM5HZ6I1X::",
    PROVIDE_APP_DATA: "Ud8dHoadmBgSr55P6gJ",
    THEME: "I0AOO9BgtWwscK7P",
    TOPIC_CHAT_COM_prefix: "chat:com:i54gyCFeLH::",
    TOPIC_CHAT_PRODUCTS_prefix: "chat:products:vyuoiOe3eZW7::",
    TOPIC_RATING_POSTS_prefix: "rating:posts:31p4idFZ7uzT7TKm:",
    TOPIC_RATINGS: "ratings:ZM2Vz8rC",
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
    cart: {
      initial: {
        // `pid:amount` map to store
        items: <Record<number, number>>{},
        // additional order information
        data: <Record<string, any>>{},
      },
    },
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
      KEY_USEFETCH_AUTHDATA: "oDgSc6Xp4kU",
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
    comPages: "business",
    storyPages: "story",
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
  firebase: {
    firestore: {
      DEFAULT_DOCS_COLLECTION: "docs:8lyrg8edl53",
    },
    messaging: {
      // Web Push certificates
      // Firebase Cloud Messaging can use Application Identity key pairs to connect with external push services.
      // #https://developers.google.com/web/updates/2016/07/web-push-interop-wins#introducing_vapid_for_server_identification
      VAPID_KEY:
        "BA5afVljVVDNRB2hf-lwSFwzAZcgVW1mYFsT65Oszp9qZIWOfZ9HTX_OXZfErx7iMXXZXv37CW8kS2H4xBJ-naE",
      // FCM_TOKEN: "EdVEeoDfdOK1",
      KEY_FCM_DEVICE_TOKENS: "4tSsVfJJb6xa1A",
    },
  },
  //
  // #https://github.com/nuxt/icon/tree/main?tab=readme-ov-file#icon-customization
  icon: {
    // size: '24px', // default <Icon> size applied
    // class: 'icon', // default <Icon> class applied
    // mode: 'css', // default <Icon> mode applied
    aliases: {
      nuxt: "logos:nuxt-icon",
    },
  },
});
