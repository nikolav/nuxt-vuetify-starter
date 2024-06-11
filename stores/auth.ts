// import { signOut } from "firebase/auth";
// import { auth as firebaseAuth } from "@/services/firebase";
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
    key: { CHAT_NAME },
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
  // init chat name @login
  const chatName$ = useLocalStorage(CHAT_NAME, () => "", {
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
        // pass
      }
      return null;
    },
    // start manually
    lazy: true,
    immediate: false,
  });
  const initialized$ = onceMountedOn(true, authDataStart);
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
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogin
    onLogin: onLoginApollo,
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogout-reference
    onLogout: onLogoutApollo,
  } = useApollo();

  // sync apollo:auth
  watch(isAuth$, async (isAuth) => {
    if (isAuth) {
      // #cache apollo token
      await onLoginApollo(token$.value);

      // cache auto `chatName`
      if (chatName$.value) return;
      const chatName = matchEmailStart(get(user$.value, "email"));
      const chatNameDefault = matchEmailStart(APP_USER_DEFAULT_email);
      if (chatNameDefault === chatName) return;
      chatName$.value = startCase(chatName);
    } else {
      // #signal logout to apollo
      await onLogoutApollo();
      // clear auto `chatName`

      // chatName$.value = "";
    }
  });

  // track api activity
  const status = useProcessMonitor();
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(() => status.processing.value);

  const authentication$ =
    (authEndpoint: string = URL_AUTH_login) =>
    async (credentials: IAuthCreds) => {
      // # auth only unauthenticated user
      if (isAuthenticated$.value) return;

      let token: OrNoValue<string> = "";
      status.begin();
      try {
        token = get(
          await $fetch<IAuthResponse>(authEndpoint, {
            method: "POST",
            body: schemaAuthCredentials.parse(credentials),
          }),
          "token"
        );
      } catch (error) {
        status.setError(error);
      } finally {
        if (schemaJwt.safeParse(token).success) {
          token$.value = token;
          status.successful();
        }
      }
      status.done();
    };
  // @register
  const register = authentication$(URL_AUTH_register);
  // @login
  const login = authentication$();
  // @logout
  const logout = async () => {
    if (!isAuth$.value) return;
    status.begin();
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
            status.successful();

            // clear fb auth
            // await signOut(firebaseAuth);
          }
        },
      });
    } catch (error) {
      status.setError(error);
    } finally {
      status.done();
    }
    if (!status.error.value) {
      status.successful();
    }
  };

  // #api
  return {
    // #crud
    token$,
    user$,
    register,
    login,
    logout,
    authDataReload,
    // alias
    reload: authDataReload,
    //
    initialized$,
    isAuth$,
    isUser$,
    isAdmin$,
    isDefault$,
    isAuthenticated$,

    // @api/flags
    status,

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
