export default defineI18nConfig(() => ({
  legacy: false,
  locale: "sr",
  fallbackLocale: "en",
  messages: {
    sr: {
      message: {
        about: "o",
        hello: "zdravo",
        apple: "jabuka | jabuka | {count} jabuke",
      },
    },
    en: {
      message: {
        about: "about",
        hello: "hello",
        apple: "apples | apple | {count} apples",
      },
    },
  },
  modifiers: {
    // snakeCase: (str) => str.split(" ").join("_"),
  },
  pluralRules: {
    sr: pluralSlavic,
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
