import type { IAuthCreds } from "@/types";
import {
  M_accountsAdd,
  M_accountsPoliciesManage,
  M_accountsDrop,
} from "@/graphql";
interface IPoliciesPatch {
  [uid: string | number]: Record<string, boolean>;
}
export const useMutationAccountsManage = () => {
  const { mutate: mutateAccountsAdd, loading: accountsAddLoading } =
    useMutation(M_accountsAdd);
  const {
    mutate: mutateAccountsPoliciesManage,
    loading: accountsPoliciesManageLoading,
  } = useMutation(M_accountsPoliciesManage);
  const { mutate: mutateAccountsDrop, loading: accountsDropLoading } =
    useMutation(M_accountsDrop);
  // add users
  const add = async (payload: IAuthCreds) =>
    await mutateAccountsAdd({ payload });
  // drop account
  const drop = async (uid: any) => await mutateAccountsDrop({ uid });
  // batch manage user policies
  const policies_patch = async (policies: IPoliciesPatch) =>
    await mutateAccountsPoliciesManage({ policies });

  const { watchProcessing } = useStoreAppProcessing();
  const loading = computed(() =>
    some([
      accountsAddLoading.value,
      accountsPoliciesManageLoading.value,
      accountsDropLoading.value,
    ])
  );
  watchProcessing(loading);

  return {
    loading,
    add,
    drop,
    policies_patch,
  };
};
