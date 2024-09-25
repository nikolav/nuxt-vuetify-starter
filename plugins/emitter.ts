import { EventEmitter } from "eventemitter3";
export default defineNuxtPlugin((_nuxtapp) => {
  const emitter = new EventEmitter();
  return {
    provide: { emitter },
  };
});
