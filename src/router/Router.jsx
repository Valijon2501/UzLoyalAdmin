import { Route, Routes } from "react-router-dom";
import LaginPage from "../uzloyaladmin/Login/LoginPage";
import Categories from "../uzloyaladmin/Home/Categories";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LaginPage />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
};
export default Router;
