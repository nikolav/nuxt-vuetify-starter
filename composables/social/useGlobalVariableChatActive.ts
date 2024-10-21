export const useGlobalVariableChatActive = () => {
  const { TOPIC_CHAT_ACTIVE, TOPIC_CHAT_ACTIVE_name } = useTopics();
  const topicChatActive = useGlobalVariable(TOPIC_CHAT_ACTIVE);
  const chatActiveName = useGlobalVariable(TOPIC_CHAT_ACTIVE_name);
  const topicSet = (topic?: any) => {
    if (topic) {
      topicChatActive.value = topic;
    }
  };
  const clear = () => {
    topicChatActive.value = null;
  };
  const isActive = computed(() => null != topicChatActive.value);
  return {
    topic: topicChatActive,
    chatTitle: chatActiveName,
    isActive,
    topicSet,
    clear,
    // alias
    topicClear: clear,
  };
};
