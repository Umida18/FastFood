import React, { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { VscChecklist } from "react-icons/vsc";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { LuBarChart2 } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiLocationPin } from "react-icons/tfi";
import { IoExitOutline } from "react-icons/io5";
import "./index.css";
import { Layout as AntLayout, Menu, theme } from "antd";
import { Link, useLocation } from "react-router-dom";

import "./style.css";
import bitmap from "./Bitmap.png";
const { Header, Content, Footer, Sider } = AntLayout;

const items = [
  {
    key: "buyurtmalar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <FaRegCircleCheck className="text-gray-600" />
      </div>
    ),
    label: <Link to="/buyurtmalar">Buyurtmalar</Link>,
  },
  {
    key: "maxsulotlar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <HiOutlineArchiveBox className="text-gray-600" />
      </div>
    ),
    label: <Link to="/maxsulotlar">Maxsulotlar</Link>,
  },
  {
    key: "kategoriyalar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <VscChecklist className="text-gray-600" />
      </div>
    ),
    label: <Link to="/kategoriyalar">Kategoriyalar</Link>,
  },
  {
    key: "filiallar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <IoLocationOutline className="text-gray-600" />
      </div>
    ),
    label: <Link to="/filiallar">Filiallar</Link>,
  },
  {
    key: "mijozlar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <MdOutlinePeopleAlt className="text-gray-600" />
      </div>
    ),
    label: <Link to="/mijozlar">Mijozlar</Link>,
  },
  {
    key: "xisobot",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <LuBarChart2 className="text-gray-600" />
      </div>
    ),
    label: <Link to="/xisobot">Xisobot</Link>,
  },
  {
    key: "hodimlar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <FaPeopleGroup className="text-gray-600" />
      </div>
    ),
    label: <Link to="/hodimlar">Hodimlar</Link>,
  },

  {
    key: "yetkazishNarxi",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <HiOutlineArchiveBox className="text-gray-600" />
      </div>
    ),
    label: <Link to="/yetkazishNarxi">Yetkazish Narxi</Link>,
  },

  {
    key: "xarita",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <TfiLocationPin className="text-gray-600" />
      </div>
    ),
    label: <Link to="/xarita">Xarita</Link>,
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState([""]);
  const [openKeys, setOpenKeys] = useState([""]);

  useEffect(() => {
    setSelectedKey([location.pathname.slice(1)]);
  }, []);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log("path", path);

  return (
    <AntLayout>
      <Sider
        style={{
          height: "100vh",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
        breakpoint="md"
        collapsedWidth="0"
        className="h-full"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="bg-white p-4 flex flex-row align-items-center justify-center gap-2">
          <div>
            <img
              src={bitmap}
              alt=""
              width={"40px"}
              height={"40px"}
              className="overflow-hidden rounded-full "
            />
          </div>
          <div>
            <p className="text-[10px] ">Fast Food</p>
            <p className="text-[8px] ">Online Mahsulotlar sotuvi</p>
          </div>
        </div>
        <div className="h-[85vh] flex flex-col justify-between ">
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[path]}
            // selectedKeys={selectedKey}
            // onSelect={({ selectedKeys }) => {
            //   setSelectedKey(selectedKeys);
            // }}
            // openKeys={openKeys}
            // onOpenChange={(keys) => {
            //   setOpenKeys(keys);
            // }}
            items={items}
          />

          <Menu
            theme="light"
            mode="inline"
            className=""
            items={[
              {
                key: "Chiqish",
                icon: <IoExitOutline />,
                label: (
                  <div>
                    <Link to="/login">Chiqish</Link>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Sider>
      <AntLayout>
        <Content>
          <div
            style={{
              height: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              backgroundColor: "#edeff3",
            }}
          >
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
