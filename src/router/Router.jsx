import { Navigate, Route, Routes } from "react-router-dom";
import LaginPage from "../uzloyaladmin/Login/LoginPage";
import Categories from "../uzloyaladmin/Home/Categories";
import Faqs from "../uzloyaladmin/Home/Faqs";
import About from "../uzloyaladmin/Home/About/About";
import ProtectedRoute from "../uzloyaladmin/Login/Protect";
import News from "../uzloyaladmin/Home/News";
import Blogs from "../uzloyaladmin/Home/Blogs";
import Services from "../uzloyaladmin/Home/Services";
import Sources from "../uzloyaladmin/Home/Sources";

const Router = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/login" element={<Login />} />; */}
        <Route path="/login" element={<LaginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        >
          <Route index element={<Categories />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/news" element={<News />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />;
      </Routes>
    </>
  );
};
export default Router;
