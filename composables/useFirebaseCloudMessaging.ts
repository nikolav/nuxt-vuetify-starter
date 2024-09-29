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
  const {
    firebase: {
      messaging: { VAPID_KEY },
    },
  } = useAppConfig();
  const auth = useStoreApiAuth();
  const service = ref();
  // tokens: Ref<Record<string:token, boolean:valid> | undefined>
  const { tokens, commit: commitToken } = useDocUserDeviceTokens();
  messagingIsSupported().then((isSupported) => {
    if (isSupported) {
      try {
        service.value = getMessaging(firebaseApp);
      } catch (error) {
        // --debug
        console.error({ "getMessaging:error": error });
      }
    }
  });
  // subscribe when service available
  watch(
    [() => auth.isAuthenticated$, () => service.value],
    async ([isAuthenticated, client]) => {
      if (!isAuthenticated) return;
      if (!client) return;
      try {
        // token:cache for server:push
        const tokenClientFCM = await getToken(client, { vapidKey: VAPID_KEY });
        if (tokenClientFCM && !hasOwn(tokens.value, tokenClientFCM))
          await commitToken(tokenClientFCM, true);
        // add subscriber
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
