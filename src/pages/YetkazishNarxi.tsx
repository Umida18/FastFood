import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  message,
} from "antd";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
// import { Branch } from "./filiallar/filiallar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setYetkazishNarxi } from "../store/slices/yetkazishNSlice";
import { Filial } from "../type/type";
export interface Narx {
  id: number;
  filialId: number;
  narxi: number;
  minimalNarx: string;
}

export const YetkazishNarxi = () => {
  const [filial, setFilial] = useState<Filial[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProdId, setEditingProdId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const yetkazishNarxiData: Narx[] = useSelector(
    (state: RootState) => state.yetkazishNarxi.yetkazishNarxi
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProducts = await axios.get(
          "https://3c2999041095f9d9.mokky.dev/delivery"
        );
        dispatch(setYetkazishNarxi(responseProducts.data));
        const responseFilial = await axios.get(
          " https://3c2999041095f9d9.mokky.dev/filial"
        );
        setFilial(responseFilial.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [yetkazishNarxiData]);

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

  const deleteProd = async (id: number) => {
    try {
      await axios.delete(`https://3c2999041095f9d9.mokky.dev/delivery/${id}`);

      const updatedProducts = yetkazishNarxiData.filter((p) => p.id !== id);
      dispatch(setYetkazishNarxi(updatedProducts));

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
        dispatch(setYetkazishNarxi([...yetkazishNarxiData, response.data]));
        message.success("Yetkazish narxi muvaffaqiyatli qo'shildi!");
      } else {
        await axios.patch(
          `https://3c2999041095f9d9.mokky.dev/delivery/${editingProdId}`,
          values
        );
        dispatch(
          setYetkazishNarxi(
            yetkazishNarxiData.map((prod) =>
              prod.id === editingProdId ? { ...prod, ...values } : prod
            )
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

  const filialName = (filialId: number) => {
    const branch = filial.find((branch) => branch.id === filialId);
    return branch ? branch.nameUz : "Filial topilmadi";
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
          className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[60px] p-3 items-center justify-center gap-3 "
          onClick={() => showDrawer()}
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
            Yangi qo'shish
          </Typography>
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
            <Form.Item name="filialId" label="Filial">
              <Select
                style={{ width: 200 }}
                // onChange={
                //   (value) => setFilial(value)
                //   // console.log("value", value)
                // }
              >
                {filial.map((item, index) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.nameUz}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="narxi" label="Yetkazish Narxi">
              <InputNumber />
            </Form.Item>
            <Form.Item name="minimalNarx" label="Minimal Narx">
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
        <div className="flex justify-row gap-60 bg-white my-[20px] h-[45px] py-3 px-10">
          <div className="flex justify-center align-middle uppercase ">
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
            {yetkazishNarxiData.map((item) => (
              <div
                key={item.id}
                className="flex bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg"
              >
                <div className=" w-[310px] ">
                  <Typography
                    style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "15px",
                      color: "#2D3A45",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {filialName(item.filialId)}
                  </Typography>
                </div>
                <div className="w-[300px] text-[#2D3A45] text-[15px] flex items-center">
                  {item.narxi} UZS
                </div>
                <div className="w-[360px] text-[#2D3A45] text-[15px] flex items-center">
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
