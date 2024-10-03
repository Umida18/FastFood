import React, { useEffect, useState } from "react";
import {
  Typography,
  Drawer,
  Button,
  Avatar,
  Tabs,
  Input,
  Select,
  Form,
  message,
  Spin,
} from "antd";
import { FaPlus, FaRegUser } from "react-icons/fa6";
import { IoCheckmark, IoClipboardOutline } from "react-icons/io5";
import { TbX } from "react-icons/tb";
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import { CiBookmark, CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GoColumns } from "react-icons/go";
import { PiRowsThin } from "react-icons/pi";
import { TabsProps } from "rc-tabs";
import { GoPlus } from "react-icons/go";
import "./buyurtma.css";
import { FiTrash2 } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import CardOrdered from "./card";
import {
  Addres,
  Branch,
  Category,
  Delivey,
  Hodimlarr,
  Mijoz,
  Order,
  PaymentM,
  Product,
} from "../../type/type";

export const Buyurtmalar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [buyurtma, setBuyurtma] = useState<Order[]>([]);
  const [tolovTuri, setTolovTuri] = useState<PaymentM[]>([]);
  const [kategoriya, setKategoriya] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [mijoz, setMijoz] = useState<Mijoz[]>([]);
  const [activeTab, setActiveTab] = useState<string>("yangi");
  const [selectedView, setSelectedView] = useState<string>("columns");
  const [openSelMijoz, setOpenSelMijoz] = useState<boolean>(false);
  const [addProdList, setAddProdList] = useState<Product[]>([]);
  const [selectedClient, setSelectedClient] = useState<Mijoz | null>(null);
  const [address, setAddress] = useState<Addres[]>([]);
  const [filial, setFilial] = useState<Branch[]>([]);
  const [hodim, setHodim] = useState<Hodimlarr[]>([]);
  const [selectedFilial, setSelectedFilial] = useState<Branch | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Hodimlarr | null>(
    null
  );
  const [delivery, setDelivery] = useState<Delivey[]>([]);
  const [delNarx, setDelNarx] = useState<number | undefined>(undefined);
  const [selectedFilialId, setSelectedFilialId] = useState<number | null>(null);
  const [quantityProd, setQuantityProd] = useState<number | null>(null);
  const [totalProductP, setTotalProductP] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
    form.resetFields();
  };

  const onClose = () => {
    setOpen(false);
  };
  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [
        responseB,
        responseT,
        responseCat,
        responseProducts,
        responseMijoz,
        responseF,
        responseH,
        responseDelivery,
      ] = await Promise.all([
        axios.get("https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma"),
        axios.get("https://10d4bfbc5e3cc2dc.mokky.dev/paymentMethod"),
        axios.get("https://2f972b43e3dad83a.mokky.dev/kotegoriyalar"),
        axios.get("https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar"),
        axios.get("https://10d4bfbc5e3cc2dc.mokky.dev/mijoz"),
        axios.get("https://3c2999041095f9d9.mokky.dev/filial"),
        axios.get("https://10d4bfbc5e3cc2dc.mokky.dev/Hodimlar"),
        axios.get("https://3c2999041095f9d9.mokky.dev/delivery"),
      ]);
      setProducts(responseProducts.data);
      setBuyurtma(responseB.data);
      setTolovTuri(responseT.data);
      setKategoriya(responseCat.data);
      setMijoz(responseMijoz.data);
      setFilial(responseF.data);
      setHodim(responseH.data);
      setDelivery(responseDelivery.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const getPaymentMethod = (paymentId: number) => {
    const payment = tolovTuri.find((item) => item.id === paymentId);
    return payment ? payment.name : "Unknown";
  };

  const PriceComponent = ({ price }: { price: string }) => {
    const formatPrice = (price: string) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return <div>{formatPrice(price)} UZS</div>;
  };

  const getClient = (clientId: number): Mijoz => {
    const client = mijoz.find((m) => m.id === clientId);
    if (client) {
      return {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        phone: client.phone,
        ordersC: client.ordersC,
        status: client.status,
      };
    }
    return {
      id: -1,
      firstName: "Unknown",
      lastName: "",
      phone: "",
      ordersC: 0,
      status: "Unknown",
    };
  };
  const orderStatus = async (
    order: Order,
    direction: "forward" | "backward"
  ) => {
    const updatedOrders = { ...order };

    if (direction === "forward") {
      if (order.status === "yangi") {
        updatedOrders.status = "qabul";
      } else if (order.status === "qabul") {
        updatedOrders.status = "jonatilgan";
      } else if (order.status === "jonatilgan") {
        updatedOrders.status = "yopilgan";
      }
    } else if (direction === "backward") {
      if (order.status === "yopilgan") {
        updatedOrders.status = "jonatilgan";
      } else if (order.status === "jonatilgan") {
        updatedOrders.status = "qabul";
      } else if (order.status === "qabul") {
        updatedOrders.status = "yangi";
      }
    }

    try {
      await axios.patch(
        `https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma/${order.id}`,
        {
          status: updatedOrders.status,
        }
      );
      setBuyurtma((prevOrders) =>
        prevOrders.map((o) =>
          o.order_id === updatedOrders.order_id ? updatedOrders : o
        )
      );
    } catch (error) {
      console.log("Statusni yangilashda xatolik:", error);
    }
  };

  const filteredOrders = buyurtma.filter((order) => order.status === activeTab);

  const openSelectM = () => {
    setOpenSelMijoz(true);
  };
  const addProductToList = (product: Product) => {
    setAddProdList((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);
      if (existingProduct) {
        const updatedList = prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity: p.quantity + 1,
                price: (p.originalPrice || p.price) * (p.quantity + 1),
                isProductAdded: true,
              }
            : p
        );
        return updatedList;
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity: 1,
            originalPrice: product.price,
            isProductAdded: true,
          },
        ];
      }
    });
  };

  const decrementQuantity = (id: number) => {
    setAddProdList((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? {
                ...p,
                quantity: p.quantity - 1,
                price: (p.originalPrice || p.price) * (p.quantity - 1),
              }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const incrementQuantity = (id: number) => {
    setAddProdList((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: p.quantity + 1,
              price: (p.originalPrice || p.price) * (p.quantity + 1),
            }
          : p
      )
    );
  };

  useEffect(() => {
    const orderPrice = addProdList.reduce((total, prod) => {
      const priceNum = parseFloat(prod.price.toString().replace(/,/g, ""));
      return total + priceNum;
    }, 0);

    setTotalProductP(orderPrice);
  }, [addProdList]);

  const delListProd = () => {
    setAddProdList([]);
  };
  const handleClientChange = (Id: number) => {
    const client = mijoz.find((m) => m.id === Id);
    setSelectedClient(client ? client : null);
  };

  const handleBranchh = (id: number) => {
    setSelectedFilialId(id);
    const branch = filial.find((f) => f.id === id);
    if (branch) {
      const operator = hodim.find((h) => h.id === branch.operatorId);
      const oper = operator ? operator : null;
      setSelectedOperator(oper);
    }
  };

  const handleMapClick = (e: any) => {
    const coords = e.get("coords");
    setAddress([{ L1: coords[0], L2: coords[1] }]);
    console.log(address);
  };

  const totalPrice =
    addProdList.reduce((total, prod) => {
      const priceNum = parseFloat(prod.price.toString().replace(/,/g, ""));
      const delivNarx = delNarx ? delNarx : 0;
      return total + priceNum;
    }, 0) + (delNarx || 0);

  const handleFinish = async (values: {
    mijoz_id: number;
    filial_id: number;
    payment_method: string;
    address: string;
  }) => {
    const selectedClient = mijoz.find(
      (client) => client.id === values.mijoz_id
    );
    const selectedFilial = filial.find((f) => f.id === values.filial_id);
    const selectedOperator = hodim.find(
      (item) => item.id === selectedFilial?.operatorId || ""
    );

    setSelectedClient(selectedClient || null);
    setSelectedOperator(selectedOperator || null);
    const delivPrice =
      delivery
        .filter((item) => item.filialId === selectedFilial?.id)
        .map((item) => item.narxi)[0] || 0;

    const totalPrice =
      addProdList.reduce((total, prod) => {
        const priceNum = parseFloat(prod.price.toString().replace(/,/g, ""));

        const delivNarx = delNarx ? delNarx : 0;
        return total + priceNum;
      }, 0) + delivPrice;

    if (!selectedClient || addProdList.length === 0 || !address) {
      message.warning("Barcha kerakli maydonlarni toʻldiring.");
      return;
    }
    const orderData = {
      order_id: (orderNumber || 0) + 1,
      totalPrice: totalPrice.toString(),
      address: values.address,
      order_time: new Date().toLocaleTimeString(),
      order_day: new Date().toLocaleDateString("en-GB"),
      status: "yangi",
      order_details: {
        order_amount: totalProductP,
        delivery_amount: delNarx,
        total_amount: totalPrice.toString(),
        payment_method: values.payment_method,
      },
      filial_id: values.filial_id,
      mijoz_id: values.mijoz_id,
      phone: selectedClient?.phone || "",
      operator: selectedOperator
        ? `${selectedOperator.fistN} ${selectedOperator.lastN} ${selectedOperator.thName}`
        : "",
      quantity: quantityProd,
      ordersCount: addProdList.length,
    };

    try {
      const resp = await axios.post(
        "https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma",
        orderData
      );

      const newOrderId = resp.data.id;

      await axios.patch(
        `https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma/${newOrderId}`,
        { order_id: newOrderId }
      );

      setBuyurtma((prevOrders) => [...prevOrders, resp.data]);

      setOpen(false);
      form.resetFields();
      setSelectedClient(null);
      setSelectedOperator(null);
      setAddress([]);
      setAddProdList([]);
    } catch (error) {
      console.log("Error submitting order:", error);
    }
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open]);
  const getFilial = (id: number) => {
    const fil = filial.find((f) => f.id === id);
    return fil ? fil.nameUz : "-";
  };
  const getHodim = (filialId: number) => {
    if (selectedFilial) {
      const employee = hodim.find((h) => h.id === selectedFilial.operatorId);
      console.log(employee);

      return employee
        ? `${employee.fistN} ${employee.lastN} ${employee.thName}`
        : "Hodim topilmadi";
    }

    return "filial topilmadi";
  };
  const getOperatorForOrder = (filialId: number) => {
    const bran = filial.find((f) => f.id === filialId);

    if (bran) {
      const operator = hodim.find((h) => h.id === bran.operatorId);
      return operator
        ? `${operator.fistN} ${operator.lastN} ${operator.thName}`
        : "Operator topilmadi";
    }

    return "Filial topilmadi";
  };

  const narxDelivery = (id: number) => {
    const branch = filial.find((f) => f.id === id);
    if (branch) {
      const deliveryI = delivery.find((d) => d.filialId === branch.id);
      return deliveryI ? deliveryI.narxi : 0;
    }
    return 0;
  };

  useEffect(() => {
    if (selectedFilialId !== null) {
      const branch = filial.find((f) => f.id === selectedFilialId);
      if (branch) {
        const deliveryP = delivery.find((d) => d.filialId === branch.id);
        setDelNarx(deliveryP?.narxi || 0);
      }
    }
  }, [selectedFilialId, delivery, filial]);

  useEffect(() => {
    setOrderNumber(Math.max(...buyurtma.map((p) => p.id)));
  }, [buyurtma]);
  const openOrder = () => {};

  const yangiLength = buyurtma.filter((item) => item.status === "yangi");
  const qabulLength = buyurtma.filter((item) => item.status === "qabul");
  const jonatilganLength = buyurtma.filter(
    (item) => item.status === "jonatilgan"
  );

  const yopilganLength = buyurtma.filter((item) => item.status === "yopilgan");

  const sumTotalStatus = (status: string) => {
    const totalPrice = buyurtma
      .filter((item) => item.status === status)
      .reduce((total: number, item) => {
        return total + Number(item.order_details.total_amount || 0);
      }, 0);
    return totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="">
      <div className="flex bg-white items-center">
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
            Yangi buyurtma qo'shish
          </Typography>
        </div>
        <div
          className={`w-[686px] flex justify-center content-center items-center gap-5 ${
            selectedView === "columns" ? "cursor-not-allowed opacity-50" : ""
          }`}
          // style={{ cursor: selectedView === "row" ? "not-allowed" : "" }}
        >
          <div className="flex items-center">
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              className="flex justify-center custom-tabss"
            >
              <TabPane tab="Yangi" key="yangi" />
              <TabPane tab="Qabul qilingan" key="qabul" />
              <TabPane tab="Jo'natilgan" key="jonatilgan" />
              <TabPane tab="Yopilgan" key="yopilgan" />
            </Tabs>
          </div>
        </div>
        <div className="bg-[#edeff3] rounded-[30px] flex justify-center gap-1 items-center w-[97px] h-[48px]">
          <Button
            onClick={() => setSelectedView("columns")}
            style={{
              backgroundColor: selectedView === "columns" ? "white" : "#edeff3",
              border: "none",
              boxShadow: "none",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              padding: "0px",
            }}
          >
            <GoColumns />
          </Button>
          <Button
            onClick={() => setSelectedView("rows")}
            style={{
              backgroundColor: selectedView === "rows" ? "white" : "#edeff3",
              border: "none",
              boxShadow: "none",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              padding: "0px",
            }}
          >
            <PiRowsThin />
          </Button>
        </div>
        <Drawer
          title="Basic Drawer"
          onClose={onClose}
          open={open}
          style={{}}
          width={"1000px"}
        >
          <div className="flex gap-10">
            <div className="flex gap-5 flex-col">
              <div className="mb-4">
                <Typography
                  style={{
                    fontSize: "18px",
                    color: "#2D3A45",
                    lineHeight: "18px",
                    fontWeight: 600,
                  }}
                >
                  Yangi buturtma qo'shish
                </Typography>
              </div>
              <div className="">
                <Tabs className="custom-tabs">
                  {kategoriya.map((category) => (
                    <TabPane
                      style={{
                        width: "490px",
                      }}
                      tab={category.nameUz}
                      key={category.id}
                    >
                      <div className="flex flex-wrap justify-between">
                        {products
                          .filter((prod) => prod.type === category.id)
                          .map((item) => {
                            const productInList = addProdList.find(
                              (prod) => prod.id === item.id
                            );

                            return (
                              <div
                                key={item.id}
                                className="w-[235px] h-[210px] rounded-[10px] shadow-lg bg-[white] mt-5"
                              >
                                <img
                                  className="w-[235px] h-[100px] object-cover rounded-t-[10px]"
                                  src={item.img}
                                  alt=""
                                />
                                <div className="p-3 flex justify-between flex-col h-[110px] ">
                                  <div>
                                    <Typography style={{ fontSize: "18px" }}>
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      style={{
                                        color: "#8d8e90",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {item.desc}
                                    </Typography>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <PriceComponent
                                        price={String(item.price)}
                                      />
                                    </div>

                                    {productInList ? (
                                      <div className="flex gap-2">
                                        <Button
                                          onClick={() =>
                                            decrementQuantity(item.id)
                                          }
                                        >
                                          -
                                        </Button>
                                        <Typography>
                                          {productInList.quantity}
                                        </Typography>
                                        <Button
                                          onClick={() =>
                                            incrementQuantity(item.id)
                                          }
                                        >
                                          +
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button
                                        style={{
                                          backgroundColor: "#20D472",
                                          color: "white",
                                          border: "none",
                                        }}
                                        icon={<GoPlus />}
                                        onClick={() => addProductToList(item)}
                                      >
                                        Qo'shish
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </div>
            <div className="flex gap-5 flex-col">
              <div className="flex justify-between">
                <Typography
                  style={{
                    fontSize: "18px",
                    color: "#2D3A45",
                    lineHeight: "18px",
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Buyurtma ro'yxati
                </Typography>
                <Button
                  style={{
                    border: "none",
                    borderRadius: "50%",
                    height: "36px",
                    width: "36px",
                    backgroundColor: "#edeff3",
                  }}
                  icon={<FiTrash2 />}
                  onClick={() => delListProd()}
                />
              </div>
              <div>
                <div className="w-[330px] h-[263px] rounded-md border-2 border-[#edeff3] p-4">
                  {/* order list */}
                  <div className="orderList">
                    {addProdList.map((item, index) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p>{item.name}</p>
                        </div>
                        <div>
                          <PriceComponent price={String(item.price)} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className=" bg-[#edeff3] rounded-md p-3">
                    <Typography style={{ color: "#8d8e90", fontSize: "13px" }}>
                      Umumiy summa
                    </Typography>
                    <Typography style={{ color: "#2D3A45", fontSize: "18px" }}>
                      <PriceComponent price={totalPrice.toLocaleString()} />
                    </Typography>
                  </div>
                </div>
                <Form layout="vertical" form={form} onFinish={handleFinish}>
                  <Form.Item name="mijoz_id" label="Mijoz ismi" required>
                    <Select
                      style={{ width: "330px" }}
                      suffixIcon={<FiUserPlus />}
                      onSelect={(value) => {
                        const client = mijoz.find(
                          (client) => client.id === value
                        );
                        setSelectedClient(client || null); // Update client data when selected
                        form.setFieldsValue({ phone: client?.phone || "" });
                      }}
                    >
                      {mijoz.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {`${item.firstName} ${item.lastName}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Telefon raqam">
                    <Input
                      readOnly
                      value={selectedClient ? selectedClient.phone : ""}
                    />
                  </Form.Item>

                  <Form.Item name="filial_id" label="Filial" required>
                    <Select
                      style={{ width: "330px" }}
                      onSelect={(value) => {
                        const filiall = filial.find((f) => f.id === value);
                        const operator = hodim.find(
                          (item) => item.id === filiall?.operatorId || ""
                        );
                        setSelectedOperator(operator || null); // Update operator data when selected
                        form.setFieldsValue({
                          operator: operator
                            ? `${operator.fistN} ${operator.lastN} ${operator.thName}`
                            : "",
                        });
                      }}
                    >
                      {filial.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.nameUz}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Operator">
                    <Input
                      readOnly
                      value={
                        selectedOperator
                          ? `${selectedOperator.fistN} ${selectedOperator.lastN} ${selectedOperator.thName}`
                          : ""
                      }
                    />
                  </Form.Item>

                  <Form.Item name="payment_method" label="Tolov turi" required>
                    <Select>
                      {tolovTuri.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Manzil" style={{ marginTop: 10 }} required>
                    <Input
                      style={{ marginBottom: 10 }}
                      value={
                        address.length
                          ? `L1: ${address[0].L1}, L2: ${address[0].L2}`
                          : ""
                      }
                      readOnly
                    />
                    <YMaps
                      query={{
                        load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon,geocode",
                      }}
                    >
                      <Map
                        defaultState={{
                          center: [41.327169, 69.282666], // Default location
                          zoom: 13,
                        }}
                        onClick={handleMapClick}
                        modules={["geocode"]}
                        style={{ width: "100%", height: "300px" }}
                      >
                        {address.length > 0 && (
                          <Placemark
                            geometry={[address[0].L1, address[0].L2]}
                          />
                        )}
                      </Map>
                    </YMaps>
                  </Form.Item>

                  <Form.Item style={{ marginTop: 15 }}>
                    <Button
                      htmlType="submit"
                      style={{
                        backgroundColor: "#20D472",
                        border: "none",
                        marginTop: "20px",
                        color: "white",
                      }}
                    >
                      Saqlash
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
      <div
        className={`flex justify-center items-center content-center h-[630px] flex-col py-3 ${
          selectedView === "columns" ? "flex-row" : ""
        }`}
      >
        <div className="cont1">
          {filteredOrders.map((order) => {
            const client = getClient(order.mijoz_id);
            return (
              <div key={order.id}>
                {selectedView === "rows" && (
                  <div>
                    <div
                      onClick={openOrder}
                      key={order.id}
                      className="flex bg-white mt-6 w-[1200px] h-[150px] rounded-md shadow-lg"
                    >
                      <div className="flex flex-col  px-4 py-4 justify-center gap-4 w-[200px] items-center ">
                        <div className="flex gap-3">
                          <div className=" border-b-2 border-[#edeff3]">
                            <div className=" flex justify-center items-center content-center mb-4">
                              <Typography
                                style={{
                                  color: "white",
                                  fontSize: "20px",
                                  backgroundColor: "#20D472",
                                  borderRadius: "30px",
                                  paddingInline: "20px",
                                  paddingBlock: "5px",
                                }}
                              >
                                {order.order_id}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 items-center content-center">
                          <div>
                            <MdOutlineAccessTime
                              style={{ fontSize: "20px", color: "#8d8e90" }}
                            />
                          </div>
                          <div>
                            <Typography
                              style={{ color: "#2D3A45", fontSize: "20px" }}
                            >
                              {order.order_time}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col border-l-2 border-x-[#edeff3] px-4 py-3 justify-center items-center gap-6 w-[300px] ">
                        <div className="flex gap-3">
                          <div>
                            <FaRegUser
                              style={{
                                fontSize: "20px",
                                color: "#8d8e90",
                                marginTop: "9px",
                              }}
                            />
                          </div>
                          <div>
                            <Typography
                              style={{ color: "#2D3A45", fontSize: "20px" }}
                            >
                              {client.firstName} {client.lastName}
                            </Typography>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div>
                            <FiPhone
                              style={{ fontSize: "20px", color: "#8d8e90" }}
                            />
                          </div>
                          <div>
                            <Typography
                              style={{ color: "#2D3A45", fontSize: "14px" }}
                            >
                              {client.phone}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="flex border-l-2 border-x-[#edeff3]  px-4 py-4 justify-center gap-4  w-[330px] ">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <div>
                                <IoClipboardOutline
                                  style={{ fontSize: "20px", color: "#8d8e90" }}
                                />
                              </div>
                              <div>
                                <Typography
                                  style={{ color: "#2D3A45", fontSize: "14px" }}
                                >
                                  <PriceComponent
                                    price={order.order_details.order_amount}
                                  />
                                </Typography>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div>
                                <CiDeliveryTruck
                                  style={{ fontSize: "20px", color: "#8d8e90" }}
                                />
                              </div>
                              <div>
                                <Typography
                                  style={{ color: "#2D3A45", fontSize: "14px" }}
                                >
                                  {filial && delivery
                                    ? narxDelivery(order.filial_id)
                                    : "N/A"}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <Typography
                              style={{ color: "#8d8e90", fontSize: "13px" }}
                            >
                              Umumiy summa
                            </Typography>
                            <Typography
                              style={{
                                color: "#2D3A45",
                                fontSize: "20px",
                                fontWeight: "bolder",
                              }}
                            >
                              <PriceComponent
                                price={order.order_details.total_amount}
                              />
                            </Typography>
                          </div>
                        </div>
                        <div className="flex">
                          {getPaymentMethod(order.order_details.payment_method)}
                        </div>
                      </div>
                      <div className="border-l-2 border-x-[#edeff3] flex flex-col  px-4 w-[245px] py-4 gap-6 ">
                        <div>
                          <Typography
                            style={{ color: "#8d8e90", fontSize: "13px" }}
                          >
                            Operator:
                          </Typography>
                          <Typography
                            style={{ color: "#2D3A45", fontWeight: "bolder" }}
                          >
                            {getOperatorForOrder(order.filial_id)}
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            style={{ color: "#8d8e90", fontSize: "13px" }}
                          >
                            Filial:
                          </Typography>
                          <Typography
                            style={{ color: "#2D3A45", fontWeight: "bolder" }}
                          >
                            {getFilial(order.filial_id)}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex flex-col relative left-[100px] gap-3 justify-center ">
                          <div
                            onClick={() => orderStatus(order, "backward")}
                            className={`w-[50px] h-[50px] bg-[#edeff3] rounded-full flex justify-center content-center items-center cursor-pointer ${
                              order.status === "yangi"
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }`}
                            style={{
                              pointerEvents:
                                order.status === "yangi" ? "none" : "auto",
                            }}
                          >
                            <div className="w-[40px] h-[40px] bg-white rounded-full  flex justify-center content-center items-center">
                              <TbX style={{ fontSize: "20px" }} />
                            </div>
                          </div>
                          <div
                            onClick={() => orderStatus(order, "forward")}
                            className={`w-[50px] h-[50px] bg-[#edeff3] rounded-full flex justify-center content-center items-center cursor-pointer ${
                              order.status === "yopilgan"
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }`}
                            style={{
                              pointerEvents:
                                order.status === "yopilgan" ? "none" : "auto",
                            }}
                          >
                            <div className="w-[40px] h-[40px] bg-white rounded-full  flex justify-center content-center items-center">
                              <IoCheckmark style={{ fontSize: "20px" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedView === "columns" && (
          <div className="flex gap-4 mt-4">
            <div className="">
              <div className="flex titleOrder my-4 items-center gap-3 px-[15px]">
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "grey",
                    fontWeight: 600,
                  }}
                >
                  Yangi
                </Typography>
                <div className=" px-3 py-1 bg-white rounded-md">
                  <Typography.Text>{yangiLength.length}</Typography.Text>
                </div>
              </div>
              <div className="px-4 py-2 my-2 bg-white rounded-md w-[235px] mx-[15px] flex justify-between items-center">
                <span className="w-[14px] h-[14px] rounded-full bg-[#20d472]"></span>
                <Typography
                  style={{
                    color: "#2D3A45",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {sumTotalStatus("yangi")} UZS
                </Typography>
              </div>
              <div className="contLast">
                {buyurtma.filter((b) => b.status === "yangi").length > 0 ? (
                  buyurtma
                    .filter((f) => f.status === "yangi")
                    .map((item) => (
                      <div key={item.id}>
                        <CardOrdered
                          key={item.id}
                          orderStatus={orderStatus}
                          getFilial={getFilial}
                          getOperatorForOrder={getOperatorForOrder}
                          getPaymentMethod={getPaymentMethod}
                          filteredOrders={[item]}
                          getClient={getClient}
                          PriceComponent={PriceComponent}
                        />
                      </div>
                    ))
                ) : (
                  <div className="min-w-[245px]">
                    <Typography style={{ color: "grey" }}>
                      Mavjut emas
                    </Typography>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <div className="flex titleOrder my-4 items-center gap-3">
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "grey",
                    fontWeight: 600,
                  }}
                >
                  Qabul
                </Typography>
                <div className=" px-3 py-1 bg-white rounded-md">
                  <Typography.Text>{qabulLength.length}</Typography.Text>
                </div>
              </div>
              <div className="px-4 py-2 my-2 bg-white rounded-md w-[235px]  mx-[15px]  flex justify-between items-center">
                <span className="w-[14px] h-[14px] rounded-full bg-blue-500"></span>
                <Typography
                  style={{
                    color: "#2D3A45",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {sumTotalStatus("qabul")} UZS
                </Typography>
              </div>
              <div className="contLast">
                {buyurtma.filter((b) => b.status === "qabul").length > 0 ? (
                  isLoading ? (
                    <Spin />
                  ) : (
                    buyurtma
                      .filter((f) => f.status === "qabul")
                      .map((item) => (
                        <div key={item.id}>
                          <CardOrdered
                            key={item.id}
                            orderStatus={orderStatus}
                            getFilial={getFilial}
                            getOperatorForOrder={getOperatorForOrder}
                            getPaymentMethod={getPaymentMethod}
                            filteredOrders={[item]}
                            getClient={getClient}
                            PriceComponent={PriceComponent}
                          />
                        </div>
                      ))
                  )
                ) : (
                  <div className="min-w-[245px]">
                    <Typography style={{ color: "grey" }}>
                      Mavjut emas
                    </Typography>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <div className="flex titleOrder my-4  mx-[15px] items-center gap-3 px-[15px]">
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "grey",
                    fontWeight: 600,
                  }}
                >
                  Jonatilgan
                </Typography>
                <div className=" px-3 py-1 bg-white rounded-md">
                  <Typography.Text>{jonatilganLength.length}</Typography.Text>
                </div>
              </div>
              <div className="px-4 py-2 my-2 bg-white rounded-md w-[235px] mx-[15px] flex justify-between items-center">
                <span className="w-[14px] h-[14px] rounded-full bg-[#fcb600]"></span>
                <Typography
                  style={{
                    color: "#2D3A45",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {sumTotalStatus("jonatilgan")} UZS
                </Typography>
              </div>
              <div className="contLast">
                {buyurtma.filter((b) => b.status === "jonatilgan").length >
                0 ? (
                  buyurtma
                    .filter((f) => f.status === "jonatilgan")
                    .map((item) => (
                      <div key={item.id}>
                        <CardOrdered
                          key={item.id}
                          orderStatus={orderStatus}
                          getFilial={getFilial}
                          getOperatorForOrder={getOperatorForOrder}
                          getPaymentMethod={getPaymentMethod}
                          filteredOrders={[item]}
                          getClient={getClient}
                          PriceComponent={PriceComponent}
                        />
                      </div>
                    ))
                ) : (
                  <div className="min-w-[245px]">
                    <Typography style={{ color: "grey" }}>
                      Mavjut emas
                    </Typography>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <div className="flex titleOrder my-4 items-center gap-3 px-[15px]">
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "grey",
                    fontWeight: 600,
                  }}
                >
                  Yopilgan
                </Typography>
                <div className=" px-3 py-1 bg-white rounded-md">
                  <Typography.Text>{yopilganLength.length}</Typography.Text>
                </div>
              </div>
              <div className="px-4 py-2 my-2 bg-white rounded-md w-[235px]  mx-[15px] flex justify-between items-center">
                <span className="w-[14px] h-[14px] rounded-full bg-red-500"></span>
                <Typography
                  style={{
                    color: "#2D3A45",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {sumTotalStatus("yopilgan")} UZS
                </Typography>
              </div>
              <div className="contLast">
                {buyurtma.filter((b) => b.status === "yopilgan").length > 0 ? (
                  buyurtma
                    .filter((f) => f.status === "yopilgan")
                    .map((item) => (
                      <div key={item.id}>
                        <CardOrdered
                          key={item.id}
                          orderStatus={orderStatus}
                          getFilial={getFilial}
                          getOperatorForOrder={getOperatorForOrder}
                          getPaymentMethod={getPaymentMethod}
                          filteredOrders={[item]}
                          getClient={getClient}
                          PriceComponent={PriceComponent}
                        />
                      </div>
                    ))
                ) : (
                  <div className="min-w-[245px]">
                    <Typography style={{ color: "grey" }}>
                      Mavjut emas
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
