import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { VscChecklist } from "react-icons/vsc";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { LuBarChart2 } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBell } from "react-icons/bi";
import { TfiLayoutMediaOverlay } from "react-icons/tfi";
import { TfiLocationPin } from "react-icons/tfi";
import { IoExitOutline } from "react-icons/io5";

import { Layout as AntLayout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = AntLayout;

const items = [
  {
    key: "Buyurtmalar",
    icon: <FaRegCircleCheck />,
    label: <Link to="/buyurtmalar">Buyurtmalar</Link>,
  },
  {
    key: "Maxsulotlar",
    icon: <HiOutlineArchiveBox />,
    label: <Link to="/maxsulotlar">Maxsulotlar</Link>,
  },
  {
    key: "Kategoriyalar",
    icon: <VscChecklist />,
    label: <Link to="/kategoriyalar">Kategoriyalar</Link>,
  },
  {
    key: "Filiallar",
    icon: <IoLocationOutline />,
    label: <Link to="/filiallar">Filiallar</Link>,
  },
  {
    key: "Mijozlar",
    icon: <MdOutlinePeopleAlt />,
    label: <Link to="/mijozlar">Mijozlar</Link>,
  },
  {
    key: "Xisobot",
    icon: <LuBarChart2 />,
    label: <Link to="/xisobot">Xisobot</Link>,
  },
  {
    key: "Hodimlar",
    icon: <FaPeopleGroup />,
    label: <Link to="/hodimlar">Hodimlar</Link>,
  },
  {
    key: "LavozimSozlamalari",
    icon: <IoSettingsOutline />,
    label: <Link to="/lavozimSozlamalari">Lavozim Sozlamalari</Link>,
  },
  {
    key: "Bildirishnoma",
    icon: <BiBell />,
    label: <Link to="/bildirishnoma">Bildirishnoma</Link>,
  },
  {
    key: "YetkazishNarxi",
    icon: <HiOutlineArchiveBox />,
    label: <Link to="/yetkazishNarxi">Yetkazish Narxi</Link>,
  },
  {
    key: "ShikoyatFikrlar",
    icon: <TfiLayoutMediaOverlay />,
    label: <Link to="/shikoyatFikrlar">Shikoyat va Fikrlar</Link>,
  },
  {
    key: "Xarita",
    icon: <TfiLocationPin />,
    label: <Link to="/xarita">Xarita</Link>,
  },
  {
    key: "Chiqish",
    icon: <IoExitOutline />,
    label: <Link to="/chiqish">Chiqish</Link>,
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AntLayout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical text-yellow">salom</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["buyurtmalar"]}
          items={items}
        />
      </Sider>
      <AntLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          + yangi buyurtma qoshish
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
