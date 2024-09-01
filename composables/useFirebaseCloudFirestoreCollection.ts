import { useCollection } from "vuefire";
import {
  collection,
  setDoc,
  addDoc,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db as firestoreDB } from "@/services/firebase";
export const useFirebaseCloudFirestoreCollection = (
  collectionPathName: string
) => {
  const collection$ = collection(firestoreDB, collectionPathName);
  const data = useCollection(collection$);
  const length = computed(() => len(data.value));
  const put = async (
    fields: Record<string, any>,
    ID?: string | undefined,
    merge = true
  ) => {
    const docRef = ID
      ? await setDoc(doc(collection$, ID), fields, { merge })
      : await addDoc(collection$, fields);
    return docRef?.id;
  };
  const rm = async (ID: string) => {
    const docRef = doc(collection$, ID);
    const d = await getDoc(docRef);
    if (!d.exists()) return;
    await deleteDoc(docRef);
    return d;
  };

  return {
    data,
    length,
    put,
    rm,
    // alias
    commit: put,
  };
};
