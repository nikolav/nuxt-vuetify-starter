import { tree } from "nikolav-treets";
import m from "~/assets/app/categories.assets.products.json";

// import * as nvtree from "nikolav-treets";
// const { tree } = nvtree;

// import { CATEGORY_KEY_ASSETS_prefix } from "@/config";
// @static
//  load menu
const menu = new tree();
menu.json({ children: m });

const top = menu.first();
const categories_select_menu = top
  .query((node) => 0 === node.len())
  .map((node) => {
    const val = node.value();
    return {
      title: val.title,
      value: val.key,
    };
  });

//
export const useCategoryAssets = () => {
  const {
    db: {
      Assets: {
        categories: { CATEGORY_KEY_ASSETS_prefix },
      },
    },
  } = useAppConfig();
  const categoryNodeByTag = (tag?: string) => {
    if (!(tag && String(tag).startsWith(CATEGORY_KEY_ASSETS_prefix))) return;
    const key_ = matchAfterLastColon(tag);
    // return menu.find((node) => key_ === node.value().key);
    return top.lsa().find((node) => key_ === node.value().key);
  };
  return {
    menu,
    top,
    categories_select_menu,
    categoryNodeByTag,
  };
};
