import {
  ShopOutlined,
  UnorderedListOutlined,
  ContainerOutlined,
  WalletOutlined,
  CoffeeOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu({ handleLogout }) {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          if(item.key === "/"){
            // navigate('/');
            handleLogout();
          }
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          // {
          //   label: "Dashbaord",
          //   icon: <AppstoreOutlined />,
          //   key: "/",
          // },
          {
            label: "Quản lý phim",
            key: "/movies",
            icon: <ShopOutlined />,
          },
          {
            label: "Quản lý xuất chiếu",
            key: "/orders",
            icon: <UnorderedListOutlined />,
          },
          {
            label: "Quản Lý Vé",
            key: "/admin-bills",
            icon: <ContainerOutlined />,
          },
          // {
          //   label: "Coupon",
          //   key: "/coupon",
          //   icon: <WalletOutlined />,
          // },
          // {
          //   label: "Bắp & Nước",
          //   key: "/combo",
          //   icon: <CoffeeOutlined />,
          // },
          {
            label: "Logout", // Add the logout button
            key: "/", // Set a key for the logout button
            icon: <LogoutOutlined />, // You can use any appropriate icon for logout
            style: { 
              color: 'white',
              background: "red"
            },
          },
        ]}
      >
      </Menu>
    </div>
  );
}
export default SideMenu;
