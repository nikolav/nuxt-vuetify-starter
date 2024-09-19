import md5 from "md5";
import type { TGravatars } from "@/types";

export const useStoreGravatars = defineStore("gravatars", () => {
  const auth = useStoreApiAuth();
  const {
    stores: {
      gravatars: { BASE_URL, GRAVATARS_CACHE, MODE, SIZE },
    },
  } = useAppConfig();
  const gmode = () =>
    sample(
      reduce(
        MODE,
        (res, val, field) => {
          if (true === val) res.push(field);
          return res;
        },
        <string[]>[]
      )
    );

  const email_ = () => `g.${idGen()}@gravatar.com`.toLocaleLowerCase();
  const url_ = () =>
    `${trimEnd(BASE_URL, "/")}/${md5(email_())}?d=${gmode()}&size=${SIZE}`;
  // data: TGravatars
  const { data: g$, commit } = useDoc<TGravatars>(GRAVATARS_CACHE);
  const store = computed(() =>
    transform(
      get(g$.value, "data", {}),
      (res, node, id) => {
        res[String(id)] = (false !== node.enabled ? node.src : undefined) || "";
      },
      <Record<string, string>>{}
    )
  );
  const enabled = computed(
    () => false !== get(g$.value, `data[${auth.uid}].enabled`)
  );
  const src = computed(
    () =>
      (enabled.value ? get(g$.value, `data[${auth.uid}].src`) : undefined) || ""
  );
  const refresh = async () =>
    enabled.value ? await commit({ [`[${auth.uid}].src`]: url_() }) : undefined;
  const enable = async () => await commit({ [`[${auth.uid}].enabled`]: true });
  const disable = async () =>
    await commit({ [`[${auth.uid}].enabled`]: false });

  //#
  return {
    // @cache:all
    store,

    // #crud
    src,
    enabled,
    refresh,
    enable,
    disable,
  };
});
