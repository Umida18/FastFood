import React, { useEffect, useState } from "react";
import { Typography, Drawer, Button, Avatar, Tabs } from "antd";
import { FaPlus, FaRegUser } from "react-icons/fa6";
import { IoCheckmark, IoClipboardOutline } from "react-icons/io5";
import { TbX } from "react-icons/tb";
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import { CiBookmark, CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GoColumns } from "react-icons/go";
import { PiRowsThin } from "react-icons/pi";
import { TabsProps } from "rc-tabs";
import { GoPlus } from "react-icons/go";
import "./buyurtma.css";

export interface Payment {
  order_amount: string;
  delivery_amount: string;
  total_amount: string;
  payment_method: number;
}

export interface Order {
  id: number;
  order_id: number;
  order_time: string;
  order_day: string;
  mijoz_id: number;
  filial_id: number;
  order_details: Payment;
}
export interface PaymentM {
  id: number;
  name: string;
}

interface Category {
  id: number;
  MainKateg: number;
  nameUz: string;
  nameRu: string;
}
interface Product {
  id: number;
  name: string;
  type: number;
  price: string;
  desc: string;
  img: string;
}
export const Buyurtmalar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [buyurtma, setBuyurtma] = useState<Order[]>([]);
  const [tolovTuri, setTolovTuri] = useState<PaymentM[]>([]);
  const [kategoriya, setKategoriya] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("yangi");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedView, setSelectedView] = useState<string>("columns");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const reponseB = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma"
      );
      const responseT = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/paymentMethod"
      );
      const responseCat = await axios.get(
        "https://2f972b43e3dad83a.mokky.dev/kotegoriyalar"
      );

      const responseProducts = await axios.get(
        "https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar"
      );
      setProducts(responseProducts.data);
      setBuyurtma(reponseB.data);
      setTolovTuri(responseT.data);
      setKategoriya(responseCat.data);
    };
    fetchData();
  }, []);
  const handleTabChange = () => {};
  const { Text, Title } = Typography;

  const getPaymentMethod = (paymentId: number) => {
    const payment = tolovTuri.find((item) => item.id === paymentId);
    return payment ? payment.name : "Unknown";
  };
  const PriceComponent = ({ price }: { price: string }) => {
    const formatPrice = (price: string) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return <div>{formatPrice(price)} UZS</div>;
  };
  return (
    <div className="">
      <div className="flex bg-white items-center">
        <div className="flex border-x-2 border-x-[#edeff3] w-[205px] h-[80px] p-3 justify-center gap-3 items-center">
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
        <div className="bg-[#edeff3] rounded-[30px] flex justify-center gap-1 items-center w-[97px] h-[48px]">
          <Button
            onClick={() => setSelectedView("columns")}
            style={{
              backgroundColor: selectedView === "columns" ? "white" : "#edeff3",
              border: "none",
              boxShadow: "none",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              padding: "0px",
            }}
          >
            <GoColumns />
          </Button>
          <Button
            onClick={() => setSelectedView("rows")}
            style={{
              backgroundColor: selectedView === "rows" ? "white" : "#edeff3",
              border: "none",
              boxShadow: "none",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              padding: "0px",
            }}
          >
            <PiRowsThin />
          </Button>
        </div>
        <Drawer
          title="Basic Drawer"
          onClose={onClose}
          open={open}
          style={{}}
          width={"1000px"}
        >
          <div className="flex gap-4">
            <div>
              <Typography>Yangi buturtma qo'shish</Typography>
              <div className="">
                <Tabs className="custom-tabs">
                  {kategoriya.map((category) => (
                    <TabPane
                      style={{
                        // padding: "10px",
                        // backgroundColor: "#edeff3",
                        // borderRadius: "30px",
                        width: "490px",
                      }}
                      tab={category.nameUz}
                      key={category.id}
                    >
                      <div className="flex flex-wrap justify-between">
                        {products
                          .filter((prod) => prod.type === category.id)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="w-[235px] h-[200px] rounded-[10px] shadow-lg bg-[white] mb-5"
                            >
                              <img
                                className="w-[235px] h-[100px] object-cover rounded-t-[10px]"
                                src={item.img}
                                alt=""
                              />
                              <div className="p-3 ">
                                <div>
                                  <Typography>{item.name}</Typography>
                                  <Typography>{item.desc}</Typography>
                                </div>
                                <div className="flex justify-between">
                                  <div>
                                    <PriceComponent price={item.price} />
                                  </div>
                                  <Button
                                    style={{
                                      backgroundColor: "#20D472",
                                      color: "white",
                                      border: "none",
                                    }}
                                    icon={<GoPlus />}
                                  >
                                    Qo'shish
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </div>
            <div>
              <Typography>Buyurtma ro'yxati</Typography>
            </div>
          </div>
        </Drawer>
      </div>
      <div className=" flex justify-center items-center content-center flex-col py-3">
        {buyurtma.map((order, index) => (
          <div className="flex bg-white mt-6 w-[1200px] h-[150px] rounded-md">
            <div className="flex flex-col  px-4 py-4 justify-center gap-4 w-[200px] items-center">
              <div className="flex gap-3">
                <div className=" border-b-2 border-[#edeff3]">
                  <div className=" flex justify-center items-center content-center mb-4">
                    <Typography
                      style={{
                        color: "white",
                        fontSize: "20px",
                        backgroundColor: "#20D472",
                        borderRadius: "30px",
                        paddingInline: "20px",
                        paddingBlock: "5px",
                      }}
                    >
                      {order.order_id}
                    </Typography>
                  </div>
                </div>
                {/* <div className="flex justify-center items-center content-center h-[36px] w-[36px] bg-[#edeff3] rounded-full">
                <CiBookmark style={{ fontSize: "20px", color: "#8d8e90" }} />
              </div> */}
              </div>
              <div className="flex gap-3 items-center content-center">
                <div>
                  <MdOutlineAccessTime
                    style={{ fontSize: "20px", color: "#8d8e90" }}
                  />
                </div>
                <div>
                  <Typography style={{ color: "#2D3A45", fontSize: "20px" }}>
                    {order.order_time}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-col border-l-2 border-x-[#edeff3] px-4 py-3 justify-center items-center gap-6 w-[300px]">
              <div className="flex gap-3">
                <div>
                  <FaRegUser
                    style={{
                      fontSize: "20px",
                      color: "#8d8e90",
                      marginTop: "9px",
                    }}
                  />
                </div>
                <div>
                  <Typography style={{ color: "#2D3A45", fontSize: "20px" }}>
                    {/* {order.user_info.first_name} */}
                  </Typography>
                  <Typography style={{ color: "#2D3A45", fontSize: "20px" }}>
                    {/* {order.user_info.last_name} */}
                  </Typography>
                </div>
              </div>

              <div className="flex gap-3">
                <div>
                  <FiPhone style={{ fontSize: "20px", color: "#8d8e90" }} />
                </div>
                <div>
                  <Typography style={{ color: "#2D3A45", fontSize: "14px" }}>
                    {/* {order.user_info.phone_number} */}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex border-l-2 border-x-[#edeff3]  px-4 py-4 justify-center gap-4  w-[330px]">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div>
                      <IoClipboardOutline
                        style={{ fontSize: "20px", color: "#8d8e90" }}
                      />
                    </div>
                    <div>
                      <Typography
                        style={{ color: "#2D3A45", fontSize: "14px" }}
                      >
                        <PriceComponent
                          price={order.order_details.order_amount}
                        />
                      </Typography>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <CiDeliveryTruck
                        style={{ fontSize: "20px", color: "#8d8e90" }}
                      />
                    </div>
                    <div>
                      <Typography
                        style={{ color: "#2D3A45", fontSize: "14px" }}
                      >
                        <PriceComponent
                          price={order.order_details.delivery_amount}
                        />
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <Typography style={{ color: "#8d8e90", fontSize: "13px" }}>
                    Umumiy summa
                  </Typography>
                  <Typography
                    style={{
                      color: "#2D3A45",
                      fontSize: "20px",
                      fontWeight: "bolder",
                    }}
                  >
                    <PriceComponent price={order.order_details.total_amount} />
                  </Typography>
                </div>
              </div>
              <div className="flex">
                {/* <span className="bg-[#14E5E4] h-[10px] w-[10px] rounded-full"></span> */}
                {getPaymentMethod(order.order_details.payment_method)}
              </div>
            </div>
            <div className="border-l-2 border-x-[#edeff3] flex flex-col  px-10 py-4 gap-6">
              <div>
                <Typography style={{ color: "#8d8e90", fontSize: "13px" }}>
                  Operator:
                </Typography>
                <Typography style={{ color: "#2D3A45", fontWeight: "bolder" }}>
                  Komilova M
                </Typography>
              </div>
              <div>
                <Typography style={{ color: "#8d8e90", fontSize: "13px" }}>
                  Filial:
                </Typography>
                <Typography style={{ color: "#2D3A45", fontWeight: "bolder" }}>
                  Max Way Maksim Gorki
                </Typography>
              </div>
            </div>
            <div className="flex flex-col relative left-[107px] gap-3 justify-center ">
              <div className="w-[50px] h-[50px] bg-[#edeff3] rounded-full flex justify-center content-center items-center cursor-pointer">
                <div className="w-[40px] h-[40px] bg-white rounded-full  flex justify-center content-center items-center">
                  <TbX style={{ fontSize: "20px" }} />
                </div>
              </div>
              <div className="w-[50px] h-[50px] bg-[#edeff3] rounded-full flex justify-center content-center items-center cursor-pointer">
                <div className="w-[40px] h-[40px] bg-white rounded-full  flex justify-center content-center items-center">
                  <IoCheckmark style={{ fontSize: "20px" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
