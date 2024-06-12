import type { IInputSendMail } from "@/types";
import { M_sendMail } from "@/graphql";
export const useSendMail = () => {
  const { mutate } = useMutation(M_sendMail);
  const sendMail = async (config: IInputSendMail) =>
    await mutate(assign({ data: {} }, config));
  return {
    sendMail,
  };
};
