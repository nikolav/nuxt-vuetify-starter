import { useCollection } from "vuefire";
import {
  collection,
  setDoc,
  addDoc,
  deleteDoc,
  // getDoc,
  doc,
} from "firebase/firestore";
import { db as firestoreDB } from "@/services/firebase";
import type { RecordJson } from "@/types";
export const useFirebaseCloudFirestoreCollection = (PATH?: any) => {
  const collection$ = collection(firestoreDB, PATH);
  const data = useCollection(collection$);
  const length = computed(() => len(data.value));
  const pc = useProcessMonitor();
  const { watchProcessing } = useStoreAppProcessing();
  const processing = pc.processing;
  watchProcessing(processing);
  const commit = async (fields: RecordJson, ID?: any, merge = true) => {
    let res;
    try {
      pc.begin();
      res = get(
        ID
          ? await setDoc(doc(collection$, ID), fields, { merge })
          : await addDoc(collection$, fields),
        "id"
      );
    } catch (error) {
      pc.setError(error);
    } finally {
      pc.done();
    }
    if (!pc.error.value) pc.successful();
    return res;
  };

  const rm = async (ID: any) => {
    let res;
    try {
      pc.begin();
      res = await deleteDoc(doc(collection$, ID));
    } catch (error) {
      pc.setError(error);
    } finally {
      pc.done();
    }
    if (!pc.error.value) pc.successful();
    return res;
  };

  return {
    data,
    length,
    commit,
    rm,
    // alias
    put: commit,
    // flags
    processing,
  };
};
