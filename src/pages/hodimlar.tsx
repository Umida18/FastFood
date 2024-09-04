import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, Select, Typography, message } from "antd";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export interface Hodimlar {
  id: number;
  fistN: string;
  lastN: string;
  thName: string;
  phone: string;
  lavozim: string;
  filialId: number;
}

interface MainCategory {
  id: number;
  name: string;
}

export const Hodimlar = () => {
  const [hodimlar, setHodimlar] = useState<Hodimlar[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState<number | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCat = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/Hodimlar"
        );
        const response = await axios.get(
          "https://3c2999041095f9d9.mokky.dev/filial"
        );
        setHodimlar(responseCat.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const onClose = () => {
    setDrawerOpen(false);
    setEditingCatId(null);
    form.resetFields();
  };
  const showDrawer = (hodim?: Hodimlar) => {};
  const saveCat = () => {};
  const deleteCat = () => {};

  return (
    <div className="bg-[#edeff3] min-h-[95vh]">
      <div className="flex bg-white">
        <div className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[80px] p-3 justify-center gap-3">
          <div
            onClick={() => showDrawer()}
            className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center"
          >
            <FaPlus style={{ color: "white", fontSize: "17px" }} />
          </div>
          <Typography
            style={{
              width: "120px",
              color: "#2D3A45",
              lineHeight: "18px",
              fontWeight: "600px",
            }}
          >
            Yangi kategoriya qo'shish
          </Typography>
        </div>
        <div className="w-[460px] flex justify-center content-center items-center gap-5">
          <div className="flex justify-center content-center items-center">
            <div className="w-[300px] h-[48px] bg-[#edeff3] flex flex-row rounded-[35px] justify-between py-3 px-6 items-center">
              <input
                placeholder="Qidirish"
                style={{
                  backgroundColor: "#edeff3",
                  border: "none",
                  background: "transparent",
                  outline: "none",
                }}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <IoSearchOutline style={{ fontSize: "21px", color: "#8D9BA8" }} />
            </div>
          </div>
        </div>
      </div>

      <Drawer
        title={editingCatId ? "Kategoriyani tahrirlash" : "Yangi Kategoriya"}
        onClose={onClose}
        open={drawerOpen}
      >
        <Form form={form} layout="vertical" onFinish={saveCat}>
          <Form.Item
            name="nameUz"
            label="Kategoriya nomi uz"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            name="nameRu"
            label="Kategoriya nomi ru"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            name="MainKateg"
            label="Bosh kategoriyaga biriktirish"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select style={{ width: 200 }}>
              {hodimlar.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.filialId}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#20D472", border: "none" }}
            >
              {editingCatId ? "Yangilash" : "Saqlash"}
            </Button>
          </div>
        </Form>
      </Drawer>

      <div className="flex justify-between bg-white my-[20px] h-[45px] py-3 px-10">
        <div className="flex justify-center align-middle uppercase ">
          <Typography
            style={{
              color: "#2D3A45",
              fontSize: "14px",
              fontWeight: "bolder",
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
        <div className="px-6 flex flex-col gap-3 min-h-[85vh]">
          {hodimlar.map((item) => (
            <div
              key={item.id}
              className="flex bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg"
            >
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
                  {`${item.fistN} ${item.lastN}  ${item.thName} `}{" "}
                </Typography>
              </div>
              <div className="w-[400px] text-[#2D3A45] text-[15px] flex items-center">
                <Typography
                  style={{
                    marginLeft: "0px",
                    fontSize: "15px",
                    color: "#2D3A45",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.phone}
                </Typography>
              </div>
              <div className="w-[400px] text-[#2D3A45] text-[15px] flex items-center">
                <Typography
                  style={{
                    marginLeft: "0px",
                    fontSize: "15px",
                    color: "#2D3A45",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.lavozim}
                </Typography>
              </div>
              <div className="flex gap-4">
                <div
                  onClick={() => showDrawer(item)}
                  className="w-[40px] h-[40px] bg-[#edeff3] rounded-full flex justify-center content-center items-center"
                >
                  <div className="w-[32px] h-[32px] bg-white rounded-full  flex justify-center content-center items-center">
                    <FiEdit2 style={{ fontSize: "16px" }} />
                  </div>
                </div>
                <div
                  // onClick={() => deleteCat(item.id)}
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
