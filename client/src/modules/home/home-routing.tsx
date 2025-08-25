import { Routes, Route } from "react-router-dom";
import HomeDashboard from "./home-dashboard";
import CategoryUpdates from "../category-updates/category-updates";
import FolderUpdates from "../folder-updates/folder-updates";

const HomeRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDashboard />} />
      <Route path="/category-updates" element={<CategoryUpdates />} />
      <Route path="/folder-updates" element={<FolderUpdates />} />
    </Routes>
  );
};

export default HomeRouting;
