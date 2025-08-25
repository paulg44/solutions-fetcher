import { Routes, Route } from "react-router-dom";
import FolderUpdates from "./folder-updates";

const HomeRouting = () => {
  return (
    <Routes>
      <Route path="/folder-updates" element={<FolderUpdates />} />
    </Routes>
  );
};

export default HomeRouting;
