import { en, sr, srCyr } from "@/lang/messages";
import { langCodeEn, langCodeSrLatn, langCodeSrCyr } from "./i18n.lang-codes";
export default defineI18nConfig(() => ({
  legacy: false,
  locale: langCodeSrLatn,
  fallbackLocale: langCodeEn,
  // #https://vue-i18n.intlify.dev/guide/essentials/fallback.html#fallback-interpolation
  // formatFallbackMessages: true,
  messages: {
    [langCodeSrLatn]: sr,
    [langCodeSrCyr]: srCyr,
    [langCodeEn]: en,
  },
  modifiers: {
    // snakeCase: (str) => str.split(" ").join("_"),
  },
  pluralRules: {
    [langCodeSrLatn]: pluralRulesSlavic,
    [langCodeSrCyr]: pluralRulesSlavic,
  },
  // #https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  // #https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
  // d(date, 'short')
  datetimeFormats: {
    [langCodeSrLatn]: {
      short: { year: "numeric", month: "long", day: "numeric" },
      long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
    },
    [langCodeSrCyr]: {
      short: { year: "numeric", month: "long", day: "numeric" },
      long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
    },
    [langCodeEn]: {
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
    [langCodeSrLatn]: {
      currency: {
        style: "currency",
        currency: "RSD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      },
    },
    [langCodeSrCyr]: {
      currency: {
        style: "currency",
        currency: "RSD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      },
    },
    [langCodeEn]: {
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
function pluralRulesSlavic(
  choice: number,
  choicesLength: number,
  orgRule: any
) {
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
