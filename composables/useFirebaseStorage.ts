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

export const useFirebaseStorage = (STORE_PATH?: any) => {
  // ref:store
  const refStore = computed(() => fbRef(storage, toValue(STORE_PATH)));
  // https://firebase.google.com/docs/storage/web/upload-files?hl=en&authuser=0
  const upload = async (files: IInputFileUpload) =>
    await Promise.all(
      map(
        files,
        (node, title) =>
          new Promise((resolve, reject) => {
            if (!node?.file) return reject(null);
            const filename = node?.name || node.file.name;
            const refStorageNode = fbRef(refStore.value, filename);
            const uploadTask = uploadBytesResumable(refStorageNode, node.file);
            uploadTask.on(
              "state_changed",
              // progress
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.debug({ [`${title} --upload-progress`]: progress });
              },
              // error
              reject,
              // success
              async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                return !url ? reject(null) : resolve({ [title]: url });
              }
            );
          })
      )
    );
  const url = async (filename: string) => {
    const refNode = fbRef(refStore.value, filename);
    return await getDownloadURL(refNode);
  };
  const info = async (filename: string) => {
    const refNode = fbRef(refStore.value, filename);
    return await getMetadata(refNode);
  };
  const rm = async (filename: string) => {
    const refNode = fbRef(refStore.value, filename);
    return await deleteObject(refNode);
  };
  const ls = async () => {
    return [...(get(await listAll(refStore.value), "items") || [])];
  };
  const rma = async () =>
    await Promise.all(map(await ls(), async (node) => await rm(node.name)));

  return {
    upload,
    url,
    ls,
    rm,
    rma,
    info,
  };
};
