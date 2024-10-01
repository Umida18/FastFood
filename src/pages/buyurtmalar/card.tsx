import { Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { TbX } from "react-icons/tb";

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
  filial_id: number;
  status: string;
  order_details: Payment;
  mijoz_id: number;
}
interface Mijoz {
  id: number;
  firstName: string;
  lastName: string;
  ordersC: number;
  status: string;
  phone: string;
}

interface ICardProps {
  orderStatus: (order: any, direction: any) => Promise<any>;
  getFilial: (id: number) => string;
  getOperatorForOrder: (filialId: number) => string;
  getPaymentMethod: (paymentId: number) => string;
  filteredOrders: Order[];
  getClient: (clientId: number) => Mijoz;
  PriceComponent: ({ price }: { price: string }) => JSX.Element;
}
const CardOrdered: React.FC<ICardProps> = ({
  orderStatus,
  getFilial,
  getOperatorForOrder,
  getPaymentMethod,
  filteredOrders,
  getClient,
  PriceComponent,
}) => {
  const [buyurtma, setBuyurtma] = useState<Order[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const responseB = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma"
      );
      setBuyurtma(responseB.data);
    };
    fetchData();
  }, []);

  return (
    <>
      {filteredOrders.map((order: Order) => {
        const client = getClient(order.mijoz_id);
        return (
          <div>
            <div
              key={order.id}
              className="flex flex-col bg-white mb-6 w-[234px] h-[345px] px-4 py-2 rounded-md shadow-lg"
            >
              <div className="flex flex-row justify-between gap-4 py-3 items-center ">
                <div className="flex justify-center items-center content-center">
                  {/* <div className="flex justify-center items-center content-center"> */}
                  <div className=" flex justify-center items-center content-center">
                    <Typography
                      style={{
                        color: "white",
                        fontSize: "14px",
                        backgroundColor: "#20D472",
                        borderRadius: "30px",

                        // paddingInline: "20px",
                        // paddingBlock: "5px",
                        width: "60px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {order.order_id}
                    </Typography>
                  </div>
                  {/* </div> */}
                </div>
                <div className="flex items-center content-center gap-1">
                  <div>
                    <MdOutlineAccessTime
                      style={{
                        fontSize: "14px",
                        color: "#8d8e90",
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      style={{
                        color: "#2D3A45",
                        fontSize: "14px",
                      }}
                    >
                      {order.order_time}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex border-t-2 border-t-[#edeff3] py-2  gap-6  ">
                <div className="flex flex-col min-w-[180px] ">
                  <div className="flex gap-3">
                    <FaRegUser
                      style={{
                        fontSize: "15px",
                        color: "#8d8e90",
                        marginTop: "5px",
                      }}
                    />
                    <Typography
                      style={{
                        color: "#2D3A45",
                        fontSize: "16px",
                      }}
                    >
                      {client.firstName} {client.lastName}
                    </Typography>
                  </div>
                  <div className="ml-4">
                    <Typography
                      style={{
                        color: "#2D3A45",
                        fontSize: "12px",
                      }}
                    >
                      {client.phone}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-2  border-b-2 border-b-[#edeff3]">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <Typography
                      style={{
                        color: "#8d8e90",
                        fontSize: "13px",
                      }}
                    >
                      Umumiy summa
                    </Typography>
                    <Typography
                      style={{
                        color: "#2D3A45",
                        fontSize: "20px",
                        fontWeight: "bolder",
                      }}
                    >
                      <PriceComponent
                        price={order.order_details.total_amount}
                      />
                    </Typography>
                  </div>
                </div>
                <div className="flex">
                  {getPaymentMethod(order.order_details.payment_method)}
                </div>
              </div>
              <div className="flex py-2">
                <div className=" flex flex-col gap-3 ">
                  <div>
                    <Typography
                      style={{
                        color: "#8d8e90",
                        fontSize: "13px",
                      }}
                    >
                      Operator:
                    </Typography>
                    <Typography
                      style={{
                        color: "#2D3A45",
                        fontWeight: "bolder",
                      }}
                    >
                      {getOperatorForOrder(order.filial_id)}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      style={{
                        color: "#8d8e90",
                        fontSize: "13px",
                      }}
                    >
                      Filial:
                    </Typography>
                    <Typography
                      style={{
                        color: "#2D3A45",
                        fontWeight: "bolder",
                      }}
                    >
                      {getFilial(order.filial_id)}
                    </Typography>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex flex-col gap-4 ">
                    <div
                      onClick={() => orderStatus(order, "backward")}
                      className={`w-[50px] h-[50px] bg-[#edeff3] rounded-full flex justify-center content-center items-center cursor-pointer ${
                        order.status === "yangi"
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                      style={{
                        pointerEvents:
                          order.status === "yangi" ? "none" : "auto",
                      }}
                    >
                      <div className="w-[40px] h-[40px] bg-white shadow-xl rounded-full  flex justify-center content-center items-center">
                        <TbX style={{ fontSize: "20px" }} />
                      </div>
                    </div>
                    <div
                      onClick={() => orderStatus(order, "forward")}
                      className={`w-[50px] h-[50px] bg-[#edeff3] rounded-full flex justify-center content-center items-center cursor-pointer ${
                        order.status === "yopilgan"
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                      style={{
                        pointerEvents:
                          order.status === "yopilgan" ? "none" : "auto",
                      }}
                    >
                      <div className="w-[40px] h-[40px] bg-white rounded-full  flex justify-center content-center items-center">
                        <IoCheckmark style={{ fontSize: "20px" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CardOrdered;
