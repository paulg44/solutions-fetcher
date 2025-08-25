import db from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import type { IUploadCategories } from "../dao/fetch-categories.interface";

export const uploadCategories = async (categories: IUploadCategories[]) => {
  try {
    for (const category of categories) {
      const docRef = doc(db, "categories", category.id);
      await setDoc(
        docRef,
        { ...category, lastUpdated: new Date() },
        { merge: true }
      );
      console.log("Updated/created category:", category.id);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
