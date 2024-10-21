import type { ITopicChatMessage } from "@/types";
export const useDocsTopicChat = <T = ITopicChatMessage>() => {
  const { topic } = useGlobalVariableChatActive();
  // # 0 created_at:asc
  // # 1 created_at:desc
  const d = useDocs<T>(topic, undefined, 0);
  return {
    ...d,
    topic,
    // alias
    chat: d.data,
  };
};
