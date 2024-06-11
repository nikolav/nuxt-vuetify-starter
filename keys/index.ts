import type { InjectionKey, Ref } from "vue";

export const UID = <InjectionKey<Ref<string | undefined>>>Symbol();
