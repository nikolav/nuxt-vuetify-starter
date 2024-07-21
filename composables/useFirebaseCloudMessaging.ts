import { messaging } from "@/services/firebase";
import { getToken, onMessage } from "firebase/messaging";
interface IFCMOptions {
  // app in foreground, focused
  onMessage: (...args: any[]) => void;
}
export const useFirebaseCloudMessaging = async (options: IFCMOptions) => {
  const fcm = await messaging();
  if (!fcm) return;
  const {
    firebase: {
      messaging: { VAPID_KEY, FCM_TOKEN },
    },
  } = useAppConfig();
  const { config, configPut } = useDocConfig();
  const token = config(FCM_TOKEN);
  onceMountedOn(true, async () => {
    if (token.value) return;
    try {
      const token_ = await getToken(fcm, { vapidKey: VAPID_KEY });
      // config:save
      if (token_) await configPut(FCM_TOKEN, token_);
    } catch (error) {
      // pass
    }
  });
  const unsubscribe = onMessage(fcm, options.onMessage);
  // @@debug
  watchEffect(() => {
    console.log({ "TOKEN:fcm": token.value });
  });
  return {
    token,
    unsubscribe,
  };
};

// eZpHzgB-gPkyPmSpSdxbkM:APA91bGP-QPnrgvpAcDmUZpWYuhX3FChOSzcUE07nMofBojroSTiun5aRME4WmHu1-G6LoEuvJ-vyGst95PYwj8Dsa9g5ekkt4yDPKTgKss5xGkUmQ1B8Q6WwZkfQ86IkugK21mriWh3
// duxCWVRBOd6TVpTa5Owm-x:APA91bGeavyRk4gYcs--3l9QLz3KwBxFa4CN9oJUS9pUmKHQrqOcqU6E6MOIiMHNMmNg2Oh7T2VjYrmnxiHlJeWtsmUBGz055c0-gwiE7WP1lepIZ2qFkuXfcTlQb2mtSF9hKNiO5m1v
