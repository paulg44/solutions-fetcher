import { Routes, Route } from "react-router-dom";
import HomeDashboard from "./home-dashboard";

const HomeRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDashboard />} />
    </Routes>
  );
};

export default HomeRouting;
