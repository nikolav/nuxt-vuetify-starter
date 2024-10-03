import { auth as firebaseAuth } from "@/services/firebase";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { URL_AUTH_social } from "@/config";

export const useStoreApiAuthProvideSocial = defineStore(
  "auth-provide-social",
  () => {
    const authApi = useStoreApiAuth();
    const addAuthData$ = ref();

    onAuthStateChanged(firebaseAuth, async (authData) => {
      if (authApi.isAuthenticated$) return;
      if (!authData) return;
      console.log({ "auth:social --debug": authData });

      // send all social authData { auth: authData }
      //  register/login.. get { token }
      //   set token authApi.tokenPut(token)
      authApi.tokenPut(
        get(
          await $fetch(URL_AUTH_social, {
            method: "POST",
            body: { ...addAuthData$.value, auth: authData },
          }),
          "token"
        ) || ""
      );
    });

    const loginFacebook = async (data?: Record<string, any>) => {
      addAuthData$.value = data;
      await signInWithPopup(firebaseAuth, new FacebookAuthProvider());
    };
    const loginGoogle = async (data?: Record<string, any>) => {
      addAuthData$.value = data;
      await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
    };

    return {
      api: authApi,
      loginGoogle,
      loginFacebook,
    };
  }
);
