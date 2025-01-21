import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import NotFound from "../pages/NotFound";
import ProfileDetails from "../pages/ProfileDetails";
import Admin from "../pages/Admin";
import UpdateOrCreate from "../pages/UpdateOrCreate";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<ProfileDetails />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/:id" element={<UpdateOrCreate />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
