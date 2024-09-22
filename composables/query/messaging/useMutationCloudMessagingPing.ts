import { M_cloudMessagingPing } from "@/graphql";
export const useMutationCloudMessagingPing = () => {
  const status = ref();
  const { mutate: mutateCloudMessagingPing } =
    useMutation(M_cloudMessagingPing);
  const ping = async () => {
    status.value = get(
      await mutateCloudMessagingPing(),
      "data.cloudMessagingPing"
    );
  };
  return {
    status,
    ping,
  };
};
