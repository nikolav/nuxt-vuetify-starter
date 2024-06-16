import md5 from "md5";
import type { TGravatars } from "@/types";

export const useStoreGravatars = defineStore("gravatars", () => {
  const id = inject(key_UID)!;
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
  const { data: g$, put: cache } = useDoc<TGravatars>(GRAVATARS_CACHE);
  const store = computed(() =>
    transform(
      g$.value?.data,
      (res, node, id) => {
        res[id] = (false !== node.enabled ? node.src : undefined) || "";
      },
      <Record<string, string>>{}
    )
  );
  const enabled = computed(
    () => false !== get(g$.value, `data["${id.value}"].enabled`)
  );
  const src = computed(
    () =>
      (enabled.value ? get(g$.value, `data["${id.value}"].src`) : undefined) ||
      ""
  );
  const refresh = async () =>
    enabled.value ? await cache({ [`${id.value}.src`]: url_() }) : undefined;
  const enable = async () => await cache({ [`${id.value}.enabled`]: true });
  const disable = async () => await cache({ [`${id.value}.enabled`]: false });

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
