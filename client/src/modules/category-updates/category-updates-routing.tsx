import { Routes, Route } from "react-router-dom";
import CategoryUpdates from "./category-updates";

const HomeRouting = () => {
  return (
    <Routes>
      <Route path="/category-updates" element={<CategoryUpdates />} />
    </Routes>
  );
};

export default HomeRouting;
