import SharedButton from "../../shared/button/button";
import { useState, useEffect } from "react";
import { fetchFolders } from "./fetch-folders";
import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase";
import { UploadFolders } from "../../core/api/upload-folders";
import { Link } from "react-router-dom";

const FolderUpdates = () => {
  const [categoryId, setCategoryId] = useState<number>();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  console.log("Selected categoryId:", categoryId);

  const [folderNames, setFolderNames] = useState<
    { id: number; name: string }[]
  >([]);

  const handleFetchFolders = async (categoryNumber: number) => {
    try {
      const fetchedFolders = await fetchFolders({ categoryNumber });
      setFolderNames(
        fetchedFolders.map((folder) => ({ id: folder.id, name: folder.name }))
      );
      console.log("Fetched folders:", fetchedFolders);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    }
  };

  const fetchCategoriesFromDB = async () => {
    try {
      const categoriesCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoriesCollection);
      const categories = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCategories(categories);
      console.log("Categories fetched from Firestore:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCategoriesFromDB();
  }, []);

  const handleUploadFolders = () => {
    const foldersToUpload = folderNames.map((folder) => ({
      id: String(folder.id),
      name: folder.name,
      categoryId: String(categoryId),
    }));
    UploadFolders(foldersToUpload);
  };

  return (
    <div>
      <Link to="/">
        <SharedButton labelKey="Back Home" />
      </Link>

      <h1>Update Folders for a Category</h1>
      <select
        name="categoryId"
        id="categoryId"
        value={categoryId}
        onChange={(e) => {
          setCategoryId(Number(e.target.value));
        }}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <SharedButton
        labelKey={`Fetch folders for selected Category`}
        onClick={() => handleFetchFolders(categoryId ?? 0)}
      />
      <div>
        <h2>Folders:</h2>
        <ul>
          {folderNames.map((folder) => (
            <li key={folder.id}>{folder.name}</li>
          ))}
        </ul>
      </div>
      <SharedButton
        labelKey="Update Selected Folders"
        onClick={handleUploadFolders}
      />
    </div>
  );
};

export default FolderUpdates;
