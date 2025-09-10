import db from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import type { IUploadArticles } from "../dao/fetch-articles.interface";

export const UploadArticles = async (articles: IUploadArticles[]) => {
  try {
    for (const article of articles) {
      const docRef = doc(db, "articles", article.id);
      await setDoc(
        docRef,
        {
          id: article.id ?? null,
          title: article.title ?? "",
          folderId: article.folder_id ?? "",
          hits: article.hits ?? 0,
          thumbs_up: article.thumbs_up ?? 0,
          thumbs_down: article.thumbs_down ?? 0,
          updated_at: new Date(),
        },
        { merge: true }
      );
      console.log("Updated/created article:", article.id);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
