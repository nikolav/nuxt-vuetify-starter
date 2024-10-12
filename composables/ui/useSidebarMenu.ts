import SUBNAV from "~/assets/app/subnav.json";
export const useSidebarMenu = (
  config: { ID_subnav: string } = { ID_subnav: "ID--Tg7d2cslOFMY4eWHljM1" }
) => {
  const route = useRoute();
  // route.name starts:with `path-`
  const hasNavSecondary = computed(
    () => !isEmpty(get(SUBNAV, String(route.name).split("-")[0]))
  );
  const refSubnav = useQuerySelector(`#${config.ID_subnav}`);
  const { height: sidebarMainHeight } = useElementSize(refSubnav);
  const appBarTitle = computed(() =>
    get(
      SUBNAV["aktiva"][
        findIndex(SUBNAV["aktiva"], (node) =>
          String(route.name).startsWith(node.to)
        )
      ],
      "title",
      ""
    )
  );

  return {
    SUBNAV,
    ID_subnav: config.ID_subnav,
    hasNavSecondary,
    sidebarMainHeight,
    appBarTitle,
  };
};
