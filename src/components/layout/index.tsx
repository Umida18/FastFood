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
    icon: <FaRegCircleCheck className="text-gray-600" />,
    label: <Link to="/layout/buyurtmalar">Buyurtmalar</Link>,
  },
  {
    key: "maxsulotlar",
    icon: <HiOutlineArchiveBox className="text-gray-600" />,
    label: <Link to="/layout/maxsulotlar">Maxsulotlar</Link>,
  },
  {
    key: "kategoriyalar",
    icon: <VscChecklist className="text-gray-600" />,
    label: <Link to="/layout/kategoriyalar">Kategoriyalar</Link>,
  },
  {
    key: "filiallar",
    icon: <IoLocationOutline className="text-gray-600" />,
    label: <Link to="/layout/filiallar">Filiallar</Link>,
  },
  {
    key: "mijozlar",
    icon: <MdOutlinePeopleAlt className="text-gray-600" />,
    label: <Link to="/layout/mijozlar">Mijozlar</Link>,
  },
  {
    key: "xisobot",
    icon: <LuBarChart2 className="text-gray-600" />,
    label: <Link to="/layout/xisobot">Xisobot</Link>,
  },
  {
    key: "hodimlar",
    icon: <FaPeopleGroup className="text-gray-600" />,
    label: <Link to="/layout/hodimlar">Hodimlar</Link>,
  },
  {
    key: "yetkazishNarxi",
    icon: <HiOutlineArchiveBox className="text-gray-600" />,
    label: <Link to="/layout/yetkazishNarxi">Yetkazish Narxi</Link>,
  },
  {
    key: "xarita",
    icon: <TfiLocationPin className="text-gray-600" />,
    label: <Link to="/layout/xarita">Xarita</Link>,
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
  const path = location.pathname.split("/layout/")[1];
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
                    <Link to="/">Chiqish</Link>
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
