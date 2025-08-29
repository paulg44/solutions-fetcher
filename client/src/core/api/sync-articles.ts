import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase";
import { fetchAllArticles } from "../../modules/articles/fetch-articles";
import { UploadArticles } from "./upload-articles";

export const SyncArticles = async () => {
  try {
    const foldersCollection = collection(db, "folders");
    const folderSnap = await getDocs(foldersCollection);
    const folderIds = folderSnap.docs.map((doc) => doc.id);

    console.log("Existing folder IDs in Firestore:", folderIds);

    for (const folderId of folderIds) {
      const articles = await fetchAllArticles({
        folderNumber: Number(folderId),
      });

      if (articles.length > 0) {
        await UploadArticles(
          articles.map((article) => ({
            ...article,
            id: String(article.id),
            thumbs_up: article.thumbs_up_count ?? 0,
            thumbs_down: article.thumbs_down_count ?? 0,
          }))
        );
        console.log(
          `Synchronized ${articles.length} articles for folder ID ${folderId}`
        );
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
