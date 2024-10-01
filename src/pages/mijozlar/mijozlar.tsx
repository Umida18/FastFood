import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Drawer,
  Form,
  Select,
  Popconfirm,
  Typography,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import "./mijozlar.css";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { Mijoz } from "../../type/type";

const { Option } = Select;

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState<Mijoz[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingClient, setEditingClient] = useState<Mijoz | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProd = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/mijoz"
        );
        setClients(responseProd.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleAddClient = () => {
    setEditingClient(null);
    setIsDrawerVisible(true);
  };

  const handleEditClient = (record: Mijoz) => {
    setEditingClient(record);
    setIsDrawerVisible(true);
  };

  const handleDeleteClient = (key: number) => {
    setClients(clients.filter((client) => client.id !== key));
  };

  const handleSaveClient = (values: Mijoz) => {
    if (editingClient) {
      setClients(
        clients.map((client) =>
          client.id === editingClient.id ? { ...client, ...values } : client
        )
      );
    } else {
      setClients([
        ...clients,
        { ...values, id: Number(`${clients.length + 1}`) },
      ]);
    }
    setIsDrawerVisible(false);
  };

  const handleToggleStatus = (id: number) => {
    setClients(
      clients.map((client) =>
        client.id === id
          ? {
              ...client,
              status: client.status === "Active" ? "Block" : "Active",
            }
          : client
      )
    );
  };

  const filteredClients = clients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "MIJOZ ISMI",
      dataIndex: "firstName",
      key: "name",
      render: (_: any, record: Mijoz) =>
        record.firstName + " " + record.lastName,
    },
    { title: "TELEFON RAQAM", dataIndex: "phone", key: "phone" },
    { title: "BUYURTMALAR SONI", dataIndex: "ordersC", key: "orderC" },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: "Active" | "Block") => (
        <Button style={{ color: status === "Active" ? "green" : "red" }}>
          {status}
        </Button>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: Mijoz) => (
        <span>
          <Button
            icon={
              record.status === "Active" ? (
                <StopOutlined />
              ) : (
                <CheckCircleOutlined />
              )
            }
            onClick={() => handleToggleStatus(record.id)}
          />
          <Button icon={<FiEdit2 />} onClick={() => handleEditClient(record)} />
          <Popconfirm
            title="Ishonchingiz komilmi?"
            onConfirm={() => handleDeleteClient(record.id)}
          >
            <Button icon={<RiDeleteBin6Line />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
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
          className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[60px]  justify-center gap-3 pt-[10px]"
          onClick={() => handleAddClient}
        >
          <div className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center ">
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
            Yangi Mijoz qo'shish
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="rounded-[35px] bg-[#edeff3]"
            />
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredClients}
        pagination={false}
      />

      <Drawer
        title={editingClient ? "Mijozni tahrirlash" : "Yangi mijoz qo'shish"}
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        width={400}
      >
        <Form
          initialValues={editingClient || { status: "Active" }}
          onFinish={handleSaveClient}
        >
          <Form.Item
            name="name"
            label="MIJOZ ISMI"
            rules={[{ required: true, message: "Iltimos, ism kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="TELEFON RAQAM"
            rules={[
              { required: true, message: "Iltimos, telefon raqam kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="orderCount"
            label="BUYURTMALAR SONI"
            rules={[
              {
                required: true,
                message: "Iltimos, buyurtmalar sonini kiriting!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="STATUS">
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Block">Block</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ClientTable;
