import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomePageStyle } from "../Home/HomePageStyle";
import { IoPersonOutline } from "react-icons/io5";
import { PiLockKeyLight } from "react-icons/pi";

const LaginPage = () => {
  const [raqam, setRaqam] = useState();
  const [parol, setParol] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenchik");

  useEffect(() => {
    if (token) {
      navigate("/categories");
    }
  }, [token, navigate]);

  const loginSubmit = (event) => {
    event.preventDefault();
    fetch("https://api.dezinfeksiyatashkent.uz/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone_number: raqam,
        password: parol,
      }),
    })
      .then((res) => res.json())
      .then((element) => {
        if (element?.success === true) {
          localStorage.setItem(
            "tokenchik",
            element?.data?.tokens?.accessToken?.token
          );
          toast.success(element?.message);
          navigate("/categories");
        } else {
          toast.error(element?.message);
        }
      })
      .catch((error) => {
        toast.error("Serverda xatolik yuz berdi");
      });
  };

  return (
    <>
      <HomePageStyle>
        <form onSubmit={loginSubmit} className="form_contaner">
          <IoPersonOutline className="IoPersonOutline" />
          <input
            className="input_field"
            onChange={(e) => setRaqam(e?.target?.value)}
            type="text"
            placeholder="Phone Number"
            required
            minLength={3}
            value={raqam}
          />
          <PiLockKeyLight className="PiLockKeyLight" />
          <input
            className="input_field"
            onChange={(e) => setParol(e?.target?.value)}
            type="password"
            placeholder="password"
            required
            minLength={3}
            value={parol}
          />
          <button className="submir_btn" type="submit">
            Submit
          </button>
        </form>
        <ToastContainer />
      </HomePageStyle>
    </>
  );
};
export default LaginPage;
