export const useGlobalVariableChatActive = () => {
  const { TOPIC_CHAT_ACTIVE } = useTopics();
  const topicChatActive = useGlobalVariable(TOPIC_CHAT_ACTIVE);
  const clear = () => {
    topicChatActive.value = null;
  };
  const isActive = computed(() => null != topicChatActive.value);
  return {
    isActive,
    topic: topicChatActive,
    clear,
  };
};
