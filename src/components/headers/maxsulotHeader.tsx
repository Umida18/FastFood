import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import {
  Button,
  Checkbox,
  Drawer,
  Dropdown,
  Input,
  MenuProps,
  Select,
  Space,
  Typography,
  message,
  Upload,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface Product {
  id: number;
  name: string;
  type: number;
  price: string;
  desc: string;
  img: string;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const { Option } = Select;

interface Category {
  id: number;
  MainKateg: number;
  name: string;
}

interface SelecCat {
  [key: string]: string[];
}

export const MaxsulotHeader = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [dataCat, setDataCat] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]); // Store products
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkBoxCat, setCheckBoxCat] = useState<SelecCat>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [nameProd, setNameProd] = useState("");
  const [categoryProd, setCategoryProd] = useState<number | null>(null);
  const [priceProd, setPriceProd] = useState("");
  const [descProd, setDescProd] = useState("");
  const [imgProd, setImgProd] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCat = await axios.get(
          "https://2f972b43e3dad83a.mokky.dev/kotegoriyalar"
        );
        setDataCat(responseCat.data);

        const responseProducts = await axios.get(
          "https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar"
        );
        setProducts(responseProducts.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const btnFilter = () => {
    setShowFilter(!showFilter);
    setDropdownVisible(!dropdownVisible);
  };

  const menuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleVisibleChange = (visible: boolean) => {
    setDropdownVisible(visible);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const addProd = async () => {
    try {
      const NewProduct: Product = {
        id: Date.now(),
        name: nameProd,
        type: categoryProd || 0,
        price: priceProd,
        desc: descProd,
        img: fileList[0]?.url || "",
      };

      await axios.post(
        "https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar",
        NewProduct
      );

      setProducts([...products, NewProduct]);

      message.success("Product added successfully!");

      setNameProd("");
      setCategoryProd(null);
      setPriceProd("");
      setDescProd("");
      setFileList([]);
      setOpen(false);
    } catch (error) {
      message.error("Failed to add product. Please try again.");
      console.error("Error adding product: ", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="w-[353px] p-4" onClick={menuClick}>
          <div>
            <Typography style={{ color: "#818282" }}>Kategoriya</Typography>
            <Select
              defaultValue="Sort by"
              style={{ width: 200 }}
              dropdownRender={(menu) => <div>{menu}</div>}
            >
              {dataCat.map((item, index) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Checkbox.Group
              style={{ display: "flex", flexDirection: "column" }}
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
  return (
    <div className="flex">
      <div className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[80px] p-3 justify-center gap-3">
        <div
          className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center"
          onClick={showDrawer}
        >
          <FaPlus style={{ color: "white", fontSize: "17px" }} />
        </div>
        <Typography
          style={{
            width: "100px",
            color: "#2D3A45",
            lineHeight: "18px",
            fontWeight: "600px",
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
        title="Yangi maxsulot qo'shish"
        onClose={onClose}
        open={open}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div>
            <Typography style={{ color: "#818282" }}>Maxsulot nomi</Typography>
            <Input
              value={nameProd}
              onChange={(e) => setNameProd(e.target.value)}
              placeholder=""
            />
          </div>
          <div>
            <Typography style={{ color: "#818282" }}>Kategoriya</Typography>
            <Select
              style={{ width: 200 }}
              value={categoryProd}
              onChange={(value) => setCategoryProd(value)}
              dropdownRender={(menu) => <div>{menu}</div>}
            >
              {dataCat.map((item, index) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Typography style={{ color: "#818282" }}>Narxi</Typography>
            <Input
              value={priceProd}
              onChange={(e) => setPriceProd(e.target.value)}
              placeholder=""
            />
          </div>
          <div>
            <Typography style={{ color: "#818282" }}>
              Qo'shimcha ma'lumot
            </Typography>
            <Input
              value={descProd}
              onChange={(e) => setDescProd(e.target.value)}
              placeholder=""
            />
          </div>
          <div>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
        </div>
        <div>
          <Button
            onClick={addProd}
            style={{ backgroundColor: "#20D472", border: "none" }}
          >
            Saqlash
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
