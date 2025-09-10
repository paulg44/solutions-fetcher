import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase";
import { useEffect, useMemo, useState } from "react";

interface IArticle {
  title: string;
  hits: number;
  thumbsUp: number;
  thumbsDown: number;
  id: string;
}

const ArticleDisplay = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [sortOptions, setSortOptions] = useState<string>("");

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

  const sortedArticles = useMemo(() => {
    if (!sortOptions) return articles;

    const sorted = [...articles].sort((a, b) => {
      if (sortOptions === "hits") {
        return b.hits - a.hits;
      } else if (sortOptions === "thumbsUp") {
        return b.thumbsUp - a.thumbsUp;
      } else if (sortOptions === "thumbsDown") {
        return b.thumbsDown - a.thumbsDown;
      }
      return 0;
    });
    return sorted;
  }, [articles, sortOptions]);

  console.log(articles);

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div>
      <h2>Display articles</h2>
      <select
        name="sortOption"
        id="sortOption"
        value={sortOptions}
        onChange={(e) => {
          setSortOptions(e.target.value);
        }}
      >
        S<option value="">--Please choose an option--</option>
        <option value="hits">Hits</option>
        <option value="thumbsUp">Thumbs Up</option>
        <option value="thumbsDown">Thumbs Down</option>
      </select>

      <div className="articleList">
        {sortedArticles.sort().map((article) => (
          <div key={article.id} className="border p-4 my-4">
            <h3 className="text-3xl">{article.title}</h3>
            <p>Hits: {article.hits}</p>
            <p>Thumbs Up: {article.thumbsUp}</p>
            <p>Thumbs Down: {article.thumbsDown}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleDisplay;
