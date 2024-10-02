import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  Dropdown,
  Form,
  Image,
  Input,
  Select,
  Space,
  Typography,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./filiallar.css";
import type { GetProp, MenuProps, UploadFile, UploadProps } from "antd";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { PlusOutlined } from "@ant-design/icons";
import { Branch, Category, Product, SelecCat } from "../../type/type";

const { Option } = Select;

export const Filiallar = () => {
  const [filial, setFilial] = useState<Branch[]>([]);
  const [showFilter, setShowFilter] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoryProd, setCategoryProd] = useState<number | null>(null);

  const [searchVal, setSearchVal] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingProdId, setEditingProdId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);

  const showDrawer = (product?: Branch) => {
    if (product) {
      setEditingProdId(product.id);
      form.setFieldsValue({
        name: product.nameUz,
        // type: product.type,
        price: product.location,
        desc: product.telefon,
        img: product.hours,
      });
    } else {
      setEditingProdId(null);
      form.resetFields();
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchData = async (pageNumber: number) => {
    try {
      const responseCat = await axios.get(
        "https://3c2999041095f9d9.mokky.dev/filial"
      );
      setFilial(responseCat.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const btnFilter = () => {
    setShowFilter(!showFilter);
    setDropdownVisible(!dropdownVisible);
  };

  const filteredProducts = (Array.isArray(filial) ? filial : []).filter(
    (prod) => {
      return (
        prod.nameUz &&
        prod.nameUz.toLowerCase().includes(searchVal.toLowerCase())
      );
    }
  );

  const CategName = (id: number) => {
    const categ = filial.find((c) => c.id === id);
    return categ ? categ.nameUz : "-";
  };

  const deleteProd = async (id: number) => {
    try {
      await axios.delete(`https://3c2999041095f9d9.mokky.dev/filial/${id}`);

      const updatedProducts = filial.filter((p) => p.id !== id);
      setFilial(updatedProducts);

      message.success("Muvafaqiyatli o'chirildi");
    } catch (error) {
      message.error("O'chirishda xatolik!");
      console.error("Error deleting product: ", error);
    }
  };

  const addEditProd = async (values: {
    name: string;
    type: number;
    price: string;
    desc: string;
    img: string;
  }) => {
    try {
      const productData = {
        ...values,
        price: parseFloat(values.price),
        img: previewUrl || "",
      };
      if (editingProdId === null) {
        const response = await axios.post(
          "https://3c2999041095f9d9.mokky.dev/filial",
          productData
        );
        setFilial([...filial, response.data]);
        message.success("Maxsulot muvaffaqiyatli qo'shildi!");
      } else {
        await axios.patch(
          `https://3c2999041095f9d9.mokky.dev/filial/${editingProdId}`,
          productData
        );
        setFilial(
          filial.map((prod) =>
            prod.id === editingProdId ? { ...prod, ...productData } : prod
          )
        );
        message.success("Maxsulot muvaffaqiyatli yangilandi!");
      }

      onClose();
    } catch (error) {
      message.error("Failed to add product. Please try again.");
      console.error("Error adding product: ", error);
    }
  };
  const PriceComponent = ({ price }: { price: number }) => {
    const formatPrice = (price: number) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return <div>{formatPrice(price)} UZS</div>;
  };

  return (
    <div className="bg-[#edeff3]">
      <div className="flex bg-white">
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
            Yangi filial qo'shish
          </Typography>
        </div>
        <div className="w-[530px] flex justify-center content-center items-center gap-5">
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
        <Drawer
          title={
            editingProdId ? "Maxsulotni Tahrirlash" : "Yangi maxsulot qo'shish"
          }
          onClose={onClose}
          open={open}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Form form={form} layout="vertical" onFinish={addEditProd}>
            <Form.Item name="name" label="Maxsulot nomi">
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Kategoriya">
              <Select
                style={{ width: 200 }}
                value={categoryProd}
                onChange={(value) => setCategoryProd(value)}
              >
                {filial.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.nameUz}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Narxi">
              <Input />
            </Form.Item>
            <Form.Item name="desc" label="Qo'shimcha ma'lumot">
              <Input />
            </Form.Item>
            <div>
              <Button
                htmlType="submit"
                style={{ backgroundColor: "#20D472", border: "none" }}
              >
                {editingProdId ? "Yangilash" : "Saqlash"}
              </Button>
            </div>
          </Form>
        </Drawer>
      </div>

      <div className=" bg-[#edeff3] min-h-[95vh] mt-3">
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
              FILIAL NOMI(UZ)
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
              FILIAL NOMI(RU)
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
              MO'LJAL
            </Typography>
          </div>{" "}
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
              ISH VAQTI
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
          <div className="px-6 flex flex-col gap-3 contMain">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="flex bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg"
              >
                <div className="flex w-[290px]">
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "15px",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.nameUz}
                  </Typography>
                </div>{" "}
                <div className="flex w-[290px]">
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "15px",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.nameRu}
                  </Typography>
                </div>{" "}
                <div className="flex w-[290px]">
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "15px",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.location}
                  </Typography>
                </div>{" "}
                <div className="flex w-[290px]">
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "15px",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.hours}
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
    </div>
  );
};
