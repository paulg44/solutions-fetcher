import { Route, Routes } from "react-router-dom";
import HomeRouting from "../../modules/home/home-routing";

const AppRouting = () => {
  return (
    <Routes>
      <Route path="/*" element={<HomeRouting />} />
    </Routes>
  );
};

export default AppRouting;
