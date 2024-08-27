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
import { headerContent } from "../headers/header";

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
    key: "LavozimSozlamalari",
    icon: (
      <div className="bg-gray-100 rounded p-2">
        <IoSettingsOutline className="text-gray-600" />
      </div>
    ),
    label: <Link to="/lavozimSozlamalari">Lavozim Sozlamalari</Link>,
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

  const [searchVal, setSearchVal] = useState("");

  const [dataCat, setDataCat] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCat = await axios.get(
          "https://2f972b43e3dad83a.mokky.dev/kotegoriyalar"
        );
        setDataCat(responseCat.data);

        const responseProducts = await axios.get(
          "https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar"
        );
        setProducts(responseProducts.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const location = useLocation();
  const currentHeader = location.pathname;

  const handleSearch = (value: string) => {
    const filteredProducts = products.filter((prod) =>
      prod.name.toLowerCase().includes(value.toLowerCase())
    );
  };
  return (
    <AntLayout>
      <Sider
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
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["buyurtmalar"]}
          items={items}
        />

        <Menu
          theme="light"
          mode="inline"
          className="pt-52"
          items={[
            {
              key: "Chiqish",
              icon: <IoExitOutline />,
              label: (
                <div>
                  <Link to="/chiqish">Chiqish</Link>
                </div>
              ),
            },
          ]}
        />
      </Sider>
      <AntLayout>
        {/* <Header
          className="headerM"
          style={{
            padding: 0,
            background: colorBgContainer,
            minHeight: "80px",
          }}
        >
          <div>
            {headerContent(currentHeader, {
              onSearch: handleSearch,
            }) || <div> Default Header Content</div>}
          </div>
        </Header> */}
        <Content>
          <div
            style={{
              minHeight: "100vh",
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
