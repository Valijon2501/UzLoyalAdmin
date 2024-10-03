// import { useNavigate } from "react-router-dom";
import { HomePageStyle } from "./HomePageStyle";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Categories = () => {
  // ======================category get
  const [categ, setCateg] = useState();
  function getCategory() {
    fetch("https://api.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((element) => setCateg(element?.data));
  }

  useEffect(() => {
    getCategory();
  }, []);

  //==================== modal function
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);

  //=================== category post
  const [nameEn, setNameEn] = useState();
  const [nameRu, setNameRu] = useState();
  const [image, setImage] = useState();

  const tokenxon = localStorage.getItem("tokenchik");

  const formdata = new FormData();
  formdata.append("name_en", nameEn);
  formdata.append("name_ru", nameRu);
  formdata.append("images", image);
  const categoryPost = (event) => {
    event.preventDefault();
    fetch("https://api.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
        // "Content-type": "multipart/form-data",
        " Authorization": `Bearer ${tokenxon}`,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((elem) => {
        if (elem?.success) {
          getCategory();
          toast.success(elem?.message);
          setOpenModal(false);
        } else {
          toast.error(elem?.message);
        }
      });
  };

  //============================= delete api

  const deleteApi = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/1/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenxon}`,
      },
    })
      .then((resp) => resp.json())
      .then((items) => {
        if (items?.success) {
          toast.success(items?.message);
          getCategory();
        } else {
          toast.error(items?.message);
        }
      });
  };

  //=================== put api
  const modalOpenFunction = (id) => {
    setEditOpenModal(!editOpenModal);
    setOpenModal(false);
    setIdClick(id);
  };
  const modalOpenFunctionAdd = () => {
    setEditOpenModal(false);
    setOpenModal(!openModal);
  };
  const [idClick, setIdClick] = useState();
  // ////////////////////////////////
  const editFunction = (e) => {
    e.preventDefault();
    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/1/${idClick}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenxon}`,
      },
      body: formdata,
    })
      .then((responses) => responses.json())
      .then((item) => {
        if (item?.success) {
          getCategory();
          toast.success(item?.message);
          setEditOpenModal(false);
          setIdClick();
        } else {
          toast.error(item?.message);
        }
      });
  };
  return (
    <>
      <HomePageStyle>
        <button onClick={modalOpenFunctionAdd}>
          {openModal ? "yopish" : " Qo'shish"}
        </button>
        {openModal && (
          <div className="modal">
            <h1>modal</h1>
            <form>
              <input
                onChange={(e) => setNameEn(e?.target?.value)}
                type="text"
                placeholder="name en"
                required
              />
              <input
                onChange={(e) => setNameRu(e?.target?.value)}
                type="text"
                placeholder="name ru"
                required
              />
              <input
                // multiple
                onChange={(e) => setImage(e?.target?.files[0])}
                type="file"
                required
              />
              <button onClick={categoryPost}>qo'shilsin add</button>
            </form>
          </div>
        )}
        {editOpenModal && (
          <div className="modal">
            <h1>edit modal</h1>
            <form>
              <input
                onChange={(e) => setNameEn(e?.target?.value)}
                type="text"
                placeholder="name en"
                required
              />
              <input
                onChange={(e) => setNameRu(e?.target?.value)}
                type="text"
                placeholder="name ru"
                required
              />
              <input
                // multiple
                onChange={(e) => setImage(e?.target?.files[0])}
                type="file"
                required
              />
              <button onClick={editFunction}>edit add</button>
            </form>
          </div>
        )}

        <table id="customers" className="customers">
          <tr>
            <th>name_en</th>
            <th>name_ru</th>
            <th>Image</th>
            <th>
              <div>
                <p>Action</p>
              </div>
            </th>
          </tr>
          {categ?.map((item, index) => (
            <tr key={index}>
              <td>{item?.name_en}</td>
              <td>{item?.name_ru}</td>
              <td>
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                  alt={"item?.name_en"}
                />
              </td>
              <td>
                <span>
                  <button
                    className="btn"
                    onClick={(e) => modalOpenFunction(item?.id)}
                  >
                    <FaEdit className="FaEdit" />
                  </button>
                </span>
                <span>
                  <button
                    className="btn_to"
                    onClick={() => deleteApi(item?.id)}
                  >
                    <MdDeleteForever className="MdDeleteForever" />
                  </button>
                </span>
              </td>
              {/* <td></td> */}
            </tr>
          ))}
        </table>
        <ToastContainer />
      </HomePageStyle>
    </>
  );
};
export default Categories;
