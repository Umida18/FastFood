/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Typography,
  message,
  Select,
  Space,
  Dropdown,
} from "antd";
import { Line } from "@ant-design/charts";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
// import { Branch } from "../filiallar/filiallar";
// import { Order, PaymentM } from "../buyurtmalar/buyurmalar";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { Hodimlar } from "../hodimlar";
import type { FormProps, MenuProps } from "antd";
import styled from "@emotion/styled";
import { Branch, Hodimlarr, Narx, Order, PaymentM } from "../../type/type";
const { Option } = Select;

// interface Narx {
//   id: number;
//   filialId: number;
//   narxi: number;
//   minimalNarx: string;
// }

const Xisobot = () => {
  const [products, setProducts] = useState<Narx[]>([]);
  const [filial, setFilial] = useState<Branch[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [buyurtmalar, setBuyurtmalar] = useState<Order[]>([]);
  const [tolovTuri, setTolovTuri] = useState<PaymentM[]>([]);
  const [selectedView, setSelectedView] = useState<string>("chart");
  const [hodimlar, setHodimlar] = useState<Hodimlarr[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const [showFilter, setShowFilter] = useState(true);
  const [showFilterr, setShowFilterr] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisiblee, setDropdownVisiblee] = useState(false);
  const [selectedFilial, setSelectedFilial] = useState<number | null>(null);
  const [yopilganselectedFilial, setYopilganselectedFilial] = useState<
    number | null
  >(null);
  const [form] = Form.useForm();
  const [componentVariant, setComponentVariant] =
    useState<FormProps["variant"]>("borderless");

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

        const responseHodimlar = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/Hodimlar"
        );

        setHodimlar(responseHodimlar.data);
        setProducts(responseNarx.data);
        setFilial(responseFilial.data);
        setBuyurtmalar(responseBuyurtmalar.data);
        setTolovTuri(responsePaymentMethod.data);

        console.log(products, filial, buyurtmalar, tolovTuri);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const filteredFilial = filial.filter((prod) => {
    return (
      prod.nameUz &&
      prod.nameUz.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
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
  const btnFilter = () => {
    setShowFilter(!showFilter);
    setDropdownVisible(!dropdownVisible);
  };
  const yopilganbtnFilter = () => {
    setShowFilterr(!showFilterr);
    setDropdownVisiblee(!dropdownVisiblee);
  };

  const onFinish = (values: { date: any }) => {
    let { date } = values;

    const tanlanganDate = date ? date.toDate() : null;
    const yil = tanlanganDate ? tanlanganDate.getFullYear() : null;
    const oy = tanlanganDate ? tanlanganDate.getMonth() + 1 : null;
    const kun = tanlanganDate ? tanlanganDate.getDate() : null;
    date = `${kun < 10 ? "0" + kun : kun}/${oy < 10 ? "0" + oy : oy}/${yil}`;
    date =
      date == "0null/0null/null"
        ? ""
        : `${kun < 10 ? "0" + kun : kun}/${oy < 10 ? "0" + oy : oy}/${yil}`;
    setFilterDate(date);
    console.log("value", values);
    console.log("date", date);
    console.log("tanlangan date", tanlanganDate);
    // message.success("new card is add");
  };
  const yopilganonFinish = (values: { date: any }) => {
    // let { date } = values;
    // const tanlanganDate = date ? date.toDate() : null;
    // const yil = tanlanganDate ? tanlanganDate.getFullYear() : null;
    // const oy = tanlanganDate ? tanlanganDate.getMonth() + 1 : null;
    // const kun = tanlanganDate ? tanlanganDate.getDate() : null;
    // date = `${kun < 10 ? "0" + kun : kun}/${oy < 10 ? "0" + oy : oy}/${yil}`;
    // date =
    //   date == "0null/0null/null"
    //     ? ""
    //     : `${kun < 10 ? "0" + kun : kun}/${oy < 10 ? "0" + oy : oy}/${yil}`;
    // setFilterDate(date);
    // console.log("value", values);
    // console.log("date", date);
    // console.log("tanlangan date", tanlanganDate);
    // message.success("new card is add");
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

  function refreshPage(): void {
    window.location.reload();
  }

  const menuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const menuClickk = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="w-[353px] p-4" onClick={menuClick}>
          <Typography style={{ color: "#818282" }}>Filiallar</Typography>
          <Select
            value={selectedFilial}
            style={{ width: 150 }}
            onChange={(value) => setSelectedFilial(value)}
          >
            <Option value={null}>Hamma filiallar</Option>
            {filial.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.nameUz}
              </Option>
            ))}
          </Select>
        </div>
      ),
    },
  ];

  const items2: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <div className="w-[353px] p-4" onClick={menuClickk}>
          <Typography style={{ color: "#818282" }}>Filiallar</Typography>
          <Select
            value={yopilganselectedFilial}
            style={{ width: 150 }}
            onChange={(value) => setYopilganselectedFilial(value)}
          >
            <Option value={null}>Barcha filiallar</Option>
            {filial.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.nameUz}
              </Option>
            ))}
          </Select>
        </div>
      ),
    },
  ];

  const filteredBuyurtmalar = buyurtmalar
    .filter((prod) => {
      if (filterDate !== "") {
        return prod.order_day === filterDate;
      }
      return true;
    })
    .filter((prod) => {
      if (selectedFilial !== null) {
        return prod.filial_id === selectedFilial;
      }
      return true;
    });

  console.log("filter buyurtma", filteredBuyurtmalar);

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
    const terminal = filteredBuyurtmalar.filter(
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
    const payme = filteredBuyurtmalar.filter(
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
    const naxt = filteredBuyurtmalar.filter(
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

  const selectfilialnomi = (filialid: number | null) => {
    const namefilial = filial.find((branch) => branch.id == filialid);
    return namefilial ? namefilial.nameUz : "Barcha filiallar";
  };
  const yopilganselectedFilialnomi = (filialid: number | null) => {
    const namefilial = filial.find((branch) => branch.id == filialid);
    return namefilial ? namefilial.nameUz : "Barcha filiallar";
  };

  const { RangePicker } = DatePicker;

  // console.log("form", form.getFieldValue(DatePicker));

  const a = buyurtmalar
    .filter(
      (order, index, self) =>
        index === self.findIndex((o) => o.order_day === order.order_day)
    )
    .map((item) => item.order_day);

  const formatDate = (dateString: string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [day, month, year] = dateString.split("/");
    return `${day} ${months[parseInt(month, 10) - 1]}`;
  };
  const labelformattedDates = a.map(formatDate);
  console.log("AAAAAA", a, labelformattedDates);

  const result = buyurtmalar
    .filter((item) => item.status == "yopilgan")
    .filter((prod) => {
      if (yopilganselectedFilial !== null) {
        return prod.filial_id === yopilganselectedFilial;
      }
      return true;
    })
    .reduce((acc, order) => {
      if (!acc[order.order_day]) {
        acc[order.order_day] = 0;
      }
      acc[order.order_day] += 1;
      return acc;
    }, {} as Record<string, number>);

  const formatDatee = (dateString: string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [day, month, year] = dateString.split("/");
    return `${day} ${months[parseInt(month, 10) - 1]}`;
  };

  const resultArray = Object.entries(result).map(([order_day, count]) => {
    const formattedDatee = formatDate(order_day);
    return {
      order_day: formattedDatee,
      count,
    };
  });

  console.log("LABEL TOTALSUM", result, resultArray);

  const data = resultArray.map((item) => ({
    x: item.order_day,
    y: item.count,
  }));

  const config = {
    data,
    height: 250,
    xField: "x",
    yField: "y",
    point: {
      size: 1,
      shape: "circle",
    },
    color: "blue",
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: "#ddd",
            lineWidth: 5,
          },
        },
      },
    },
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredFilial.map((item) => (
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
              Yopilgan buyurtmalar |{" "}
              {yopilganselectedFilialnomi(yopilganselectedFilial)}
            </Typography>
            <div className="flex flex-row p-[10px]">
              {/* <Form
                onFinish={yopilganonFinish}
                variant={componentVariant}
                initialValues={{ variant: componentVariant }}
                style={{ maxWidth: 600, width: 200 }}
                className="flex flex-row"
              >
                <Form.Item name="date" className="w-52 border-white">
                  <RangePicker />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" className="border-none">
                    <IoSearch />
                  </Button>
                </Form.Item>
              </Form> */}

              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    menu={{ items: items2 }}
                    placement="bottomRight"
                    arrow
                    trigger={["click"]}
                  >
                    <div
                      onClick={yopilganbtnFilter}
                      className="w-[38px] h-[38px] bg-[#edeff3] rounded-full flex justify-center content-center items-center"
                    >
                      <div className="w-[28px] h-[28px] bg-white rounded-full  flex justify-center content-center items-center text-[15px]">
                        <CiFilter
                          style={{ fontSize: "21px", color: "#8D9BA8" }}
                        />
                      </div>
                    </div>
                  </Dropdown>
                </Space>
              </Space>
            </div>
          </div>
          <div className="h-[220px] ">
            <Line {...config} />
          </div>
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
              To'lov turlari | {selectfilialnomi(selectedFilial)}
            </Typography>
            <div className="flex flex-row p-[10px]">
              <Form
                onFinish={onFinish}
                variant={componentVariant}
                initialValues={{ variant: componentVariant }}
                style={{ maxWidth: 600, width: 200 }}
                className="flex flex-row"
              >
                <Form.Item name="date" className="w-52 border-white">
                  <DatePicker />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" className="border-none">
                    <IoSearch />
                  </Button>
                </Form.Item>
              </Form>

              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    arrow
                    trigger={["click"]}
                  >
                    <div
                      onClick={btnFilter}
                      className="w-[38px] h-[38px] bg-[#edeff3] rounded-full flex justify-center content-center items-center"
                    >
                      <div className="w-[28px] h-[28px] bg-white rounded-full  flex justify-center content-center items-center text-[15px]">
                        <CiFilter
                          style={{ fontSize: "21px", color: "#8D9BA8" }}
                        />
                      </div>
                    </div>
                  </Dropdown>
                </Space>
              </Space>
            </div>
          </div>
          <StyledChart
            terminall={Terminal()}
            paymee={Payme()}
            naxtt={Naxt()}
            totall={total}
            className=" flex flex-row gap-12 p-5"
          >
            <div className=" flex flex-col gap-8 p-5 pt-2">
              {" "}
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
              <div
                className="bg-slate-100 p-2 mt-0 w-[120px]"
                style={{
                  color: "#2D3A45",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
              >
                {total}
              </div>
            </div>
            <div className=" flex flex-col gap-8 p-5 pt-2">
              {" "}
              <div className="flex flex-row  gap-5 align-items-center">
                <div className=" w-[200px] bg-gray-50 h-3 rounded mt-1">
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
                  {total !== 0
                    ? Math.floor((Terminal() / total) * 100 * 100) / 100
                    : 0}{" "}
                  %
                </Typography>
              </div>
              <div className="flex flex-row gap-5 ">
                {" "}
                <div className=" w-[200px] bg-gray-50 h-3 rounded   mt-1">
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
                  {total !== 0
                    ? Math.floor((Payme() / total) * 100 * 100) / 100
                    : 0}{" "}
                  %
                </Typography>
              </div>
              <div className="flex flex-row gap-5 ">
                {" "}
                <div className="w-[200px] h-3 rounded   mt-1 bg-gray-50">
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
                  {total !== 0
                    ? Math.floor((Naxt() / total) * 100 * 100) / 100
                    : 0}{" "}
                  %
                </Typography>
              </div>
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
