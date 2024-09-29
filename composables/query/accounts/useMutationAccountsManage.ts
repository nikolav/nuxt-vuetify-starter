import type { IAuthCreds } from "@/types";
import {
  M_accountsAdd,
  M_accountsPoliciesManage,
  M_accountsDrop,
  M_accountsProfilePatch,
  M_accountsSendVerifyEmailLink,
  M_accountsVeifyEmail,
} from "@/graphql";
interface IPoliciesPatch {
  [uid: string | number]: Record<string, boolean>;
}
export const useMutationAccountsManage = () => {
  const {
    urls: {
      URL_VERIFY_EMAIL,
      URL_PASSWORD_RESET_REQUEST,
      URL_PASSWORD_RESET_FORM_LINK,
      URL_PASSWORD_RESET_ACTION,
    },
  } = useAppConfig();
  const auth = useStoreApiAuth();
  const { mutate: mutateAccountsAdd, loading: accountsAddLoading } =
    useMutation(M_accountsAdd);
  const {
    mutate: mutateAccountsPoliciesManage,
    loading: accountsPoliciesManageLoading,
  } = useMutation(M_accountsPoliciesManage);
  const { mutate: mutateAccountsDrop, loading: accountsDropLoading } =
    useMutation(M_accountsDrop);
  const {
    mutate: mutateAccountsProfilePatch,
    loading: accountsProfilePatchLoading,
  } = useMutation(M_accountsProfilePatch);
  const {
    mutate: mutateAccountsSendVerifyEmailLink,
    loading: accountsSendVerifyEmailLinkLoading,
  } = useMutation(M_accountsSendVerifyEmailLink);
  const {
    mutate: mutateAccountsVeifyEmail,
    loading: accountsVeifyEmailLoading,
  } = useMutation(M_accountsVeifyEmail);
  // add account
  const add = async (payload: IAuthCreds) =>
    await mutateAccountsAdd({ payload });
  // drop account
  const drop = async (uid: any) => await mutateAccountsDrop({ uid });
  // batch manage user policies
  const policiesPatch = async (policies: IPoliciesPatch) =>
    await mutateAccountsPoliciesManage({ policies });
  // merge/patch account profile
  const profilePatch = async (uid: any, patch: Record<string, any>) =>
    await mutateAccountsProfilePatch({
      uid,
      patch: batchSet(undefined, patch),
    });
  const emailSendVerifyLink = async () =>
    await mutateAccountsSendVerifyEmailLink({
      uid: auth.uid,
      url: URL_VERIFY_EMAIL,
    });
  const emailVerify = async (key: any) =>
    await mutateAccountsVeifyEmail({ data: { key } });
  const passwordSendResetLink = async () =>
    await $fetch(URL_PASSWORD_RESET_REQUEST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: get(auth.user$, "email"),
        url: URL_PASSWORD_RESET_FORM_LINK,
      },
    });
  const passwordReset = async (key: string, new_password: string) =>
    await $fetch(URL_PASSWORD_RESET_ACTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        key,
        password: new_password,
      },
    });
  //
  const { watchProcessing } = useStoreAppProcessing();
  const processing = computed(() =>
    some([
      accountsAddLoading.value,
      accountsPoliciesManageLoading.value,
      accountsDropLoading.value,
      accountsProfilePatchLoading.value,
      accountsSendVerifyEmailLinkLoading.value,
      accountsVeifyEmailLoading.value,
    ])
  );
  watchProcessing(processing);

  return {
    processing,
    add,
    drop,
    policiesPatch,
    profilePatch,
    emailSendVerifyLink,
    emailVerify,
    passwordSendResetLink,
    passwordReset,
  };
};
