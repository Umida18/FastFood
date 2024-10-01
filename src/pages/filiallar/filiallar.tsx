import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Input,
  Drawer,
  Form,
  Typography,
  Space,
  Dropdown,
  Select,
  message,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import "./filiallar.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { Addres, Branch } from "../../type/type";

const FilialTable = () => {
  const [data, setData] = useState<Branch[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [address, setAddress] = useState<Addres[]>([]);
  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const [mapCoords, setMapCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    const initialData = async () => {
      try {
        const response = await axios.get(
          "https://3c2999041095f9d9.mokky.dev/filial"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    initialData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://3c2999041095f9d9.mokky.dev/filial/${id}`);
      const updatedFilials = data.filter((p) => p.id !== id);
      setData(updatedFilials);
      message.success("Muvafaqiyatli o'chirildi");
    } catch (error) {
      message.error("O'chirishda xatolik!");
      console.error("Error deleting product: ", error);
    }
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setIsDrawerVisible(true);
  };

  const handleDrawerOk = (values: Omit<Branch, "id" | "geometry">) => {
    if (editingBranch) {
      setData(
        data.map((branch) =>
          branch.id === editingBranch.id ? { ...branch, ...values } : branch
        )
      );
    } else {
      setData([...data, { id: data.length + 1, geometry: [0, 0], ...values }]);
    }
    setIsDrawerVisible(false);
    setEditingBranch(null);
  };

  const handleDrawerCancel = () => {
    setIsDrawerVisible(false);
    setEditingBranch(null);
  };

  const handleMapClick = (e: any) => {
    const coords = e.get("coords");
    setAddress([{ L1: coords[0], L2: coords[1] }]);
    console.log(address);
  };

  const openMap = (branch: Branch) => {
    setMapCoords(branch.geometry);
    setMapVisible(true);
  };

  const closeMap = () => {
    setMapVisible(false);
    setMapCoords(null);
  };

  const filteredData = data.filter(
    (branch) =>
      branch.nameUz.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.nameRu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "FILIAL NOMI (UZ)", dataIndex: "nameUz", key: "nameUz" },
    { title: "FILIAL NOMI (RU)", dataIndex: "nameRu", key: "nameRu" },
    { title: "MO'LJAL", dataIndex: "location", key: "location" },
    { title: "ISH VAQTI", dataIndex: "hours", key: "hours" },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: Branch) => (
        <span>
          <Button
            icon={<IoLocationOutline />}
            onClick={() => openMap(record)}
          />
          <Button icon={<FiEdit2 />} onClick={() => handleEdit(record)} />
          <Button
            icon={<RiDeleteBin6Line />}
            onClick={() => handleDelete(record.id)}
          />
        </span>
      ),
    },
  ];

  return (
    <div className="p-0 m-0  bg-[#edeff3]">
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
          className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[60px]  justify-center gap-3  pt-[10px]"
          onClick={() => setIsDrawerVisible(true)}
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
            Yangi filial qo'shish
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            gap: 3,
          }}
        >
          <div className="w-[300px] h-[48px]  py-3 px-6 items-center">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Qidirish"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-[35px] bg-[#edeff3]"
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        className=" rounded-0"
      />

      <Drawer
        title={editingBranch ? "Filialni tahrirlash" : "Yangi filial qo'shish"}
        visible={isDrawerVisible}
        onClose={handleDrawerCancel}
        width={400}
      >
        <Form
          initialValues={
            editingBranch || {
              nameUz: "",
              nameRu: "",
              location: "",
              hours: "",
            }
          }
          onFinish={handleDrawerOk}
          layout="vertical"
        >
          <Form.Item
            label="FILIAL NOMI (UZ)"
            name="nameUz"
            rules={[
              { required: true, message: "Iltimos, filial nomini kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="FILIAL NOMI (RU)"
            name="nameRu"
            rules={[
              { required: true, message: "Iltimos, filial nomini kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="MO'LJAL"
            name="location"
            rules={[
              { required: true, message: "Iltimos, mo'ljalni kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ISH VAQTI"
            name="hours"
            rules={[
              { required: true, message: "Iltimos, ish vaqtini kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title="Filial Manzili"
        open={mapVisible}
        onClose={closeMap}
        width={600}
      >
        <YMaps>
          <Map
            defaultState={{
              center: [41.327169, 69.282666],
              zoom: 13,
            }}
            width="100%"
            height="400px"
          >
            {mapCoords && <Placemark geometry={mapCoords} />}
          </Map>
        </YMaps>
      </Drawer>
    </div>
  );
};

export default FilialTable;
