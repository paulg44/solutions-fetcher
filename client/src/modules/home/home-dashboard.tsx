import { Link } from "react-router-dom";
import Articles from "../articles/article-updates";
import SharedButton from "../../shared/button/button";
import ArticleDisplay from "../articles/article-display";

const HomeDashboard = () => {
  return (
    <div className="home-dashboard">
      <h1>Welcome to the Home Dashboard</h1>
      {/* Additional components and content can be added here */}
      <SharedButton>
        <Link to="/category-updates">Go to Category Updates</Link>
      </SharedButton>
      <Link to="/folder-updates">Go to Folder Updates</Link>

      <div>
        <Articles />
      </div>

      <div>
        <ArticleDisplay />
      </div>
    </div>
  );
};

export default HomeDashboard;
