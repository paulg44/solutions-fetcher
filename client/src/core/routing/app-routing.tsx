import { Route, Routes } from "react-router-dom";
import HomeRouting from "../../modules/home/home-routing";
import CategoryUpdates from "../../modules/category-updates/category-updates";
import FolderUpdates from "../../modules/folder-updates/folder-updates";

const AppRouting = () => {
  return (
    <Routes>
      <Route path="/*" element={<HomeRouting />} />
      <Route path="/category-updates/*" element={<CategoryUpdates />} />
      <Route path="/folder-updates/*" element={<FolderUpdates />} />
    </Routes>
  );
};

export default AppRouting;
