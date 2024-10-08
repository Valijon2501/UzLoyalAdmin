import { Route, Routes } from "react-router-dom";
import LaginPage from "../uzloyaladmin/Login/LoginPage";
import Categories from "../uzloyaladmin/Home/Categories";
import Faqs from "../uzloyaladmin/Home/Faqs";
import About from "../uzloyaladmin/Home/About/About";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LaginPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};
export default Router;
