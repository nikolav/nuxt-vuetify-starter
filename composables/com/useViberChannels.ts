import { ENDPOINT_GRAPHQL } from "@/config";

const query = `
  mutation m_viberSendTextMessage($payload: JsonData!) {
    viberSendTextMessage(payload: $payload)
  }
`;

export const useViberChannels = () => {
  const auth = useStoreApiAuth();
  const enabled = computed(() => auth.isAuthenticated$);
  // {"channel:name": "message:text"}
  const batchSendText = async (channelMessage: Record<string, string>) => {
    if (!enabled.value) return;
    return await $fetch(ENDPOINT_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token$}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        query,
        variables: {
          payload: channelMessage,
        },
      },
    });
  };
  return {
    enabled: readonly(enabled),
    send: {
      text: batchSendText,
    },
  };
};
