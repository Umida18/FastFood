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
import {
  Branch,
  Category,
  Hodimlarr,
  Product,
  SelecCat,
} from "../../type/type";
import { FiMapPin } from "react-icons/fi";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

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
  const [mapCoords, setMapCoords] = useState<number[] | null>(null);
  const [hodimlar, setHodimlar] = useState<Hodimlarr[]>([]);
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [mapMode, setMapMode] = useState(false);

  const showDrawer = (branch?: Branch, coords?: number[], mode?: string) => {
    if (mode === "map") {
      setMapMode(true); // Show only the map
    } else {
      setMapMode(false); // Show form with map
    }

    if (branch) {
      setEditingProdId(branch.id);
      form.setFieldsValue({
        nameUz: branch.nameUz,
        nameRu: branch.nameRu,
        location: branch.location,
        geometry: branch.geometry,
        operatorId: branch.operatorId,
        hours: branch.hours,
      });
      setMapCoords(branch.geometry); // Set map coordinates
    } else {
      setEditingProdId(null);
      form.resetFields();
      setMapCoords([41.327169, 69.282666]); // Default coordinates for adding
    }

    setOpen(true);
  };
  const handleMapClick = (e: any) => {
    const coords = e.get("coords");
    setMapCoords(coords);
    form.setFieldsValue({ geometry: coords });
  };
  const onClose = () => {
    setOpen(false);
    setMapCoords(null);
  };
  const fetchData = async (pageNumber: number) => {
    try {
      const responseCat = await axios.get(
        "https://3c2999041095f9d9.mokky.dev/filial"
      );
      setFilial(responseCat.data);
      const responseHodim = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/Hodimlar"
      );
      setHodimlar(responseHodim.data);
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

  const addEditFilial = async (values: {
    nameUz: string;
    nameRu: string;
    location: string;
    geometry: [number, number];
    operatorId: number;
    hours: string;
  }) => {
    try {
      if (editingProdId === null) {
        const response = await axios.post(
          "https://3c2999041095f9d9.mokky.dev/filial",
          values
        );
        setFilial([...filial, response.data]);
        message.success("Yangi filial muvaffaqiyatli qo'shildi");
      } else {
        await axios.patch(
          `https://3c2999041095f9d9.mokky.dev/filial/${editingProdId}`,
          values
        );
        setFilial(
          filial.map((branch) =>
            branch.id === editingProdId ? { ...branch, ...values } : branch
          )
        );
        message.success("Filial muvaffaqiyatli yangilandi");
      }

      onClose();
    } catch (error) {
      message.error(
        "Amalni bajarishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
      );
      console.error("Error adding/editing filial: ", error);
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
            mapMode
              ? "Filial joylashuvi"
              : editingProdId
              ? "Filialni Tahrirlash"
              : "Yangi filial qo'shish"
          }
          onClose={onClose}
          open={open}
        >
          {mapMode ? (
            <YMaps
              query={{ load: "Map,Placemark,control.ZoomControl,geocode" }}
            >
              <Map
                defaultState={{
                  center: mapCoords || [41.327169, 69.282666],
                  zoom: 13,
                }}
                style={{ width: "100%", height: "300px" }}
              >
                {mapCoords && <Placemark geometry={mapCoords} />}
              </Map>
            </YMaps>
          ) : (
            // Full form with map
            <Form form={form} layout="vertical" onFinish={addEditFilial}>
              <Form.Item name="nameUz" label="Filial nomi (Uz)">
                <Input />
              </Form.Item>
              <Form.Item name="nameRu" label="Filial nomi (Ru)">
                <Input />
              </Form.Item>
              <Form.Item name="location" label="Manzil (Mo'ljal)">
                <Input />
              </Form.Item>

              {/* Koordinatalar (Geometry) */}
              <Form.Item name="geometry" label="Koordinatalar (geometriya)">
                <Input
                  style={{ marginBottom: 10 }}
                  value={
                    mapCoords ? `L1: ${mapCoords[0]}, L2: ${mapCoords[1]}` : ""
                  }
                  readOnly
                />
                {/* Map for selecting/editing coordinates */}
                <YMaps
                  query={{ load: "Map,Placemark,control.ZoomControl,geocode" }}
                >
                  <Map
                    defaultState={{
                      center: mapCoords || [41.327169, 69.282666],
                      zoom: 13,
                    }}
                    onClick={handleMapClick}
                    style={{ width: "100%", height: "300px" }}
                  >
                    {mapCoords && <Placemark geometry={mapCoords} />}
                  </Map>
                </YMaps>
              </Form.Item>

              <Form.Item name="operatorId" label="Operator">
                <Select style={{ width: 200 }}>
                  {hodimlar.map((operator) => (
                    <Option key={operator.id} value={operator.id}>
                      {operator.fistN} {operator.lastN} {operator.thName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="hours" label="Ish vaqti">
                <Input />
              </Form.Item>
              <div>
                <Button
                  htmlType="submit"
                  style={{
                    backgroundColor: "#20D472",
                    border: "none",
                    marginTop: "20px",
                  }}
                >
                  {editingProdId ? "Yangilash" : "Saqlash"}
                </Button>
              </div>
            </Form>
          )}
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
                marginRight: "75px",
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
                <div className="flex w-[315px]">
                  <Typography
                    style={{
                      // marginLeft: "20px",
                      fontSize: "15px",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.nameUz}
                  </Typography>
                </div>{" "}
                <div className="flex w-[340px]">
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
                <div className="flex w-[280px]">
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
                <div className="flex w-[300px]">
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
                <div className="flex gap-2">
                  <div
                    onClick={() => showDrawer(item, item.geometry, "map")}
                    className="w-[40px] h-[40px] bg-[#edeff3] rounded-full flex justify-center content-center items-center"
                  >
                    <div className="w-[32px] h-[32px] bg-white rounded-full  flex justify-center content-center items-center">
                      <FiMapPin style={{ fontSize: "16px" }} />
                    </div>
                  </div>
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
