import addArticle from "../../core/api/testUpload";
import SharedButton from "../../shared/button/button";
import fetchCategories from "../../functions/fetch-categories";
import { useState } from "react";
import { uploadCategories } from "../../core/api/upload-categories";

const HomeDashboard = () => {
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  const [categoryNameList, setCategoryNameList] = useState<string[]>([]);
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

  const handleFetchCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();
      const categoryIds = fetchedCategories.map((category) =>
        String(category.id)
      );
      const categoryNames = fetchedCategories.map((category) =>
        String(category.name)
      );
      setCategoryIdList(categoryIds);
      setCategoryNameList(categoryNames);
      console.log("Fetched categories:", fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
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
      <div className="flex flex-col gap-4">
        <SharedButton
          labelKey="Fetch all categories from Helpdesk"
          onClick={handleFetchCategories}
        />
        <SharedButton
          labelKey="Update Database"
          onClick={() =>
            uploadCategories({ id: categoryIdList, name: categoryNameList })
          }
        />
        <p>Fetched Category IDs: {categoryIdList.join(", ")}</p>
      </div>
    </div>
  );
};

export default HomeDashboard;
