import { Icon } from "#components";
export const renderIcon = (name: string, config?: any) =>
  h(Icon, { ...Object(config), name });
