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
    urls: { URL_VERIFY_EMAIL },
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
  // add users
  const add = async (payload: IAuthCreds) =>
    await mutateAccountsAdd({ payload });
  // drop account
  const drop = async (uid: any) => await mutateAccountsDrop({ uid });
  // batch manage user policies
  const policies_patch = async (policies: IPoliciesPatch) =>
    await mutateAccountsPoliciesManage({ policies });
  // merge/patch account profile
  const profile_patch = async (uid: any, patch: Record<string, any>) =>
    await mutateAccountsProfilePatch({
      uid,
      patch: batchSet(undefined, patch),
    });
  //
  const send_verify_email_link = async () =>
    await mutateAccountsSendVerifyEmailLink({
      uid: auth.uid,
      url: URL_VERIFY_EMAIL,
    });
  const verify_email = async (key: any) =>
    await mutateAccountsVeifyEmail({ data: { key } });
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
    policies_patch,
    profile_patch,
    send_verify_email_link,
    verify_email,
  };
};
