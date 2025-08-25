import addArticle from "../../core/api/testUpload";
import SharedButton from "../../shared/button/button";

const HomeDashboard = () => {
  const newArticle = {
    id: "1",
    title: "Sample Solution Article",
    content: "This is a sample solution article content.",
    category: "General",
    tags: ["sample", "solution"],
    authorId: "admin",
  };

  const handleNewArticle = async () => {
    try {
      const articleId = await addArticle(newArticle);
      console.log("Added article with ID:", articleId);
    } catch (error) {
      console.error("Failed to add article:", error);
    }
  };

  return (
    <div className="home-dashboard">
      <h1>Welcome to the Home Dashboard</h1>
      {/* Additional components and content can be added here */}
      <SharedButton
        labelKey="Add Solution Article"
        onClick={handleNewArticle}
      />
    </div>
  );
};

export default HomeDashboard;
