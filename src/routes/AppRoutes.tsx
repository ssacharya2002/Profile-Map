import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import NotFound from "../pages/NotFound";
import ProfileDetails from "../pages/ProfileDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<ProfileDetails />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
