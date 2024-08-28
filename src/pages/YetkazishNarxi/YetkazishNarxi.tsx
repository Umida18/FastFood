import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  Dropdown,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./YetkazishNarxi.css";
import type { GetProp, MenuProps, UploadFile, UploadProps } from "antd";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { PlusOutlined } from "@ant-design/icons";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface Narx {
  id: number;
  filialId: number;
  narxi: number;
  minimalNarx: string;
}
interface FilialType {
  id: number;
  nameUz: string;
  nameRu: string;
  location: string;
  geometry: [];
  hours: string;
}

const { Option } = Select;
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export const YetkazishNarxi = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [products, setProducts] = useState<Narx[]>([]);
  const [filial, setFilial] = useState<FilialType[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [nameProd, setNameProd] = useState("");
  const [categoryProd, setCategoryProd] = useState<number | null>(null);
  const [priceProd, setPriceProd] = useState("");
  const [descProd, setDescProd] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [editingProdId, setEditingProdId] = useState<number | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProducts = await axios.get(
          "https://3c2999041095f9d9.mokky.dev/delivery"
        );
        setProducts(responseProducts.data);
        const responseFilial = await axios.get(
          " https://3c2999041095f9d9.mokky.dev/filial"
        );
        setFilial(responseFilial.data);

        console.log(products, filial);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const showDrawer = (product?: Narx) => {
    if (product) {
      setEditingProdId(product.id);
      form.setFieldsValue({
        id: product.id,
        filialId: product.filialId,
        narxi: product.narxi,
        minimalNarx: product.minimalNarx,
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

  const btnFilter = () => {
    setShowFilter(!showFilter);
    setDropdownVisible(!dropdownVisible);
  };

  const menuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const deleteProd = async (id: number) => {
    try {
      await axios.delete(`https://3c2999041095f9d9.mokky.dev/delivery/${id}`);

      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);

      message.success("Muvafaqiyatli o'chirildi");
    } catch (error) {
      message.error("O'chirishda xatolik!");
      console.error("Error deleting product: ", error);
    }
  };

  const addEditProd = async (values: {
    id: 10;
    filialId: number;
    narxi: number;
    minimalNarx: string;
  }) => {
    try {
      if (editingProdId === null) {
        const response = await axios.post(
          "https://3c2999041095f9d9.mokky.dev/delivery",
          values
        );
        setProducts([...products, response.data]);
        message.success("Yetkazish narxi muvaffaqiyatli qo'shildi!");
      } else {
        await axios.patch(
          `https://3c2999041095f9d9.mokky.dev/delivery/${editingProdId}`,
          values
        );
        setProducts(
          products.map((prod) =>
            prod.id === editingProdId ? { ...prod, ...values } : prod
          )
        );
        message.success("Yetkazish narxi muvaffaqiyatli yangilandi!");
      }

      onClose();
    } catch (error) {
      message.error("Failed to add product. Please try again.");
      console.error("Error adding product: ", error);
    }
  };
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onChange: async ({ fileList }) => {
      setFileList(fileList);

      if (fileList.length > 0) {
        const file = fileList[0].originFileObj as FileType;
        const base64 = await getBase64(file);
        setPreviewUrl(base64);
      } else {
        setPreviewUrl(null);
      }
    },
    maxCount: 1,
    listType: "picture-card",
    fileList,
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
          className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[60px] p-3 justify-center gap-3"
          onClick={() => showDrawer()}
        >
          <div className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center">
            <FaPlus style={{ color: "white", fontSize: "17px" }} />
          </div>
          <Typography
            style={{
              width: "100px",
              color: "#2D3A45",
              lineHeight: "18px",
              fontWeight: "600",
            }}
          >
            Yangi maxsulot qo'shish
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
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                // menu={{ items }}
                placement="bottomRight"
                arrow
                trigger={["click"]}
              >
                <div
                  // onClick={btnFilter}
                  className="w-[40px] h-[40px] bg-[#edeff3] mt-2 rounded-full flex justify-center content-center items-center"
                >
                  <div className="w-[36px] h-[36px] bg-white rounded-full  flex justify-center content-center items-center text-[15px]">
                    <CiFilter style={{ fontSize: "21px", color: "#8D9BA8" }} />
                  </div>
                </div>
              </Dropdown>
            </Space>
          </Space>{" "}
        </div>
        <Drawer
          title={editingProdId ? "Narxlarni Tahrirlash" : "Yangi narx qo'shish"}
          onClose={onClose}
          open={open}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Form form={form} layout="vertical" onFinish={addEditProd}>
            <Form.Item name="filial" label="Filial">
              <Select
                style={{ width: 200 }}
                value={filial}
                onChange={(value) => setFilial(value)}
              >
                {filial.map((item, index) => (
                  <Option key={item.id} value={item.id}>
                    {item.nameUz}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="narxi" label="Yetkazish Narxi">
              <InputNumber />
            </Form.Item>
            <Form.Item name="MinimalNarx" label="Minimal Narx">
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
      {/* salom */}
      {/* salom */}

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
              Minimal Narxi
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
            {products.map((item) => (
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
                    {item.filialId}
                  </Typography>
                </div>
                <div className="w-[290px] text-[#2D3A45] text-[15px] flex items-center">
                  {item.narxi} UZS
                </div>
                <div className="w-[250px] text-[#2D3A45] text-[15px] flex items-center">
                  {item.minimalNarx}
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
    </div>
  );
};
