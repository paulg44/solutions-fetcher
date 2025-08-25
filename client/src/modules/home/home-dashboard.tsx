import SharedButton from "../../shared/button/button";
import fetchCategories from "../../functions/fetch-categories";
import { useState } from "react";
import { uploadCategories } from "../../core/api/upload-categories";
import fetchFolders from "../../functions/fetch-folders";

const HomeDashboard = () => {
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  const [categoryNameList, setCategoryNameList] = useState<string[]>([]);

  const [categoryId, setCategoryId] = useState<number>();

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

  const handleFetchFolders = async (categoryNumber: number) => {
    try {
      const fetchedFolders = await fetchFolders({ categoryNumber });
      console.log("Fetched folders:", fetchedFolders);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
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
    <div className="home-dashboard">
      <h1>Welcome to the Home Dashboard</h1>
      {/* Additional components and content can be added here */}
      <div className="flex flex-col gap-4">
        <SharedButton
          labelKey="Fetch all categories from Helpdesk"
          onClick={handleFetchCategories}
        />
        <SharedButton
          labelKey="Update Database"
          onClick={handleUploadCategories}
        />
        <p>Fetched Category IDs: {categoryIdList.join(", ")}</p>
      </div>
      <div>
        <label>{`Search folder using category ${categoryId}`}</label>
        <select
          name="categoryId"
          id="categoryId"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(Number(e.target.value));
          }}
        >
          {categoryIdList.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <SharedButton
          labelKey={`Fetch folders for Category ID ${categoryId}`}
          onClick={() => handleFetchFolders(categoryId ?? 0)}
        />
      </div>
    </div>
  );
};

export default HomeDashboard;
