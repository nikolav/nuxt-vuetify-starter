import { z } from "zod";
import type { OrNoValue } from "@/types";
import { M_commsMessageMany } from "@/graphql";

const schemaMessageMany = z.object({
  message: z.string().trim().min(1),
  uids: z.array(z.coerce.number()).nonempty(),
});
export const useQueryComms = () => {
  const uid = inject(key_UID);
  const userDisplayName = inject(key_USER_DISPLAY_NAME);

  const { watchProcessing } = useStoreAppProcessing();
  const pc = useProcessMonitor();

  const { mutate: mutateCommsMessageMany } = useMutation(M_commsMessageMany);

  // commsMessageMany(uids: [ID!]!, message: JsonData!): JsonData!
  const messageMany = async (
    // config { message: string; uids: number[] }
    // config?: OrNoValue<z.infer<typeof schemaMessageMany>>
    config?: any
  ) => {
    let res;
    try {
      pc.begin();
      const msg = schemaMessageMany.parse(config);
      res = await mutateCommsMessageMany({
        uids: msg.uids,
        message: {
          uid: uid?.value,
          name: userDisplayName?.value,
          message: msg.message,
        },
      });
    } catch (error) {
      pc.setError(error);
    } finally {
      pc.done();
    }
    if (!pc.error.value) pc.successful();
    return res;
  };

  watchProcessing(pc.processing);

  return {
    processing: pc.processing,
    messageMany,
  };
};
