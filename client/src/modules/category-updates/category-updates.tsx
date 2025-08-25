import SharedButton from "../../shared/button/button";
import fetchCategories from "./fetch-categories";
import { useState } from "react";
import { uploadCategories } from "../../core/api/upload-categories";
import { Link } from "react-router-dom";

const CategoryUpdates = () => {
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  const [categoryNameList, setCategoryNameList] = useState<string[]>([]);

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

  const handleUploadCategories = () => {
    const categoriesToUpload = categoryIdList.map((id, index) => ({
      id,
      name: categoryNameList[index] || "Unnamed Category",
    }));
    uploadCategories(categoriesToUpload);
  };

  return (
    <div>
      <Link to="/">
        {" "}
        <SharedButton labelKey="Back Home" />
      </Link>

      <h1>Category Updates</h1>
      <div className="flex flex-col gap-4">
        <SharedButton
          labelKey="Fetch all categories from Helpdesk"
          onClick={handleFetchCategories}
        />
        <SharedButton
          labelKey="Update Database"
          onClick={handleUploadCategories}
        />
      </div>
    </div>
  );
};

export default CategoryUpdates;
