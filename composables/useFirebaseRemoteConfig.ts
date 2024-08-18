import { remoteConfig } from "@/services/firebase";
import { type Value, getValue } from "firebase/remote-config";

export const useFirebaseRemoteConfig = () => {
  const config = async (
    PATH: string,
    valueOf = (v: Value): any => v.asString()
  ) => {
    const rc = await remoteConfig();
    return rc ? computed(() => valueOf(getValue(rc, PATH))) : undefined;
  };
  return {
    config,
  };
};
