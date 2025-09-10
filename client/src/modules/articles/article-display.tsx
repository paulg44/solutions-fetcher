import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase";
import { useEffect, useMemo, useState } from "react";

interface IArticle {
  title: string;
  hits: number;
  thumbs_up: number;
  thumbs_down: number;
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
          thumbs_up: doc.data().thumbs_up,
          thumbs_down: doc.data().thumbs_down,
          id: doc.id,
        }))
        .filter(
          (article) =>
            article.hits > 0 ||
            article.thumbs_down > 0 ||
            article.thumbs_down > 0
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
      } else if (sortOptions === "thumbs_up") {
        return b.thumbs_up - a.thumbs_up;
      } else if (sortOptions === "thumbs_down") {
        return b.thumbs_down - a.thumbs_down;
      }
      return 0;
    });
    return sorted;
  }, [articles, sortOptions]);

  //   console.log(articles);
  console.log(sortedArticles);
  console.log(sortOptions);

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
        <option value="thumbs_up">Thumbs Up</option>
        <option value="thumbs_down">Thumbs Down</option>
      </select>

      <div className="articleList">
        {sortedArticles.sort().map((article) => (
          <div key={article.id} className="border p-4 my-4">
            <h3 className="text-3xl">{article.title}</h3>
            <p>Hits: {article.hits}</p>
            <p>Thumbs Up: {article.thumbs_up}</p>
            <p>Thumbs Down: {article.thumbs_down}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleDisplay;
