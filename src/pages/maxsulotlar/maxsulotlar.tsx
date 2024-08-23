import React, { useState, useEffect } from "react";
import { Button, Space, Typography } from "antd";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./maxsulotlar.css";

interface Product {
  id: number;
  name: string;
  type: number;
  price: string;
  desc: string;
  img: string;
}
interface Category {
  id: number;
  MainKateg: number;
  name: string;
}
export const Maxsulotlar = () => {
  const [dataProd, setDataProd] = useState<Product[]>([]);
  const [dataCat, setDataCat] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProd = await axios.get(
          "https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar"
        );
        const responseCat = await axios.get(
          "https://2f972b43e3dad83a.mokky.dev/kotegoriyalar"
        );
        setDataProd(responseProd.data);
        setDataCat(responseCat.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const CategName = (id: number) => {
    const categ = dataCat.find((c) => c.id === id);
    return categ ? categ.name : "-";
  };

  return (
    <div className=" bg-[#edeff3] min-h-[95vh]">
      <div className="flex justify-between bg-white my-[20px] h-[45px] py-3 px-10">
        <div className="flex justify-center align-middle uppercase ">
          <Typography
            style={{
              color: "#2D3A45",
              fontSize: "14px",
              fontWeight: "bolder",
              // paddingLeft: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Maxsulot
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
            Kategoriya
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
            Narxi
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
            Qo’shimcha
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

      <div
      // className="h-[70vh]"
      >
        <div className="px-6 flex flex-col gap-3">
          {dataProd.map((item, index) => (
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg">
              <div className="flex w-[290px]">
                <img
                  className="h-[40px] w-[40px] rounded-full"
                  src={item.img}
                  alt=""
                />
                <Typography
                  style={{
                    marginLeft: "20px",
                    fontSize: "15px",
                    color: "#2D3A45",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.name}
                </Typography>
              </div>
              <div className="w-[290px] text-[#2D3A45] text-[15px] flex items-center">
                {CategName(item.type)}
              </div>
              <div className="w-[250px] text-[#2D3A45] text-[15px] flex items-center">
                {item.price}
              </div>
              <div className="w-[300px] text-[#2D3A45] text-[15px] flex items-center">
                {item.desc}
              </div>
              <div className="flex gap-4">
                <div className="w-[40px] h-[40px] bg-[#edeff3] rounded-full flex justify-center content-center items-center">
                  <div className="w-[32px] h-[32px] bg-white rounded-full  flex justify-center content-center items-center">
                    <FiEdit2 style={{ fontSize: "16px" }} />
                  </div>
                </div>
                <div className="w-[40px] h-[40px] bg-[#edeff3] rounded-full flex justify-center content-center items-center">
                  <div className="w-[32px] h-[32px] bg-white rounded-full  flex justify-center content-center items-center text-[15px]">
                    <RiDeleteBinLine style={{ fontSize: "16px" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center content-center items-center my-3">
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
      </div>
    </div>
  );
};
