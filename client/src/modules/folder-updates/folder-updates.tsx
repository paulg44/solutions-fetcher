import SharedButton from "../../shared/button/button";
import { useState } from "react";
import { fetchFolders } from "./fetch-folders";

const FolderUpdates = () => {
  const [categoryId, setCategoryId] = useState<number>();

  const handleFetchFolders = async (categoryNumber: number) => {
    try {
      const fetchedFolders = await fetchFolders({ categoryNumber });
      console.log("Fetched folders:", fetchedFolders);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    }
  };
  return (
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
        {/* Pass this in using firebase */}
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
  );
};

export default FolderUpdates;
