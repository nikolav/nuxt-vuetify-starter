import { tree } from "nikolav-treets";
import m from "~/assets/app/categories.assets.products.json";
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
  return {
    menu,
    top,
    categories_select_menu,
  };
};
