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
  const notificationsGranted = useRequestNotificationsPermission();
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
  // tokens: Ref<Record<string:token, boolean:valid> | undefined>
  const { tokens, commit: commitToken } = useDocUserDeviceTokens();
  // subscribe when service available
  watch(
    [notificationsGranted, () => auth.isAuthenticated$, () => service.value],
    async ([notificationsGranted, isAuthenticated, client]) => {
      if (some([notificationsGranted, isAuthenticated, client], boolNot))
        return;
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
