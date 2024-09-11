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
import { Client } from "../../type/type";

const { Option } = Select;

// interface Client {
//   key: string;
//   name: string;
//   phone: string;
//   orderCount: number;
//   status: "Aktiv" | "Block";
// }

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProd = await axios.get(
          "https://1f5ffb1c4cd92fe3.mokky.dev/fastfood_mijoz"
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

  const handleEditClient = (record: Client) => {
    setEditingClient(record);
    setIsDrawerVisible(true);
  };

  const handleDeleteClient = (key: string) => {
    setClients(clients.filter((client) => client.key !== key));
  };

  const handleSaveClient = (values: Client) => {
    if (editingClient) {
      setClients(
        clients.map((client) =>
          client.key === editingClient.key ? { ...client, ...values } : client
        )
      );
    } else {
      setClients([...clients, { ...values, key: `${clients.length + 1}` }]);
    }
    setIsDrawerVisible(false);
  };

  const handleToggleStatus = (key: string) => {
    setClients(
      clients.map((client) =>
        client.key === key
          ? { ...client, status: client.status === "Aktiv" ? "Block" : "Aktiv" }
          : client
      )
    );
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "MIJOZ ISMI", dataIndex: "name", key: "name" },
    { title: "TELEFON RAQAM", dataIndex: "phone", key: "phone" },
    { title: "BUYURTMALAR SONI", dataIndex: "orderCount", key: "orderCount" },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: "Aktiv" | "Block") => (
        <span style={{ color: status === "Aktiv" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: Client) => (
        <span>
          <Button
            icon={
              record.status === "Aktiv" ? (
                <StopOutlined />
              ) : (
                <CheckCircleOutlined />
              )
            }
            onClick={() => handleToggleStatus(record.key)}
          />
          <Button icon={<FiEdit2 />} onClick={() => handleEditClient(record)} />
          <Popconfirm
            title="Ishonchingiz komilmi?"
            onConfirm={() => handleDeleteClient(record.key)}
          >
            <Button icon={<RiDeleteBin6Line />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[80px] p-3 justify-center gap-3">
          <div
            className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center"
            onClick={handleAddClient}
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
            Yangi mijoz qo'shish
          </Typography>
        </div>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Qidirish"
          style={{ width: 200, marginLeft: 16 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
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
          initialValues={editingClient || { status: "Aktiv" }}
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
              <Option value="Aktiv">Aktiv</Option>
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
