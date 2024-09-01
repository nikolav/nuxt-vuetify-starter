import { remoteConfig } from "@/services/firebase";
import { type Value, getValue } from "firebase/remote-config";

export const useFirebaseRemoteConfig = () => {
  const serviceRC = ref();
  remoteConfig().then((client) => {
    serviceRC.value = client;
  });
  const config = (PATH: string, valueOf = (v: Value): any => v.asString()) =>
    computed(() =>
      serviceRC.value ? valueOf(getValue(serviceRC.value, PATH)) : null
    );
  return config;
};
