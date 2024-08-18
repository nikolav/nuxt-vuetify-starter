import { remoteConfig } from "@/services/firebase";
import { type Value, getValue } from "firebase/remote-config";

export const useFirebaseRemoteConfig = () => {
  const config = async (
    PATH: string,
    valueOf = (v: Value): any => v.asString()
  ) => {
    const serviceRC = await remoteConfig();
    return serviceRC
      ? computed(() => valueOf(getValue(serviceRC, PATH)))
      : undefined;
  };
  return config;
};
