import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import type { ISolutionArticle } from "../dao/solution-article";

const addArticle = async (article: ISolutionArticle) => {
  try {
    const articlesCollection = collection(db, "solutions");
    const docRef = await addDoc(articlesCollection, {
      ...article,
      lastUpdated: new Date(), // Add current timestamp
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export default addArticle;
