import { collection, getDocs } from "firebase/firestore";
import db from "../config/firebase";

export const fetchCategoriesFromDB = async () => {
  try {
    const categoriesCollection = collection(db, "categories");
    const categorySnapshot = await getDocs(categoriesCollection);
    const categories = categorySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    console.log("Categories fetched from Firestore:", categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
