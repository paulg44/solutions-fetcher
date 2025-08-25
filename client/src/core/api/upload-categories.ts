import db from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import type { IUploadCategories } from "../dao/fetch-categories.interface";

export const uploadCategories = async (categories: IUploadCategories) => {
  try {
    const categoriesCollection = collection(db, "categories");
    const docRef = await addDoc(categoriesCollection, {
      ...categories,
      lastUpdated: new Date(), // Add current timestamp
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
