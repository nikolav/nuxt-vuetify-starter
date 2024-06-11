import {
  ref as fbRef,
  getDownloadURL,
  uploadBytesResumable,
  getMetadata,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "@/services/firebase";
import type { IInputFileUpload } from "@/types";

export const useFirebaseStorage = (STORE?: any) => {
  const store$ = ref();
  watchEffect(() => {
    store$.value = toValue(STORE);
  });

  // ref:store
  const refStore = fbRef(storage, store$.value);
  // https://firebase.google.com/docs/storage/web/upload-files?hl=en&authuser=0
  const upload = async (files: IInputFileUpload) =>
    await Promise.all(
      map(
        files,
        (node, title) =>
          new Promise((resolve, reject) => {
            if (!node?.file) return reject(null);
            const path = node?.name || node.file.name;
            const refStorageNode = fbRef(refStore, path);
            const uploadTask = uploadBytesResumable(refStorageNode, node.file);
            uploadTask.on(
              "state_changed",
              // progress
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log({ [`${title} --upload-progress`]: progress });
              },
              // error
              (error) => {
                return reject(error);
              },
              // success
              async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                return !url ? reject(null) : resolve({ [title]: url });
              }
            );
          })
      )
    );
  const publicUrl = async (path: string) => {
    const refNode = fbRef(refStore, path);
    return await getDownloadURL(refNode);
  };
  const info = async (path: string) => {
    const refNode = fbRef(refStore, path);
    return await getMetadata(refNode);
  };
  const remove = async (path: string) => {
    const refNode = fbRef(refStore, path);
    return await deleteObject(refNode);
  };
  const ls = async () => {
    return [...(get(await listAll(refStore), "items") || [])];
  };

  return {
    upload,
    publicUrl,
    ls,
    remove,
    info,
  };
};
