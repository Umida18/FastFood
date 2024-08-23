import React, { useState } from "react";
import { Table, Button, Input, Modal, Form, Select, Popconfirm } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Option } = Select;

interface Client {
  key: string;
  name: string;
  phone: string;
  orderCount: number;
  status: "Aktiv" | "Block";
}

const initialClients: Client[] = [
  {
    key: "1",
    name: "Dina Glenn",
    phone: "(+99 893) 461-41-88",
    orderCount: 3,
    status: "Aktiv",
  },
  {
    key: "2",
    name: "Nicolina Lindholm",
    phone: "(+99 893) 461-41-88",
    orderCount: 2,
    status: "Block",
  },
  {
    key: "3",
    name: "Ekaterina Tankova",
    phone: "(+99 893) 461-41-88",
    orderCount: 1,
    status: "Aktiv",
  },
];

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchText, setSearchText] = useState("");

  const handleAddClient = () => {
    setEditingClient(null);
    setIsModalVisible(true);
  };

  const handleEditClient = (record: Client) => {
    setEditingClient(record);
    setIsModalVisible(true);
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
    setIsModalVisible(false);
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
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClient(record)}
          />
          <Popconfirm
            title="Ishonchingiz komilmi?"
            onConfirm={() => handleDeleteClient(record.key)}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddClient}
        >
          Yangi mijoz qo'shish
        </Button>
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

      <Modal
        title={editingClient ? "Mijozni tahrirlash" : "Yangi mijoz qo'shish"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
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
      </Modal>
    </div>
  );
};

export default ClientTable;
