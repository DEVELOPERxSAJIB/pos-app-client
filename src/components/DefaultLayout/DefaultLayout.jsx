import "./DefaultLayout.css";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  CopyOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  HolderOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import RingLoader from "react-spinners/RingLoader";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const onToggle = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  const { loader } = useSelector((state) => state.product);

  const handleLogout = () => {
    localStorage.removeItem("pos-user")
    message.success("Logged Out")
  };

  const [cartCount, setCartCount] = useState([])

  useEffect(() => {
    setCartCount(JSON.parse(localStorage.getItem("cartItems")));
  }, [cartCount]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div onClick={() => navigate("/home")} className="demo-logo-vertical">
          <h3>POS APP</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: "/home",
              icon: <HomeOutlined />,
              label: <Link to={"/home"}>Home</Link>,
            },
            {
              key: "/cart",
              icon: <ShoppingCartOutlined />,
              label: <Link to={"/cart"}>Cart</Link>,
            },
            {
              key: "/bills",
              icon: <CopyOutlined />,
              label: <Link to={"/bills"}>Bills</Link>,
            },
            {
              key: "/items",
              icon: <HolderOutlined />,
              label: <Link to={"/items"}>Items</Link>,
            },
            {
              key: "/customers",
              icon: <UsergroupAddOutlined />,
              label: <Link to={"/customers"}>Customers</Link>,
            },
            {
              key: "/logout",
              icon: <LogoutOutlined />,
              label: <Link onClick={handleLogout} to={'/login'}>Logout</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="d-flex justify-content-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              onToggle={onToggle}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div
              onClick={() => navigate("/cart")}
              className="cart-area d-flex align-items-center gap-2"
            >
              <p>{cartCount?.length ? cartCount?.length : 0}</p>
              <div className="cart-icon">
                <ShoppingCartOutlined />
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            marginTop: 24,
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
          className="hide-overflow"
        >
          {loader && (
            <div className="loader">
              <RingLoader
                color={"#047979"}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}

          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
