import { HomePageStyle } from "./HomePageStyle";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Modal, Button, Input, Form } from "antd";

const Categories = () => {
  const [categ, setCateg] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [idClick, setIdClick] = useState(null);
  const [loading, setLoading] = useState(false);
  const tokenxon = localStorage.getItem("tokenchik");

  const getCategory = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((element) => setCateg(element?.data || []));
  };

  useEffect(() => {
    getCategory();
  }, []);

  const categoryPost = (values) => {
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("description", values.description);
    
    setLoading(true); // Loadingni yoqamiz

    fetch("https://api.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenxon}`,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((elem) => {
        setLoading(false); // Loadingni o'chiramiz
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

  const editFunction = (values) => {
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("description", values.description);

    setLoading(true); // Loadingni yoqamiz

    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${idClick}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenxon}`,
      },
      body: formdata,
    })
      .then((responses) => responses.json())
      .then((item) => {
        setLoading(false); // Loadingni o'chiramiz
        if (item?.success) {
          getCategory();
          toast.success(item?.message);
          setEditOpenModal(false);
          setIdClick(null);
        } else {
          toast.error(item?.message);
        }
      });
  };

  const openModalFunction = (parent_id) => {
    if (parent_id) {
      setEditOpenModal(true);
      const selectedCategory = categ.find((cat) => cat.id === parent_id);
      if (selectedCategory) {
        form.setFieldsValue({
          name: selectedCategory.name,
          description: selectedCategory.description,
        });
      }
    } else {
      setOpenModal(true);
      form.resetFields();
      setEditOpenModal(false);
    }
    setIdClick(parent_id);
  };

  const handleSubmit = (values) => {
    if (editOpenModal) {
      editFunction(values);
    } else {
      categoryPost(values);
    }
  };

  return (
    <>
      <HomePageStyle>
        <Button
          type="primary"
          onClick={() => openModalFunction()}
          style={{ marginBottom: "10px" }}
        >
          Add Category
        </Button>
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
              <tr key={item?.id}>
                <td>{index + 1}</td>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.description}</td>
                <td>
                  <span>
                    <button
                      className="btn"
                      onClick={() => openModalFunction(item?.id)}
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

        <Modal
          title={editOpenModal ? "Edit Category" : "Add Category"}
          open={openModal || editOpenModal}
          footer={null}
          onCancel={() => {
            setOpenModal(false);
            setEditOpenModal(false);
          }}
        >
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input placeholder="Description" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <ToastContainer />
      </HomePageStyle>
    </>
  );
};

export default Categories;
