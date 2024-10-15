import { useDocument } from "vuefire";
import { collection, doc, setDoc } from "firebase/firestore";
import { db as firestoreDB } from "@/services/firebase";
import type { RecordJson } from "@/types";
export const useFirebaseCloudFirestoreDoc = (KEY: any) => {
  const {
    firebase: {
      firestore: { DEFAULT_DOCS_COLLECTION },
    },
  } = useAppConfig();
  const docs$ = collection(firestoreDB, DEFAULT_DOCS_COLLECTION);
  const doc$ = doc(docs$, KEY);
  const data = useDocument(doc$);
  const commit = async (fields: RecordJson, merge = true) =>
    await setDoc(doc$, fields, { merge });
  const clear = async (_defaultEmpty: any = {}) =>
    await commit(_defaultEmpty, false);
  const drop = async (...paths: string[]) => {
    const patch_ = cloneDeep(data.value);
    each(paths, (path: any) => {
      unset(patch_, path);
    });
    await commit(patch_, false);
  };
  return {
    KEY,
    data,
    commit,
    drop,
    clear,
    // alias
    put: commit,
  };
};
