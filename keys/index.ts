import type { InjectionKey, Ref } from "vue";

export const key_UID = <InjectionKey<Ref<string | undefined>>>Symbol();
export const key_TOKEN = <InjectionKey<Ref<string | undefined>>>Symbol();
export const key_REF_APPMAIN = <InjectionKey<Ref>>Symbol();
export const key_USER_DISPLAY_NAME = <InjectionKey<Ref>>Symbol();
