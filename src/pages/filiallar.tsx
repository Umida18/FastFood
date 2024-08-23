import React, { useState } from "react";
import { Button, Table, Input, Modal, Form, Typography } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { FaPlus } from "react-icons/fa6";

interface Branch {
  id: number;
  nameUz: string;
  nameRu: string;
  location: string;
  hours: string;
}

const initialData: Branch[] = [
  {
    id: 1,
    nameUz: "Shaxrishton",
    nameRu: "Shaxrishton",
    location: "Metro ro'parasida",
    hours: "09:00 - 20:00",
  },
  {
    id: 2,
    nameUz: "Xadra fast food",
    nameRu: "Xadra fast food",
    location: "Royson dom oldida",
    hours: "09:00 - 20:00",
  },
  {
    id: 3,
    nameUz: "Maksim Gorgiy",
    nameRu: "Maksim Gorgiy",
    location: "Metro ro'parasida",
    hours: "09:00 - 20:00",
  },
];

const BranchTable: React.FC = () => {
  const [data, setData] = useState<Branch[]>(initialData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  const handleDelete = (id: number) => {
    setData(data.filter((branch) => branch.id !== id));
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setIsModalVisible(true);
  };

  const handleModalOk = (values: Omit<Branch, "id">) => {
    if (editingBranch) {
      setData(
        data.map((branch) =>
          branch.id === editingBranch.id ? { ...branch, ...values } : branch
        )
      );
    } else {
      setData([...data, { id: data.length + 1, ...values }]);
    }
    setIsModalVisible(false);
    setEditingBranch(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingBranch(null);
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
    // { title: "FILIAL MO'LJAL", dataIndex: "hours", key: "hours" },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: Branch) => (
        <span>
          <Button icon={<EnvironmentOutlined />} />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </span>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[80px] p-3 justify-center gap-3">
          <div
            className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center"
            onClick={() => setIsModalVisible(true)}
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

        <Input
          prefix={<SearchOutlined />}
          placeholder="Qidirish"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table columns={columns} dataSource={filteredData} rowKey="id" />

      <Modal
        title={editingBranch ? "Filialni tahrirlash" : "Yangi filial qo'shish"}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          initialValues={
            editingBranch || { nameUz: "", nameRu: "", location: "", hours: "" }
          }
          onFinish={handleModalOk}
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
      </Modal>
    </div>
  );
};

export default BranchTable;
