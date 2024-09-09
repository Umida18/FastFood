/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
import { Typography, message } from "antd";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { Branch } from "../filiallar/filiallar";
import { Order } from "../buyurtmalar/buyurmalar";
import { Hodimlar } from "../hodimlar";
import styled from "@emotion/styled";

export const TableXisobot = () => {
  const [filial, setFilial] = useState<Branch[]>([]);
  const [buyurtmalar, setBuyurtmalar] = useState<Order[]>([]);
  const [selectedView, setSelectedView] = useState<string>("chart");
  const [hodimlar, setHodimlar] = useState<Hodimlar[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBuyurtmalar = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma"
        );

        const responseHodimlar = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/Hodimlar"
        );
        const responseFilial = await axios.get(
          " https://3c2999041095f9d9.mokky.dev/filial"
        );
        setHodimlar(responseHodimlar.data);
        setBuyurtmalar(responseBuyurtmalar.data);
        setFilial(responseFilial.data);

        console.log(buyurtmalar, hodimlar);
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

  return (
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
    </div>
  );
};

export default TableXisobot;
const StyledChart = styled("div")<{
  terminall: number;
  paymee: number;
  naxtt: number;
  totall: number;
}>`
  .chart-terminal {
    background-color: #eab308;
    width: ${(props) =>
      props.totall !== 0 ? (props.terminall / props.totall) * 100 : 0}%;
    height: 100%;
  }
  .chart-payme {
    background-color: #22c55e;
    width: ${(props) =>
      props.totall !== 0 ? (props.paymee / props.totall) * 100 : 0}%;
    height: 100%;
  }
  .chart-naxt {
    background-color: #3ef8f8;
    width: ${(props) =>
      props.totall !== 0 ? (props.naxtt / props.totall) * 100 : 0}%;
    height: 100%;
  }
`;
