import Toast, { useToast } from "vue-toastification";
// import * as AllToasts from "vue-toastification";
// const { useToast } = AllToasts;

export default defineNuxtPlugin({
  name: "toasts",
  setup: (nuxtapp) => {
    const {
      config: { optionsVueToastificationPlugin },
    } = useAppConfig();
    nuxtapp.vueApp.use(Toast, optionsVueToastificationPlugin);
    //
    const toast = useToast();
    return {
      provide: {
        toast,
      },
    };
  },
});
