import { tree } from "nikolav-treets";
import mp from "~/assets/app/categories.assets.products.json";
import mg from "~/assets/app/categories.assets.groups.json";

// import * as nvtree from "nikolav-treets";
// const { tree } = nvtree;

// import { CATEGORY_KEY_ASSETS_prefix } from "@/config";
// @static
//  menu:products
const menu = new tree();
menu.json({ children: mp });

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

// menu:groups
const menu_groups = new tree();
menu_groups.json({ children: mg });

const top_g = menu_groups.first();
const categories_select_menu_g = top_g
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
  const isCategoryTag = (value?: any) =>
    value && String(value).startsWith(CATEGORY_KEY_ASSETS_prefix);
  const categoryTagByAsset = (asset?: any) =>
    find(asset?.tags, (t: string) => t.startsWith(CATEGORY_KEY_ASSETS_prefix));
  const categoryNodeByTag = (tag?: string, parent: any = top) => {
    if (!isCategoryTag(tag)) return;
    const key_ = matchAfterLastColon(tag!);
    return parent.lsa().find((node: any) => key_ === node.value().key);
  };
  return {
    categoryNodeByTag,
    categoryTagByAsset,

    // categories:products
    menu,
    top,
    categories_select_menu,

    // categories:groups
    groups: {
      menu: menu_groups,
      top: top_g,
      categories_select_menu: categories_select_menu_g,
    },
  };
};
