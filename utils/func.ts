export const withArgsPrepended =
  (func: any, ...argsStart: any[]) =>
  (...argsRest: any[]) =>
    func.apply(undefined, argsStart.concat(argsRest));
