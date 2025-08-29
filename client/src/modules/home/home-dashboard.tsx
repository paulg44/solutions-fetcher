import { Link } from "react-router-dom";
import Articles from "../articles/article-updates";

const HomeDashboard = () => {
  return (
    <div className="home-dashboard">
      <h1>Welcome to the Home Dashboard</h1>
      {/* Additional components and content can be added here */}
      <Link to="/category-updates">Go to Category Updates</Link>
      <Link to="/folder-updates">Go to Folder Updates</Link>

      <div>
        <Articles />
      </div>
    </div>
  );
};

export default HomeDashboard;
