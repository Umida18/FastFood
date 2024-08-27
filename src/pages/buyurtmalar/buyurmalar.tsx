import React, { useEffect, useState } from "react";
import { Typography, Drawer, Button, Avatar, Tabs } from "antd";
import { FaPlus } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { TbX } from "react-icons/tb";
import TabPane from "antd/es/tabs/TabPane";
interface UserInfo {
  name: string;
  phone_number: string;
}

interface TraDetails {
  first_amount: string;
  second_amount: string;
  total_amount: string;
  payment_method: string;
}

interface Operator {
  name: string;
}

interface Branch {
  name: string;
}

interface Order {
  tra_id: string;
  tra_time: string;
  user_info: UserInfo;
  tra_details: TraDetails;
  operator: Operator;
  branch: Branch;
}

export const Buyurtmalar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>("yangi");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleTabChange = (key: string): void => {
    setActiveTab(key);
    // Trigger filtering or other actions based on the selected tab
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const { Text, Title } = Typography;

  return (
    <div className="">
      <div className="flex bg-white">
        <div className="flex border-x-2 border-x-[#edeff3] w-[205px] h-[80px] p-3 justify-center gap-3">
          <div
            onClick={() => showDrawer()}
            className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center cursor-pointer"
          >
            <FaPlus style={{ color: "white", fontSize: "17px" }} />
          </div>
          <Typography
            style={{
              width: "120px",
              color: "#2D3A45",
              lineHeight: "18px",
              fontWeight: 600,
            }}
          >
            Yangi buyurtma qo'shish
          </Typography>
        </div>
        <div className="w-[460px] flex justify-center content-center items-center gap-5">
          <div className="flex items-center">
            <Tabs
              defaultActiveKey="yangi"
              onChange={handleTabChange}
              className="flex justify-center"
            >
              <TabPane tab="Yangi" key="yangi" />
              <TabPane tab="Qabul qilingan" key="qabul" />
              <TabPane tab="Jo'natilgan" key="jonatilgan" />
              <TabPane tab="Yopilgan" key="yopilgan" />
            </Tabs>
          </div>
        </div>
        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
          <p>Some contents...</p>
        </Drawer>
      </div>

      {data.map((order, index) => (
        <div
          key={index}
          className="flex bg-white mt-6 w-[964px] h-[150px] rounded-md"
        >
          <div className="flex flex-col p-4">
            <div className="borderBottom flex items-center">
              <Title level={5}>{order.tra_id}</Title>
            </div>
            <div className="flex items-center">
              <Text style={{ color: "#2D3A45" }}>{order.tra_time}</Text>
            </div>
          </div>

          <div className="flex flex-col border-l-2 border-x-[#edeff3] p-4">
            <div className="flex items-center">
              <div className="mr-2">
                <Avatar style={{ backgroundColor: "#87d068" }} size="large">
                  {order.user_info.name.charAt(0)}
                </Avatar>
              </div>
              <div>
                <Text style={{ color: "#2D3A45", fontSize: "20px" }}>
                  {order.user_info.name}
                </Text>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Text style={{ color: "#2D3A45", fontSize: "14px" }}>
                {order.user_info.phone_number}
              </Text>
            </div>
          </div>

          <div className="flex flex-col border-l-2 border-x-[#edeff3] p-4">
            <div className="flex flex-col">
              <div className="flex items-center">
                <Text style={{ color: "#2D3A45", fontSize: "14px" }}>
                  {order.tra_details.first_amount}
                </Text>
              </div>
              <div className="flex items-center mt-2">
                <Text style={{ color: "#2D3A45", fontSize: "14px" }}>
                  {order.tra_details.second_amount}
                </Text>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Text style={{ color: "#2D3A45", fontSize: "14px" }}>
                {order.tra_details.payment_method}
              </Text>
            </div>
            <div className="flex flex-col mt-2">
              <Text style={{ color: "#2D3A45" }}>Umumiy summa</Text>
              <Title level={5} style={{ color: "#2D3A45" }}>
                {order.tra_details.total_amount}
              </Title>
            </div>
          </div>

          <div className="flex flex-col border-l-2 border-x-[#edeff3] p-4">
            <div className="flex items-center">
              <Text style={{ color: "#2D3A45" }}>Operator:</Text>
            </div>
            <div className="flex items-center mt-2">
              <Text style={{ color: "#2D3A45" }}>{order.operator.name}</Text>
            </div>
            <div className="flex items-center mt-4">
              <Text style={{ color: "#2D3A45" }}>Filial:</Text>
            </div>
            <div className="flex items-center mt-2">
              <Text style={{ color: "#2D3A45" }}>{order.branch.name}</Text>
            </div>
          </div>

          <div className="flex flex-col relative left-[45%] gap-3 justify-center items-center">
            <div className="w-[50px] h-[50px] bg-[#edeff3] rounded-full flex justify-center content-center items-center">
              <div className="w-[40px] h-[40px] bg-white rounded-full flex justify-center content-center items-center">
                <TbX style={{ fontSize: "16px" }} />
              </div>
            </div>
            <div className="w-[50px] h-[50px] bg-[#edeff3] rounded-full flex justify-center content-center items-center">
              <div className="w-[40px] h-[40px] bg-white rounded-full flex justify-center content-center items-center">
                <IoCheckmark style={{ fontSize: "16px" }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
