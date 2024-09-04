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
  MenuProps,
  Select,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import "./filiallar.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
export interface Branch {
  id: number;
  nameUz: string;
  nameRu: string;
  location: string;
  operatorId: number;
  hours: string;
  geometry: [];
}
// const btnFilter = () => {
//   setShowFilter(!showFilter);
//   setDropdownVisible(!dropdownVisible);
// };
// const items: MenuProps["items"] = [
//   {
//     key: "1",
//     label: (
//       <div className="w-[353px] p-4" onClick={menuClick}>
//         <div>
//           <Typography style={{ color: "#818282" }}>Kategoriya</Typography>
//           <Select
//             defaultValue="Sort by"
//             style={{ width: 200 }}
//             dropdownRender={(menu) => <div>{menu}</div>}
//           >
//             {dataCat.map((item, index) => (
//               <Option key={item.id} value={item.id}>
//                 {item.nameUz}
//               </Option>
//             ))}
//           </Select>
//         </div>
//         <div>
//           <Checkbox.Group style={{ display: "flex", flexDirection: "column" }}>
//             <Checkbox value="priceAsc">
//               Narx bo’yicha (O’sish tartibida)
//             </Checkbox>
//             <Checkbox value="priceDesc">
//               Narx bo’yicha (Kamayish tartibida)
//             </Checkbox>
//             <Checkbox value="nameAsc">Nom bo’yicha (A-Z)</Checkbox>
//             <Checkbox value="nameDesc">Nom bo’yicha (Z-A)</Checkbox>
//           </Checkbox.Group>
//         </div>
//       </div>
//     ),
//   },
// ];
const BranchTable: React.FC = () => {
  const [data, setData] = useState<Branch[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

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

  const handleDrawerOk = (values: Omit<Branch, "id">) => {
    if (editingBranch) {
      setData(
        data.map((branch) =>
          branch.id === editingBranch.id ? { ...branch, ...values } : branch
        )
      );
    } else {
      setData([...data, { id: data.length + 1, ...values }]);
    }
    setIsDrawerVisible(false);
    setEditingBranch(null);
  };

  const handleDrawerCancel = () => {
    setIsDrawerVisible(false);
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
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: Branch) => (
        <span>
          <Button icon={<IoLocationOutline />} />
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
          className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[60px] p-3 justify-center gap-3"
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
          {" "}
          <div className="w-[300px] h-[48px]  py-3 px-6 items-center">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Qidirish"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>

      {/* salom 
          salom*/}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        className="p-5 rounded-0"
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
              operator: "",
              telefon: "",
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
            className="mb-2"
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
          </Form.Item>{" "}
          <Form.Item
            label="OPERATOR"
            name="operator"
            rules={[
              { required: true, message: "Iltimos, operator ismini kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            label="TELEFON RAQAM"
            name="telefon"
            rules={[
              { required: true, message: "Iltimos, telefon raqamni kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="mt-3">
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default BranchTable;
