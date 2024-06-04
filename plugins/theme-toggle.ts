export default defineNuxtPlugin((_nuxtapp) => {
  const cm$ = useColorMode();
  const {
    theme: { DARK, LIGHT, DEFAULT },
  } = useAppConfig();
  const theme = computed(() => cm$.preference || DEFAULT);
  const themeToggle = (mode?: string | undefined) => {
    cm$.preference = mode || (DARK !== theme.value ? DARK : LIGHT);
  };

  return {
    provide: {
      theme: {
        theme,
        themeToggle,
      },
    },
  };
});
