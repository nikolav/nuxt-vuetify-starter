import { signOut } from "firebase/auth";
import { auth as firebaseAuth } from "@/services/firebase";
import type {
  IAuthCreds,
  IAuthLogoutResponse,
  IAuthResponse,
  IAuthWhoResponse,
  OrNoValue,
} from "@/types";
import {
  TOKEN_DEFAULT,
  URL_API_who,
  URL_AUTH_login,
  URL_AUTH_logout,
  URL_AUTH_register,
} from "@/config";
import {
  schemaAuthCredentials,
  schemaAuthData,
  schemaAuthDataAdmin,
  schemaJwt,
  schemaUsersIsDefault,
  schemaUsersNotReserved,
} from "@/schemas";

export const useStoreApiAuth = defineStore("auth", () => {
  const {
    key: { CHAT_NAME: DISPLAY_NAME },
    stores: {
      auth: {
        KEY_ACCESS_TOKEN,
        KEY_USEFETCH_AUTHDATA,
        initial: initialStorage,
        authHeaders,
      },
    },
    APP_USER_DEFAULT: { email: APP_USER_DEFAULT_email },
  } = useAppConfig();
  // jwt
  const token$ = useLocalStorage(KEY_ACCESS_TOKEN, initialStorage, {
    initOnMounted: true,
  });
  const headers$ = computed(() => authHeaders(token$.value));
  // init display name @login
  const displayName = useLocalStorage(DISPLAY_NAME, () => "", {
    initOnMounted: true,
  });

  const {
    data: user$,
    refresh: authDataReload,
    execute: authDataStart,
    // pending,
  } = useFetch<OrNoValue<IAuthWhoResponse>>(URL_API_who, {
    key: KEY_USEFETCH_AUTHDATA,
    method: "GET",
    headers: headers$,
    default: () => null,
    transform: (responseAuth) => {
      try {
        return schemaAuthData.parse(responseAuth);
      } catch (error) {
        console.error({ "useStoreApiAuth:error": error });
      }
      return null;
    },
    // start manually
    lazy: true,
    immediate: false,
  });
  const reload = async () => await authDataReload();

  const uid = computed(() => get(user$.value, "id"));
  const profile = computed(() => get(user$.value, "profile") || {});

  const initialized$ = useOnceMountedOn(true, authDataStart);
  const isAuth$ = computed(() => schemaAuthData.safeParse(user$.value).success);
  const isUser$ = computed(
    () => schemaUsersNotReserved.safeParse(user$.value).success
  );
  const isAdmin$ = computed(
    () => schemaAuthDataAdmin.safeParse(user$.value).success
  );
  const isDefault$ = computed(
    () => schemaUsersIsDefault.safeParse(user$.value).success
  );
  const isAuthenticated$ = computed(() => isAuth$.value && !isDefault$.value);

  // #@apollo
  // apply auth token to Apollo client
  // ..if GraphQL API expects authentication to be passed via a HTTP header
  const {
    // apollo.nuxtjs.org/getting-started/auth-helpers#onlogin
    onLogin: onLoginApollo,
    // apollo.nuxtjs.org/getting-started/auth-helpers#onlogout-reference
    onLogout: onLogoutApollo,
  } = useApollo();

  // token.apollo --sync
  watchEffect(async () => {
    if (token$.value) await onLoginApollo(token$.value);
  });

  const calcDisplayNameOnNoStorage = () => {
    displayName.value = startCase(
      get(profile.value, "displayName") ||
        [get(profile.value, "firstName"), get(profile.value, "lastName")]
          .filter(Boolean)
          .join(" ") ||
        matchEmailStart(get(user$.value, "email"))
    );
  };
  // sync apollo:auth
  watch(isAuth$, async (isAuth) => {
    if (isAuth) {
      // #cache apollo token
      // await onLoginApollo(token$.value);

      // cache auto `chatName`
      if (!displayName.value) calcDisplayNameOnNoStorage();
    } else {
      // #signal logout to apollo
      await onLogoutApollo();
      // clear auto `chatName`

      // displayName.value = "";
    }
  });

  // track api activity
  const pc = useProcessMonitor();
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(pc.processing);

  // update store @account:update
  const { ioeventAccountUpdated } = useTopics();
  const IO_accountUpdated = computed(() => ioeventAccountUpdated(uid.value));
  watchEffect(() => useIOEvent(IO_accountUpdated.value, reload));

  const authentication$ =
    (authEndpoint: string = URL_AUTH_login) =>
    async (credentials: IAuthCreds) => {
      // # auth only unauthenticated user
      if (isAuthenticated$.value) return;

      let token: OrNoValue<string> = "";
      pc.begin();
      try {
        token = get(
          await $fetch<IAuthResponse>(authEndpoint, {
            method: "POST",
            body: schemaAuthCredentials.parse(credentials),
          }),
          "token"
        );
      } catch (error) {
        pc.setError(error);
      } finally {
        if (schemaJwt.safeParse(token).success) {
          token$.value = token;
          pc.successful();
        }
      }
      pc.done();
    };
  // @register
  const register = authentication$(URL_AUTH_register);
  // @login
  const login = authentication$();
  // @logout
  const logout = async () => {
    if (!isAuth$.value) return;
    pc.begin();
    try {
      await $fetch<IAuthLogoutResponse>(URL_AUTH_logout, {
        method: "POST",
        // headers: authHeaders(token$.value),
        headers: headers$.value,
        onResponse: async ({ response }) => {
          if (response.ok) {
            // logout success, cache cleared server side,
            //  set token invalid
            token$.value = "";
            pc.successful();

            // clear fb auth
            await signOut(firebaseAuth);
          }
        },
      });
    } catch (error) {
      pc.setError(error);
    } finally {
      pc.done();
    }
    if (!pc.error.value) {
      pc.successful();
    }
  };

  // #api
  return {
    token$,
    user$,
    //
    uid,
    profile,
    //
    login,
    register,
    logout,
    reload,
    // alias
    authDataReload: reload,
    //
    initialized$,
    isAuth$,
    isUser$,
    isAdmin$,
    isDefault$,
    isAuthenticated$,
    // @refs
    displayName,
    // @api/flags
    status: pc,
    // hard login
    //  put token:validated
    tokenPut: (t: string) => {
      token$.value = schemaJwt.parse(t);
    },
    tokenPutDefault: () => {
      token$.value = TOKEN_DEFAULT;
    },
  };
});
