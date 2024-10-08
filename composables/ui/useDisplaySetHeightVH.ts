import { useDisplay } from "vuetify";
export const useDisplaySetHeightVH = (offset: any = 0) => {
  const { height: VH } = useDisplay();
  const heightCss = computed(() => ({
    height: offset
      ? `calc(${VH.value}px - ${isNumeric(offset) ? `${offset}px` : offset})`
      : VH.value,
  }));
  return heightCss;
};
