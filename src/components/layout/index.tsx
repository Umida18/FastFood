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
import Search from "antd/es/input/Search";

import "./style.css";
import bitmap from "./Bitmap.png";
import axios from "axios";
const { Header, Content, Footer, Sider } = AntLayout;

const items = [
  {
    key: "Buyurtmalar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <FaRegCircleCheck className="text-gray-600" />
      </div>
    ),
    label: <Link to="/buyurtmalar">Buyurtmalar</Link>,
  },
  {
    key: "Maxsulotlar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <HiOutlineArchiveBox className="text-gray-600" />
      </div>
    ),
    label: <Link to="/maxsulotlar">Maxsulotlar</Link>,
  },
  {
    key: "Kategoriyalar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <VscChecklist className="text-gray-600" />
      </div>
    ),
    label: <Link to="/kategoriyalar">Kategoriyalar</Link>,
  },
  {
    key: "Filiallar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <IoLocationOutline className="text-gray-600" />
      </div>
    ),
    label: <Link to="/filiallar">Filiallar</Link>,
  },
  {
    key: "Mijozlar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <MdOutlinePeopleAlt className="text-gray-600" />
      </div>
    ),
    label: <Link to="/mijozlar">Mijozlar</Link>,
  },
  {
    key: "Xisobot",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <LuBarChart2 className="text-gray-600" />
      </div>
    ),
    label: <Link to="/xisobot">Xisobot</Link>,
  },
  {
    key: "Hodimlar",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <FaPeopleGroup className="text-gray-600" />
      </div>
    ),
    label: <Link to="/hodimlar">Hodimlar</Link>,
  },

  {
    key: "YetkazishNarxi",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <HiOutlineArchiveBox className="text-gray-600" />
      </div>
    ),
    label: <Link to="/yetkazishNarxi">Yetkazish Narxi</Link>,
  },

  {
    key: "Xarita",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <TfiLocationPin className="text-gray-600" />
      </div>
    ),
    label: <Link to="/xarita">Xarita</Link>,
  },
];
interface Category {
  id: number;
  MainKateg: number;
  name: string;
}

interface SelecCat {
  [key: string]: string[];
}
interface Product {
  id: number;
  name: string;
  type: number;
  price: string;
  desc: string;
  img: string;
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
            defaultSelectedKeys={["buyurtmalar"]}
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
