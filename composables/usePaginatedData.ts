import { type Ref } from "vue";
import type { OrNoValue } from "@/types";

export const usePaginatedData = <TData = any>(config: {
  data: OrNoValue<TData[] | Ref<TData[]>>;
  perPage: number;
}) => {
  const page$ = ref(1);
  const length = computed(() => {
    const d = toValue(config.data);
    return d && !isEmpty(d) ? Math.ceil(len(d) / config.perPage) : 0;
  });

  return {
    page$,
    length,
    perPage: config.perPage,
  };
};
