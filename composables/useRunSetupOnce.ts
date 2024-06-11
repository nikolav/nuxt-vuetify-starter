type IConfigureOnceSetup<T = any> = {
  (...args: T[]): void;
};

export const useRunSetupOnce = (setup: IConfigureOnceSetup) => {
  const toggleConfigured = useToggleFlag();
  const runSetup = <T = any>(...args: T[]) => {
    if (toggleConfigured.isActive.value) return;
    toggleConfigured.on();
    setup(...args);
  };

  return {
    configured: toggleConfigured.isActive,
    runSetup,
  };
};
