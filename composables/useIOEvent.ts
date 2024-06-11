interface ISocketEventHandler<T = any> {
  (...args: T[]): void;
}

export const useIOEvent = <T = any>(
  e: string,
  handle: ISocketEventHandler<T>
) => {
  if (!e) return;
  const { $socket } = useNuxtApp();
  onUnmounted(() => $socket?.off(e, handle));
  $socket?.on(e, handle);
};
