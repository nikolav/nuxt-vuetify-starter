import { useDocument } from "vuefire";
import { collection, doc, setDoc } from "firebase/firestore";
import { db as firestoreDB } from "@/services/firebase";
export const useFirebaseCloudFirestoreDoc = (ID: string) => {
  const {
    firebase: {
      firestore: { DEFAULT_DOCS_COLLECTION },
    },
  } = useAppConfig();
  const docs$ = collection(firestoreDB, DEFAULT_DOCS_COLLECTION);
  const doc$ = doc(docs$, ID);
  const data = useDocument(doc$);
  const put = async (fields: Record<string, any>, merge = true) => {
    await setDoc(doc$, fields, { merge });
  };
  const clear = async () => await put({}, false);
  const drop = async (...fields: string[]) => {
    const newData = omit(data.value, fields);
    await put(newData, false);
  };
  return {
    data,
    put,
    clear,
    drop,
    // alias
    commit: put,
  };
};
