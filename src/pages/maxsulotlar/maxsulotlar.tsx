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
import "./maxsulotlar.css";
import type { GetProp, MenuProps, UploadFile, UploadProps } from "antd";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { PlusOutlined } from "@ant-design/icons";
import { Category, Product, SelecCat } from "../../type/type";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const { Option } = Select;
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export const Maxsulotlar = () => {
  const [dataCat, setDataCat] = useState<Category[]>([]);
  const [showFilter, setShowFilter] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkBoxCat, setCheckBoxCat] = useState<SelecCat>({});
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const showDrawer = (product?: Product) => {
    if (product) {
      setEditingProdId(product.id);
      form.setFieldsValue({
        name: product.name,
        type: product.type,
        price: product.price,
        desc: product.desc,
        img: product.img,
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
        "https://2f972b43e3dad83a.mokky.dev/kotegoriyalar"
      );
      setDataCat(responseCat.data);

      const responseProducts = await axios.get(
        `https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar`
      );

      setProducts(responseProducts.data);
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

  const menuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="w-[353px] p-4" onClick={menuClick}>
          <div>
            <Typography style={{ color: "#818282" }}>Kategoriya</Typography>
            <Select
              value={selectedCategory}
              style={{ width: 200 }}
              onChange={(value) => setSelectedCategory(value)}
            >
              <Option value={null}>All</Option>
              {dataCat.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.nameUz}
                </Option>
              ))}
            </Select>
          </div>
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
              <Checkbox value="priceAsc">
                Narx bo’yicha (O’sish tartibida)
              </Checkbox>
              <Checkbox value="priceDesc">
                Narx bo’yicha (Kamayish tartibida)
              </Checkbox>
              <Checkbox value="nameAsc">Nom bo’yicha (A-Z)</Checkbox>
              <Checkbox value="nameDesc">Nom bo’yicha (Z-A)</Checkbox>
            </Checkbox.Group>
          </div>
        </div>
      ),
    },
  ];

  const filteredProducts = (Array.isArray(products) ? products : [])
    .filter((prod) => {
      return (
        prod.name && prod.name.toLowerCase().includes(searchVal.toLowerCase())
      );
    })
    .filter((prod) => {
      if (selectedCategory !== null) {
        return prod.type === selectedCategory;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
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

  const CategName = (id: number) => {
    const categ = dataCat.find((c) => c.id === id);
    return categ ? categ.nameUz : "-";
  };

  const deleteProd = async (id: number) => {
    try {
      await axios.delete(
        `https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar/${id}`
      );

      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);

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
          "https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar",
          productData
        );
        setProducts([...products, response.data]);
        message.success("Maxsulot muvaffaqiyatli qo'shildi!");
      } else {
        await axios.patch(
          `https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar/${editingProdId}`,
          productData
        );
        setProducts(
          products.map((prod) =>
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
            Yangi maxsulot qo'shish
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
                {dataCat.map((item, index) => (
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
            <Form.Item name="img" label="Qo'shimcha ma'lumot">
              {fileList.length === 0 && (
                <Upload {...uploadProps}>
                  <Button icon={<PlusOutlined />}>Upload img</Button>
                </Upload>
              )}
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Uploaded Image"
                  style={{ maxWidth: "100%" }}
                />
              )}
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

        <div>
          <div className="px-6 flex flex-col gap-3 contMain">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="flex bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg"
              >
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
                  <PriceComponent price={item.price} />
                </div>
                <div className="w-[300px] text-[#2D3A45] text-[15px] flex items-center">
                  {item.desc}
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
