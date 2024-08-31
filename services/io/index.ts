import { io, Socket } from "socket.io-client";
import type { OrNoValue } from "@/types";
import { IO_SERVER } from "@/config";

export const configureIO = () => {
  let IO: OrNoValue<Socket> = null;
  try {
    IO = io(IO_SERVER, { withCredentials: true });
  } catch (error) {}
  return IO;
};
