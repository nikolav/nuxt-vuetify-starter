import { configureIO } from "@/services/io";

const socket = configureIO();

export default defineNuxtPlugin(() => ({
  provide: { socket },
}));
