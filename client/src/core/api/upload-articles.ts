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
          //   id: article.id,
          //   title: article.name,
          //   folderId: article.folder_id,
          //   hits: article.hits,
          //   thumbs_up: article.thumbs_up,
          //   thumbs_down: article.thumbs_down,
          ...article,
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
