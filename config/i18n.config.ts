import { en, sr, srCyr } from "@/lang/messages";
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "sr-Latn-RS",
  fallbackLocale: ["en", "sr-Latn-RS"],
  // #https://vue-i18n.intlify.dev/guide/essentials/fallback.html#fallback-interpolation
  // formatFallbackMessages: true,
  messages: {
    "sr-Latn-RS": sr,
    "sr-Cyrl-RS": srCyr,
    en,
  },
  modifiers: {
    // snakeCase: (str) => str.split(" ").join("_"),
  },
  pluralRules: {
    "sr-Latn-RS": pluralSlavic,
    "sr-Cyrl-RS": pluralSlavic,
  },
  // #https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  // d(date, 'short')
  datetimeFormats: {
    "sr-Latn-RS": {
      short: { year: "numeric", month: "long", day: "numeric" },
      long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
    },
    "sr-Cyrl-RS": {
      short: { year: "numeric", month: "long", day: "numeric" },
      long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
    },
    en: {
      short: { year: "numeric", month: "2-digit", day: "2-digit" },
      long: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
      },
    },
  },
  // #https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  // #https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
  // n(122333, 'currency')
  numberFormats: {
    "sr-Latn-RS": {
      currency: {
        style: "currency",
        currency: "RSD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      },
    },
    "sr-Cyrl-RS": {
      currency: {
        style: "currency",
        currency: "RSD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      },
    },
  },
}));

// helpers
function pluralSlavic(choice: number, choicesLength: number, orgRule: any) {
  if (choice === 0) {
    return 0;
  }

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;
  if (!teen && endsWithOne) {
    return 1;
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }

  return choicesLength < 4 ? 2 : 3;
}
