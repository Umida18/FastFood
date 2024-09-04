/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
import { Button, Form, Input, DatePicker, Typography, message } from "antd";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { Branch } from "../filiallar/filiallar";
import { Order, PaymentM } from "../buyurtmalar/buyurmalar";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { Hodimlar } from "../hodimlar";
import { LineChart } from "@mui/x-charts/LineChart";
import type { FormProps } from "antd";
import styled from "@emotion/styled";

interface Narx {
  id: number;
  filialId: number;
  narxi: number;
  minimalNarx: string;
}

interface MijozType {
  id: number;
  firstName: string;
  lastName: string;
  ordersC: number;
  status: "Active" | "Block";
  phone: string;
}

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const Xisobot = () => {
  const [products, setProducts] = useState<Narx[]>([]);
  const [filial, setFilial] = useState<Branch[]>([]);
  const [buyurtmalar, setBuyurtmalar] = useState<Order[]>([]);
  const [tolovTuri, setTolovTuri] = useState<PaymentM[]>([]);
  const [mijoz, setMijoz] = useState<MijozType[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [selectedView, setSelectedView] = useState<string>("chart");
  const [hodimlar, setHodimlar] = useState<Hodimlar[]>([]);
  // const [componentVariant, setComponentVariant] =
  //   useState<FormProps["variant"]>("filled");

  // const onFormVariantChange = ({
  //   variant,
  // }: {
  //   variant: FormProps["variant"];
  // }) => {
  //   setComponentVariant(variant);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseNarx = await axios.get(
          "https://3c2999041095f9d9.mokky.dev/delivery"
        );
        const responseFilial = await axios.get(
          " https://3c2999041095f9d9.mokky.dev/filial"
        );
        const responseBuyurtmalar = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma"
        );
        const responsePaymentMethod = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/paymentMethod"
        );
        const responseMijoz = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/mijoz"
        );
        const responseHodimlar = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/Hodimlar"
        );

        setHodimlar(responseHodimlar.data);
        setProducts(responseNarx.data);
        setFilial(responseFilial.data);
        setBuyurtmalar(responseBuyurtmalar.data);
        setTolovTuri(responsePaymentMethod.data);
        setMijoz(responseMijoz.data);

        console.log(products, filial, buyurtmalar, tolovTuri, responseMijoz);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const deleteProd = async (id: number) => {
    try {
      await axios.delete(`https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma/${id}`);

      const updatedBuyurtmalar = buyurtmalar.filter((p) => p.id !== id);
      setBuyurtmalar(updatedBuyurtmalar);

      message.success("Muvafaqiyatli o'chirildi");
    } catch (error) {
      message.error("O'chirishda xatolik!");
      console.error("Xisobot O'chirishda error: ", error);
    }
  };

  const operatorName = (operatorid: number) => {
    const branch = hodimlar.find((branch) => branch.id == operatorid);
    return branch ? branch.fistN + " " + branch.lastN : "Aniqlanmadi";
  };

  const day = (filialid: number) => {
    const branch = buyurtmalar.find((branch) => branch.filial_id == filialid);
    return branch ? branch.order_day : "Aniqlanmadi";
  };

  const time = (filialid: number) => {
    const branch = buyurtmalar.find((branch) => branch.filial_id == filialid);
    return branch ? branch.order_time : "Aniqlanmadi";
  };
  const totalSumTerminal = (filialid: number) => {
    const terminal = buyurtmalar.filter(
      (branch) =>
        branch.filial_id == filialid && branch.order_details.payment_method == 1
    );

    const terminaltotal = terminal.map((item) => {
      let s: number = 0;
      s += Number(item.order_details.total_amount);
      return s;
    });
    let n = 0;
    for (let i = 0; i < terminaltotal.length; i++) {
      n = n + terminaltotal[i];
    }
    console.log("terminal", terminal, terminaltotal);

    return terminal ? n : 0;
  };
  const totalSumPayme = (filialid: number) => {
    const payme = buyurtmalar.filter(
      (branch) =>
        branch.filial_id == filialid && branch.order_details.payment_method == 2
    );
    const paymetotal = payme.map((item) => {
      let s: number = 0;
      s += Number(item.order_details.total_amount);
      return s;
    });
    let n = 0;
    for (let i = 0; i < paymetotal.length; i++) {
      n = n + paymetotal[i];
    }
    console.log("payme", payme, paymetotal);

    return payme ? n : 0;
  };
  const totalSumNaxt = (filialid: number) => {
    const naxt = buyurtmalar.filter(
      (branch) =>
        branch.filial_id == filialid && branch.order_details.payment_method == 3
    );
    const naxttotal = naxt.map((item) => {
      let s: number = 0;
      s += Number(item.order_details.total_amount);
      return s;
    });
    let n = 0;
    for (let i = 0; i < naxttotal.length; i++) {
      n = n + naxttotal[i];
    }
    console.log("naxt", naxt, naxttotal);

    return naxt ? n : 0;
  };
  const Terminal = () => {
    const terminal = buyurtmalar.filter(
      (branch) => branch.order_details.payment_method == 1
    );
    const terminaltotal = terminal.map((item) => {
      let s: number = 0;
      s += Number(item.order_details.total_amount);
      return s;
    });
    let n = 0;
    for (let i = 0; i < terminaltotal.length; i++) {
      n = n + terminaltotal[i];
    }
    console.log("terminal", terminal, terminaltotal);

    return terminal ? n : 0;
  };
  const Payme = () => {
    const payme = buyurtmalar.filter(
      (branch) => branch.order_details.payment_method == 2
    );
    const paymetotal = payme.map((item) => {
      let s: number = 0;
      s += Number(item.order_details.total_amount);
      return s;
    });
    let n = 0;
    for (let i = 0; i < paymetotal.length; i++) {
      n = n + paymetotal[i];
    }
    console.log("payme", payme, paymetotal);

    return payme ? n : 0;
  };
  const Naxt = () => {
    const naxt = buyurtmalar.filter(
      (branch) => branch.order_details.payment_method == 3
    );
    const naxttotal = naxt.map((item) => {
      let s: number = 0;
      s += Number(item.order_details.total_amount);
      return s;
    });
    let n = 0;
    for (let i = 0; i < naxttotal.length; i++) {
      n = n + naxttotal[i];
    }
    console.log("naxt", naxt, naxttotal);

    return naxt ? n : 0;
  };
  const total = Naxt() + Terminal() + Payme();

  function refreshPage(): void {
    window.location.reload();
  }
  return (
    <div className="bg-[#edeff3]">
      <div
        className=" bg-white"
        style={{
          display: "flex",
          justifyContent: "start",
          gap: 3,
          margin: "0",
          padding: "0",
        }}
      >
        <div
          className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[60px] p-3 items-center justify-center gap-3 "
          onClick={() => refreshPage()}
        >
          <div className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center ">
            <GrUpdate style={{ color: "white", fontSize: "17px" }} />
          </div>
          <Typography
            style={{
              width: "100px",
              color: "#2D3A45",
              lineHeight: "18px",
              fontWeight: "600",
            }}
          >
            Ma'lomotlarni yangilash
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            gap: 3,
          }}
        >
          {" "}
          <div className="w-[300px] h-[48px]  py-3 px-6 items-center">
            <Input
              // prefix={<SearchOutlined />}
              placeholder="Qidirish"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-[35px] bg-[#edeff3]"
            />
          </div>
          <div className="bg-[#edeff3] rounded-[30px] flex justify-center gap-1 items-center w-[97px] h-[48px]">
            <Button
              onClick={() => setSelectedView("chart")}
              style={{
                backgroundColor: selectedView === "chart" ? "white" : "#edeff3",
                border: "none",
                boxShadow: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                padding: "0px",
              }}
            >
              <FaChartLine />
            </Button>
            <Button
              onClick={() => setSelectedView("buyurtma")}
              style={{
                backgroundColor:
                  selectedView === "buyurtma" ? "white" : "#edeff3",
                border: "none",
                boxShadow: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                padding: "0px",
              }}
            >
              <MdOutlineSystemUpdateAlt />
            </Button>
          </div>
        </div>
      </div>

      {/* table-xisobot */}
      <div
        className="table-xisobot bg-[#edeff3] min-h-[95vh] mt-3"
        style={{ display: selectedView === "chart" ? "none" : "block" }}
      >
        <div className="flex justify-row gap-40 bg-white my-[20px] h-[45px]  px-10">
          <div className="flex justify-center align-middle  uppercase ">
            <Typography
              style={{
                color: "#2D3A45",
                fontSize: "14px",
                fontWeight: "bolder",
                paddingLeft: "15px",
                paddingRight: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Filial
            </Typography>
          </div>
          <div className=" border-l-2 border-[#edeff3] flex justify-center align-middle uppercase">
            <Typography
              style={{
                color: "#2D3A45",
                fontSize: "14px",
                fontWeight: "bolder",
                paddingLeft: "15px",
                paddingRight: "260px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Buyurtma summasi
            </Typography>
          </div>

          <div className=" border-l-2 border-[#edeff3] flex justify-center align-middle uppercase">
            <Typography
              style={{
                color: "#2D3A45",
                fontSize: "14px",
                fontWeight: "bolder",
                paddingLeft: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Sana
            </Typography>
          </div>
          <div className=" border-l-2 border-[#edeff3] flex justify-center align-middle uppercase">
            <Typography
              style={{
                color: "#2D3A45",
                fontSize: "14px",
                fontWeight: "bolder",
                paddingLeft: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "55px",
              }}
            >
              ACTION
            </Typography>
          </div>
        </div>

        <div>
          <div className="px-6 flex flex-col gap-3">
            {filial.map((item) => (
              <div
                key={item.id}
                className="flex bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg"
              >
                <div className=" w-[300px] ">
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.nameUz}
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "10px",
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Operator: {operatorName(item.operatorId)}
                  </Typography>
                </div>
                {/* TOTAL SUM */}
                <div className="w-[200px] text-[#2D3A45] text-[15px] flex items-start flex-col">
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {totalSumTerminal(item.id)}
                    UZS
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "10px",
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span className="bg-green-500 w-1 h-1 rounded-full me-2">
                      {" "}
                    </span>{" "}
                    TERMINAL
                    {/* tolov turi */}
                  </Typography>
                </div>{" "}
                <div className="w-[200px] text-[#2D3A45] text-[15px] flex items-start flex-col">
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {totalSumPayme(item.id)}
                    UZS
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "10px",
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span className="bg-green-500 w-1 h-1 rounded-full me-2">
                      {" "}
                    </span>{" "}
                    PAYME
                    {/* tolov turi */}
                  </Typography>
                </div>{" "}
                <div className="w-[250px] text-[#2D3A45] text-[15px] flex items-start flex-col">
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {totalSumNaxt(item.id)}
                    UZS
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "10px",
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span className="bg-green-500 w-1 h-1 rounded-full me-2">
                      {" "}
                    </span>{" "}
                    NAXT
                    {/* tolov turi */}
                  </Typography>
                </div>{" "}
                {/* TOTAL SUM FINISH */}
                <div className="w-[280px] text-[#2D3A45] text-[15px] flex items-start flex-col">
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {day(item.id)}
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "10px",
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {time(item.id)}
                  </Typography>
                </div>{" "}
                <div className="flex gap-4 w-[140px]">
                  <div
                    onClick={() => deleteProd(item.id)}
                    className="w-[40px] h-[40px] bg-[#edeff3] rounded-full flex justify-center content-center items-center"
                  >
                    <div className="w-[32px] h-[32px] bg-white rounded-full  flex justify-center content-center items-center text-[15px]">
                      <RiDeleteBinLine style={{ fontSize: "16px" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex justify-center content-center items-center my-3">
          <Button
            style={{
              border: "2px solid #8D9BA8",
              background: "transparent",
              width: "1275px",
              height: "40px",
            }}
          >
            Yana yuklash
          </Button>
        </div> */}
      </div>

      {/* chart-xisobot */}
      <div
        style={{ display: selectedView === "chart" ? "grid" : "none" }}
        className="grid grid-cols-2 gap-4 px-10 pt-5"
      >
        <div className="  bg-white rounded h-[300px]">
          <div className="shadow-md h-[50px] p-4 w-full">header</div>
          <div className="">
            {" "}
            <LineChart
              xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
              series={[
                {
                  data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                  showMark: ({ index }) => index % 2 === 0,
                },
              ]}
              className="w-full"
              height={270}
            />
          </div>
        </div>
        <div className=" bg-white rounded h-[300px]">
          <div className="shadow-md h-[50px] p-4 w-full">header</div>
          <div className="">chart2</div>
        </div>
        <div className=" bg-white rounded h-[300px]">
          <div className="shadow-md h-[50px] w-full flex flex-row justify-between align-middle align-items-center">
            <Typography
              style={{
                color: "#2D3A45",
                fontSize: "14px",
                fontWeight: "500",
                padding: "15px",
                paddingLeft: "31px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              {" "}
              To'lov turlari | Xamma filallar
            </Typography>
            <div className="flex flex-row p-[10px]">
              <Form
                {...formItemLayout}
                // onValuesChange={onFormVariantChange}
                // variant={componentVariant}
                style={{ maxWidth: 600, width: 150 }}
                // initialValues={{ variant: componentVariant }}
              >
                <Form.Item name="DatePicker" className="w-52">
                  <DatePicker />
                </Form.Item>
              </Form>
              <button className="w-8 h-8 border-solid border-[4px] border-gray-100 rounded-full ps-[5px] ">
                <CiFilter />
              </button>
            </div>
          </div>
          <StyledChart
            terminall={Terminal()}
            paymee={Payme()}
            naxtt={Naxt()}
            totall={total}
            className=" flex flex-col gap-8 p-5"
          >
            <div className="flex flex-row  gap-5 align-items-center">
              <Typography
                style={{
                  padding: 0,
                  margin: 0,
                  color: "#2D3A45",
                  fontSize: "14px",
                  fontWeight: "500",
                  paddingLeft: "15px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <span className="bg-yellow-500 p-0 m-0 w-[6px] h-[6px] rounded-full me-2"></span>
                Terminal - {Terminal()}
              </Typography>
              <div className=" w-[200px] bg-gray-50 h-3 rounded ms-8 mt-1">
                <div className=" chart-terminal bg-yellow-500 xisobott rounded"></div>
              </div>
              <Typography
                style={{
                  padding: 0,
                  margin: 0,
                  color: "#2D3A45",
                  fontSize: "14px",
                  fontWeight: "500",
                  paddingLeft: "15px",
                }}
              >
                {" "}
                {Math.floor((Terminal() / total) * 100 * 100) / 100} %
              </Typography>
            </div>
            <div className="flex flex-row gap-5 ">
              {" "}
              <Typography
                style={{
                  color: "#2D3A45",
                  fontSize: "14px",
                  fontWeight: "500",
                  paddingLeft: "15px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <span className="bg-green-500 w-[6px] h-[6px] rounded-full me-2"></span>
                Payme - {Payme()}
              </Typography>
              <div className=" w-[200px] bg-gray-50 h-3 rounded ms-[45px]  mt-1">
                <div className=" chart-payme bg-green-500 xisobott rounded"></div>
              </div>
              <Typography
                style={{
                  color: "#2D3A45",
                  fontSize: "14px",
                  fontWeight: "500",
                  paddingLeft: "15px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                {" "}
                {Math.floor((Payme() / total) * 100 * 100) / 100} %
              </Typography>
            </div>
            <div className="flex flex-row gap-5 ">
              {" "}
              <Typography
                style={{
                  color: "#2D3A45",
                  fontSize: "14px",
                  fontWeight: "500",
                  paddingLeft: "15px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <span className="bg-[rgb(62,248,248)] w-[6px] h-[6px] rounded-full me-2"></span>
                Naxt - {Naxt()}
              </Typography>
              <div className="w-[200px] h-3 rounded ms-14  mt-1 bg-gray-50">
                <div className="chart-naxt  bg-[rgb(62,248,248)] xisobott rounded"></div>
              </div>
              <Typography
                style={{
                  color: "#2D3A45",
                  fontSize: "14px",
                  fontWeight: "500",
                  paddingLeft: "15px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                {" "}
                {Math.floor((Naxt() / total) * 100 * 100) / 100} %
              </Typography>
            </div>
            <div
              className="bg-slate-100 p-2 mt-0 w-[120px]"
              style={{
                color: "#2D3A45",
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "20px",
                textAlign: "center",
              }}
            >
              {total}
            </div>
          </StyledChart>
        </div>
      </div>
    </div>
  );
};

export default Xisobot;

const StyledChart = styled("div")<{
  terminall: number;
  paymee: number;
  naxtt: number;
  totall: number;
}>`
  .chart-terminal {
    background-color: #eab308;
    width: ${(props) => (props.terminall / props.totall) * 100}%;
    height: 100%;
  }
  .chart-payme {
    background-color: #22c55e;
    width: ${(props) => (props.paymee / props.totall) * 100}%;
    height: 100%;
  }
  .chart-naxt {
    background-color: #3ef8f8;
    width: ${(props) => (props.naxtt / props.totall) * 100}%;
    height: 100%;
  }
`;
