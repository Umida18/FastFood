import React, { useState, useEffect } from "react";
import { Button, Space, Typography } from "antd";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./kategoriyalar.css";

interface Category {
  id: number;
  MainKateg: number;
  name: string;
}

interface MainCategory {
  id: number;
  name: string;
}
export const Kategoriyalar = () => {
  const [dataCat, setDataCat] = useState<Category[]>([]);
  const [dataMainCat, setDataMainCat] = useState<MainCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCat = await axios.get(
          "https://2f972b43e3dad83a.mokky.dev/kotegoriyalar"
        );
        const responseMainCat = await axios.get(
          "https://343ba5dbdbceaf9c.mokky.dev/boshKategoriya"
        );
        setDataCat(responseCat.data);
        setDataMainCat(responseMainCat.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const MainCatName = (id: number) => {
    const category = dataMainCat.find((cat) => cat.id === id);
    return category ? category.name : "-";
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
            Kategoriya (Uz)
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
            Kategoriya (Ru)
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
            Bosh kategoriya
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
          {dataCat.map((item, index) => (
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg">
              <div className="flex w-[375px]">
                <Typography
                  style={{
                    marginLeft: "0px",
                    fontSize: "15px",
                    color: "#2D3A45",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.name} uz
                </Typography>
              </div>
              <div className="w-[400px] text-[#2D3A45] text-[15px] flex items-center">
                {item.name} ru
              </div>
              <div className="w-[400px] text-[#2D3A45] text-[15px] flex items-center">
                {MainCatName(item.MainKateg)}
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
    </div>
  );
};
