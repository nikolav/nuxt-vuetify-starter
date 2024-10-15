export const useDocUsersAvailabilityStatus = () => {
  const {
    acconts: { availabilityStatus },
  } = useAppConfig();
  const { userAvailabilityStatus } = useTopics();
  const d = useDoc(userAvailabilityStatus());
  const availability = (uid: any) =>
    findKey(availabilityStatus, (value: string) => {
      return value == get(d.data.value, `data[${uid}]`);
    });
  const availability_commit = async (uid: any, type: any) =>
    hasOwn(availabilityStatus, type)
      ? await d.commit({ [uid]: availabilityStatus[type] }, undefined, true)
      : null;

  return {
    ...d,
    availability,
    availability_commit,
  };
};
