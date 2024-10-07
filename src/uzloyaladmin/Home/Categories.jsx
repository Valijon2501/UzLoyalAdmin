import { HomePageStyle } from "./HomePageStyle";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Categories = () => {
  // ======================category get
  const [categ, setCateg] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idClick, setIdClick] = useState();

  const tokenxon = localStorage.getItem("tokenchik");

  const getCategory = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((element) => setCateg(element?.data || []));
  };

  useEffect(() => {
    getCategory();
  }, []);

  const categoryPost = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);

    fetch("https://api.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenxon}`,
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

  const deleteApi = (parent_id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${parent_id}`, {
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

  const editFunction = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);

    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${idClick}`, {
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

  const modalOpenFunction = (parent_id) => {
    setEditOpenModal(!editOpenModal);
    setOpenModal(false);
    setIdClick(parent_id);
    const selectedCategory = categ.find((cat) => cat.id === parent_id);
    if (selectedCategory) {
      setName(selectedCategory.name);
      setDescription(selectedCategory.description);
    }
  };

  const modalOpenFunctionAdd = () => {
    setEditOpenModal(false);
    setOpenModal(!openModal);
    setName("");
    setDescription("");
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
                onChange={(e) => setName(e?.target?.value)}
                type="text"
                placeholder="name"
                required
              />
              <input
                onChange={(e) => setDescription(e?.target?.value)}
                type="text"
                placeholder="Description"
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
                onChange={(e) => setName(e?.target?.value)}
                type="text"
                placeholder="Name"
                required
              />
              <input
                onChange={(e) => setDescription(e?.target?.value)}
                type="text"
                placeholder="Description"
                required
              />
              <button onClick={editFunction}>edit add</button>
            </form>
          </div>
        )}
        <table id="customers" className="customers">
          <thead>
            <tr>
              <th>№</th>
              <th>id</th>
              <th>Name</th>
              <th>Description</th>
              <th>
                <div>
                  <p>Harakat</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {categ.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.description}</td>
                <td>
                  <span>
                    <button
                      className="btn"
                      onClick={() => modalOpenFunction(item?.id)}
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
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </HomePageStyle>
    </>
  );
};

export default Categories;
