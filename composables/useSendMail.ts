import type { IInputSendMail } from "@/types";
import { M_sendMail } from "@/graphql";
export const useSendMail = () => {
  const { mutate } = useMutation(M_sendMail);
  const { watchProcessing } = useStoreAppProcessing();
  const pc = useProcessMonitor();
  watchProcessing(pc.processing);
  const sendMail = async (config: IInputSendMail) => {
    let res;
    try {
      pc.begin();
      res = await mutate(assign({ data: {} }, config));
    } catch (error) {
      pc.setError(error);
    } finally {
      pc.done();
    }
    if (!pc.error.value) pc.successful();
    return res;
  };
  return {
    sendMail,
    processing: pc.processing,
  };
};
