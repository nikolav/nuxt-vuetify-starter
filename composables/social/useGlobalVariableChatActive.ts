import { z } from "zod";
const schemaTopicFromShell = z.object({
  topic: z.string().min(1),
  title: z.optional(z.string()),
});
export const useGlobalVariableChatActive = () => {
  const { TOPIC_CHAT_ACTIVE, TOPIC_CHAT_ACTIVE_name } = useTopics();
  const topicChatActive = useGlobalVariable(TOPIC_CHAT_ACTIVE);
  const chatActiveName = useGlobalVariable(TOPIC_CHAT_ACTIVE_name);
  const topicSet = (topic?: any) => {
    // parse.minimist 'topic:foo:122 --title bar'
    //  # https://github.com/minimistjs/minimist
    try {
      if (!topic) throw `--bad-input [${topic}]`;
      const chat_ = schemaTopicFromShell.parse(
        batchGet(parseShell(String(topic).split(" ")), {
          "_[0]": "topic",
          title: "title",
        })
      );
      topicChatActive.value = chat_.topic;
      chatActiveName.value = startCase(chat_.title || "");
    } catch (error) {
      console.error(error);
    }
  };
  const clear = () => {
    topicChatActive.value = null;
  };
  const isActive = computed(() => null != topicChatActive.value);
  //
  watch(topicChatActive, (topic) => {
    if (!topic) {
      chatActiveName.value = undefined;
    }
  });
  return {
    isActive,
    topic: topicChatActive,
    chatTitle: chatActiveName,
    topicSet,
    clear,
    // alias
    topicClear: clear,
    title: chatActiveName,
  };
};

// xm5SxD00xtcsDaaJ:zSoDF9 --title-foo
