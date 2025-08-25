import db from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import type { IUploadFolders } from "../dao/fetch-folders.interface";

export const UploadFolders = async (folders: IUploadFolders[]) => {
  try {
    for (const folder of folders) {
      const docRef = doc(db, "folders", folder.id);
      await setDoc(
        docRef,
        { ...folder, lastUpdated: new Date() },
        { merge: true }
      );
      console.log("Updated/created folder:", folder.id);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
