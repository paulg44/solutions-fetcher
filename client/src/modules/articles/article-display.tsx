import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase";
import { useEffect, useState } from "react";

interface IArticle {
  title: string;
  hits: number;
  thumbsUp: number;
  thumbsDown: number;
  id: string;
}

const ArticleDisplay = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  const fetchArticles = async () => {
    try {
      const allArticles = collection(db, "articles");
      const articleSnapshot = await getDocs(allArticles);

      const articleList = articleSnapshot.docs
        .map((doc) => ({
          title: doc.data().title,
          hits: doc.data().hits,
          thumbsUp: doc.data().thumbs_up,
          thumbsDown: doc.data().thumbs_down,
          id: doc.id,
        }))
        .filter(
          (article) =>
            article.hits > 0 || article.thumbsUp > 0 || article.thumbsDown > 0
        );

      setArticles(articleList);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  console.log(articles);

  useEffect(() => {
    fetchArticles();
  }, []);
  return <h2>Display articles</h2>;
};

export default ArticleDisplay;
