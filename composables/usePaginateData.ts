import { type Ref } from "vue";
import type { OrNoValue } from "@/types";

export const usePaginateData = <TData = any>(config: {
  data: OrNoValue<TData[] | Ref<TData[]>>;
  perPage: number;
}) => {
  const page$ = ref(1);
  const length = computed(() => {
    const d = toValue(config.data);
    return d ? Math.ceil(d.length / config.perPage) : 0;
  });

  return {
    page$,
    length,
    perPage: config.perPage,
  };
};
