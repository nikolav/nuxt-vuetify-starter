import { app as firebaseApp } from "@/services/firebase";
import { getToken, onMessage } from "firebase/messaging";
interface IFCMOptions {
  // app@foreground/focused
  onMessage: (...args: any[]) => void;
}
import {
  isSupported as messagingIsSupported,
  getMessaging,
} from "firebase/messaging";
export const useFirebaseCloudMessaging = (options: IFCMOptions) => {
  // messaging service --init
  const serviceCM = ref();
  messagingIsSupported().then((isSupported) => {
    if (isSupported) {
      try {
        serviceCM.value = getMessaging(firebaseApp);
      } catch (error) {
        // --debug
        console.error({ "getMessaging:error": error });
      }
    }
  });

  const {
    firebase: {
      messaging: { VAPID_KEY },
    },
  } = useAppConfig();
  const auth = useStoreApiAuth();
  // tokens: Ref<Record<string:token, boolean:valid> | undefined>
  const { tokens, commit: tokenSet } = useDocTokens();

  // subscribe when service available
  watch(
    [() => auth.isAuthenticated$, () => serviceCM.value],
    async ([isAuthenticated, client]) => {
      if (!isAuthenticated) return;
      if (!client) return;
      try {
        // token:cache for server:push
        const tokenFCM = await getToken(client, { vapidKey: VAPID_KEY });
        if (tokenFCM && !get(tokens.value, tokenFCM))
          await tokenSet(tokenFCM, true);
        // subscribe
        onMessage(client, options.onMessage);
      } catch (error) {
        // --debug
        console.error({ "useFirebaseCloudMessaging:getToken": error });
      }
    },
    {
      // options --pass
    }
  );
  // const unsubscribe = onMessage(serviceFCM, options.onMessage);
  // --debug
  watchEffect(() => {
    console.log({ "TOKENS:fcm": tokens.value });
  });

  return {
    tokens,
  };
};

// eZpHzgB-gPkyPmSpSdxbkM:APA91bGP-QPnrgvpAcDmUZpWYuhX3FChOSzcUE07nMofBojroSTiun5aRME4WmHu1-G6LoEuvJ-vyGst95PYwj8Dsa9g5ekkt4yDPKTgKss5xGkUmQ1B8Q6WwZkfQ86IkugK21mriWh3
// duxCWVRBOd6TVpTa5Owm-x:APA91bGeavyRk4gYcs--3l9QLz3KwBxFa4CN9oJUS9pUmKHQrqOcqU6E6MOIiMHNMmNg2Oh7T2VjYrmnxiHlJeWtsmUBGz055c0-gwiE7WP1lepIZ2qFkuXfcTlQb2mtSF9hKNiO5m1v
