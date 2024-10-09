import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa6";
import { FaBlogger } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { GrResources } from "react-icons/gr";

const { Header, Sider, Content } = Layout;

const About = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/Categories")) setSelectedKey("1");
    else if (path.includes("/faqs")) setSelectedKey("2");
    else if (path.includes("/news")) setSelectedKey("3");
    else if (path.includes("/blogs")) setSelectedKey("4");
    else if (path.includes("/services")) setSelectedKey("5");
    else if (path.includes("/sources")) setSelectedKey("6");
  }, [location]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "1",
      icon: <TbCategory />,
      label: <NavLink to="/Categories">Category</NavLink>,
    },
    {
      key: "2",
      icon: <MdPeopleAlt />,
      label: <NavLink to="/faqs">Faqs</NavLink>,
    },
    {
      key: "3",
      icon: <FaNewspaper />,
      label: <NavLink to="/news">News</NavLink>,
    },
    {
      key: "4",
      icon: <FaBlogger />,
      label: <NavLink to="/blogs">Blogs</NavLink>,
    },
    {
      key: "5",
      icon: <MdMiscellaneousServices />,
      label: <NavLink to="/services">Services</NavLink>,
    },

    {
      key: "6",
      icon: <GrResources />,
      label: <NavLink to="/sources">Sources</NavLink>,
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    localStorage.removeItem("tokenchik");
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto", height: "100vh" }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={(e) => setSelectedKey(e.key)}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={showModal}
              style={{
                marginRight: "10px",
                backgroundColor: "#001f3a",
              }}
            >
              Log Out
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Modal
        className="logout"
        title="Confirm Logout"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default About;
