import { io } from "socket.io-client";
import { IO_SERVER } from "@/config";

export const configureIO = () => {
  try {
    return io(IO_SERVER, { withCredentials: true });
  } catch (error) {
    // pass
  }
  return null;
};
