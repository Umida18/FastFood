import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  Dropdown,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
  MenuProps,
} from "antd";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./mijozlar.css";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import type { Mijoz, Order } from "../../type/type";

const { Option } = Select;

export const Mijozlar = () => {
  const [mijozlar, setMijozlar] = useState<Mijoz[]>([]);
  const [buyurtma, setBuyurtma] = useState<Order[]>([]);
  const [showFilter, setShowFilter] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState("");
  const [editingMijozId, setEditingMijozId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);

  const fetchMijozData = async () => {
    try {
      const response = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/mijoz"
      );
      setMijozlar(response.data);
      const responseBuyurtma = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma"
      );
      setBuyurtma(responseBuyurtma.data);
    } catch (error) {
      console.error("Error fetching Mijoz data: ", error);
    }
  };

  useEffect(() => {
    fetchMijozData();
  }, []);

  const showDrawer = (mijoz?: Mijoz) => {
    if (mijoz) {
      setEditingMijozId(mijoz.id);
      form.setFieldsValue({
        firstName: mijoz.firstName,
        lastName: mijoz.lastName,
        phone: mijoz.phone,
        status: mijoz.status,
        // ordersC: mijoz.ordersC
      });
    } else {
      setEditingMijozId(null);
      form.resetFields();
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const deleteMijoz = async (id: number) => {
    try {
      await axios.delete(`https://10d4bfbc5e3cc2dc.mokky.dev/mijoz/${id}`);
      const updatedMijozlar = mijozlar.filter((m) => m.id !== id);
      setMijozlar(updatedMijozlar);
      message.success("Mijoz muvaffaqiyatli o'chirildi!");
    } catch (error) {
      message.error("Mijozni o'chirishda xatolik yuz berdi!");
      console.error("Error deleting Mijoz: ", error);
    }
  };
  const menuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const countorderNumber = (id: number) => {
    const findmijoz = buyurtma.filter((item) => item.mijoz_id === id);
    return findmijoz.length;
  };
  const addEditMijoz = async (values: {
    firstName: string;
    lastName: string;
    phone: string;
    status: "Active" | "InActive";
  }) => {
    try {
      if (editingMijozId === null) {
        // Add a new Mijoz with an initial order count of 0
        const newMijoz = {
          ...values,
          ordersCount: 0, // Initialize the new customer with 0 orders
        };
        const response = await axios.post(
          "https://10d4bfbc5e3cc2dc.mokky.dev/mijoz",
          newMijoz
        );
        setMijozlar([...mijozlar, response.data]);
        message.success("Mijoz muvaffaqiyatli qo'shildi!");
      } else {
        // Update the existing Mijoz without changing their ordersCount
        await axios.patch(
          `https://10d4bfbc5e3cc2dc.mokky.dev/mijoz/${editingMijozId}`,
          values
        );
        setMijozlar(
          mijozlar.map((m) =>
            m.id === editingMijozId ? { ...m, ...values } : m
          )
        );
        message.success("Mijoz muvaffaqiyatli yangilandi!");
      }
      onClose();
    } catch (error) {
      message.error("Mijoz qo'shishda/xatolik yuz berdi.");
      console.error("Error adding/updating Mijoz: ", error);
    }
  };

  const btnFilter = () => {
    setShowFilter(!showFilter);
    setDropdownVisible(!dropdownVisible);
  };

  const filteredMijozlar = (Array.isArray(mijozlar) ? mijozlar : [])
    .filter((prod) => {
      return (
        prod.firstName &&
        prod.firstName.toLowerCase().includes(searchVal.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "nameAsc":
          return a.firstName
            .toLowerCase()
            .localeCompare(b.firstName.toLowerCase());
        case "nameDesc":
          return b.firstName
            .toLowerCase()
            .localeCompare(a.firstName.toLowerCase());
        default:
          return 0;
      }
    });
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="w-[353px] p-4" onClick={menuClick}>
          <div>
            <Checkbox.Group
              style={{ display: "flex", flexDirection: "column" }}
              onChange={(checkedValues) => {
                if (checkedValues.length > 0) {
                  setSortOption(checkedValues[0] as string);
                } else {
                  setSortOption(null);
                }
              }}
            >
              <Checkbox value="nameAsc">Ism bo’yicha (A-Z)</Checkbox>
              <Checkbox value="nameDesc">Ism bo’yicha (Z-A)</Checkbox>
            </Checkbox.Group>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#edeff3]">
      <div className="flex bg-white">
        <div className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[80px] p-3 justify-center items-center gap-3">
          <div
            className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center"
            onClick={() => showDrawer()}
          >
            <FaPlus style={{ color: "white", fontSize: "17px" }} />
          </div>

          <Typography
            style={{
              width: "100px",
              color: "#2D3A45",
              lineHeight: "18px",
              fontWeight: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Yangi Mijoz qo'shish
          </Typography>
        </div>
        <div className="w-[530px] flex justify-center items-center gap-5">
          <div className="w-[300px] h-[48px] bg-[#edeff3] flex flex-row rounded-[35px] justify-between py-3 px-6 items-center">
            <input
              placeholder="Qidirish"
              style={{
                backgroundColor: "#edeff3",
                border: "none",
                outline: "none",
              }}
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <IoSearchOutline style={{ fontSize: "21px", color: "#8D9BA8" }} />
          </div>
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
                  className="w-[48px] h-[48px] bg-[#edeff3] rounded-full flex justify-center content-center items-center"
                >
                  <div className="w-[36px] h-[36px] bg-white rounded-full  flex justify-center content-center items-center text-[15px]">
                    <CiFilter style={{ fontSize: "21px", color: "#8D9BA8" }} />
                  </div>
                </div>
              </Dropdown>
            </Space>
          </Space>
        </div>
        <Drawer
          title={editingMijozId ? "Mijozni Tahrirlash" : "Yangi mijoz qo'shish"}
          onClose={onClose}
          open={open}
        >
          <Form form={form} layout="vertical" onFinish={addEditMijoz}>
            <Form.Item name="firstName" label="First Name">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select>
                <Option value="Active">Active</Option>
                <Option value="InActive">InActive</Option>
              </Select>
            </Form.Item>
            <Button
              htmlType="submit"
              style={{
                backgroundColor: "#20D472",
                border: "none",
                marginTop: "10px",
              }}
            >
              {editingMijozId ? "Yangilash" : "Saqlash"}
            </Button>
          </Form>
        </Drawer>
      </div>

      <div className="bg-[#edeff3] min-h-[95vh] mt-3">
        <div className="flex justify-between bg-white my-[20px] h-[45px] py-3 px-10">
          <div className="flex justify-center align-middle uppercase ">
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
              Mijoz ismi
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
              Telefon raqam
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
              Buyurtmalar soni
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
              Status
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

        <div className="px-6 flex flex-col gap-3 contMain">
          {filteredMijozlar.map((mijoz) => (
            <div
              key={mijoz.id}
              className="flex bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg"
            >
              <div className="flex w-[275px]">
                <Typography
                  style={{
                    marginLeft: "20px",
                    fontSize: "15px",
                    color: "#2D3A45",
                  }}
                >
                  {mijoz.firstName} {mijoz.lastName}
                </Typography>
              </div>
              <div className="w-[300px] text-[#2D3A45] text-[15px] flex items-center">
                {mijoz.phone}
              </div>
              <div className="w-[325px] text-[#2D3A45] text-[15px] flex items-center">
                {countorderNumber(mijoz.id)}
              </div>

              <div className="w-[230px] text-[#2D3A45] text-[15px] flex items-center">
                {mijoz.status}
              </div>
              <div className="flex gap-4">
                <div
                  onClick={() => showDrawer(mijoz)}
                  className="w-[40px] h-[40px] bg-[#edeff3] rounded-full flex justify-center items-center"
                >
                  <FiEdit2 style={{ fontSize: "16px" }} />
                </div>
                <div
                  onClick={() => deleteMijoz(mijoz.id)}
                  className="w-[40px] h-[40px] bg-[#edeff3] rounded-full flex justify-center items-center"
                >
                  <RiDeleteBinLine style={{ fontSize: "16px" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
