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

// Interfaces
interface Payment {
  order_amount: string;
  delivery_amount: string;
  total_amount: string;
  payment_method: number;
}

interface Order {
  id: number;
  order_id: number;
  order_time: string;
  order_day: string;
  filial_id: number;
  status: string;
  order_details: Payment;
  mijoz_id: number;
}

interface PaymentM {
  id: number;
  name: string;
}

interface Category {
  id: number;
  MainKateg: number;
  nameUz: string;
  nameRu: string;
}

interface Product {
  id: number;
  name: string;
  type: number;
  price: string;
  desc: string;
  img: string;
}

interface Mijoz {
  id: number;
  firstName: string;
  lastName: string;
  ordersC: number;
  status: string;
  phone: string;
}
interface Branch {
  id: number;
  nameUz: string;
  nameRu: string;
  location: string;
  operatorId: number;
  telefon: string;
  hours: string;
  geometry: [];
}
interface Hodimlar {
  id: number;
  fistN: string;
  lastN: string;
  thName: string;
  phone: string;
  lavozim: string;
  filialId: number;
}
interface Addres {
  L1: number | string;
  L2: number | string;
}

interface Delivey {
  id: number;
  filialId: number;
  narxi: number;
  minimalNarx: string;
}

export const Buyurtmalar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [buyurtma, setBuyurtma] = useState<Order[]>([]);
  const [tolovTuri, setTolovTuri] = useState<PaymentM[]>([]);
  const [kategoriya, setKategoriya] = useState<Category[]>([]);
  const [products, setProducts] = useState<(Product & { quantity: number })[]>(
    []
  );
  const [mijoz, setMijoz] = useState<Mijoz[]>([]);
  const [activeTab, setActiveTab] = useState<string>("yangi");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedView, setSelectedView] = useState<string>("columns");
  const [openSelMijoz, setOpenSelMijoz] = useState<boolean>(false);
  const [addProdList, setAddProdList] = useState<
    (Product & { quantity: number })[]
  >([]);
  const [selectedClient, setSelectedClient] = useState<Mijoz | null>(null);
  const [address, setAddress] = useState<Addres[]>([]);
  const [filial, setFilial] = useState<Branch[]>([]);
  const [hodim, setHodim] = useState<Hodimlar[]>([]);
  const [selectedFilial, setSelectedFilial] = useState<Branch | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Hodimlar | null>(
    null
  );
  const [delivery, setDelivery] = useState<Delivey[]>([]);
  const [delNarx, setDelNarx] = useState<number>();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseB = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma"
      );
      const responseT = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/paymentMethod"
      );
      const responseCat = await axios.get(
        "https://2f972b43e3dad83a.mokky.dev/kotegoriyalar"
      );
      const responseProducts = await axios.get(
        "https://c1f85b42bbd414e1.mokky.dev/Maxsulotlar"
      );
      const responseMijoz = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/mijoz"
      );
      const responseF = await axios.get(
        "https://3c2999041095f9d9.mokky.dev/filial"
      );
      const responseH = await axios.get(
        "https://10d4bfbc5e3cc2dc.mokky.dev/Hodimlar"
      );
      const responseDelivery = await axios.get(
        "https://3c2999041095f9d9.mokky.dev/delivery"
      );
      setProducts(responseProducts.data);
      setBuyurtma(responseB.data);
      setTolovTuri(responseT.data);
      setKategoriya(responseCat.data);
      setMijoz(responseMijoz.data);
      setFilial(responseF.data);
      setHodim(responseH.data);
      setDelivery(responseDelivery.data);
    };
    fetchData();
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const { Text, Title } = Typography;

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

  const getClient = (clientId: number) => {
    const client = mijoz.find((m) => m.id === clientId);
    if (client) {
      return {
        firstName: client.firstName,
        lastName: client.lastName,
        phone: client.phone,
      };
    }
    return {
      firstName: "Unknown",
      lastName: "",
      phone: "",
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
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (productId: number) => {
    setAddProdList((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decrementQuantity = (productId: number) => {
    setAddProdList((prev) =>
      prev
        .map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };
  const [isProductAdded, setIsProductAdded] = useState(false);

  // const handleAddProduct = () => {
  //   addProductToList(item);
  //   setIsProductAdded(true);
  // };

  const totalPrice = addProdList.reduce((total, prod) => {
    const piceT = prod.price.toString();
    return total + parseFloat(piceT.replace(/,/g, ""));
  }, 0);
  const delListProd = () => {
    setAddProdList([]);
  };

  const handleClientChange = (Id: number) => {
    const client = mijoz.find((m) => m.id === Id);
    setSelectedClient(client ? client : null);
  };

  const handleBranchh = (id: number) => {
    const bran = filial.find((f) => f.id === id);
    setSelectedFilial(bran ? bran : null);

    if (bran) {
      const operator = hodim.find((h) => h.id === bran.operatorId);
      setSelectedOperator(operator ? operator : null);
    }
  };

  const handleMapClick = (e: any) => {
    const coords = e.get("coords");
    setAddress([{ L1: coords[0], L2: coords[1] }]);
    console.log(address);
  };

  const handleSubmit = async () => {
    if (!selectedClient || addProdList.length === 0 || !address) {
      console.log("Please fill in all required fields.");
      return;
    }

    const orderData = {
      order_id: 0,
      // products: addProdList.map((product) => ({
      //   id: product.id,
      //   name: product.name,
      //   price: product.price,
      // })),
      totalPrice: totalPrice.toString(),
      address: address,
      order_time: new Date().toLocaleTimeString(),
      order_day: new Date().toLocaleDateString("en-GB"),
      status: "yangi",
      order_details: {
        order_amount: totalPrice.toString(),
        delivery_amount: "0",
        total_amount: totalPrice.toString(),
        payment_method: 1,
      },
      filial_id: selectedFilial?.id,
      mijoz_id: selectedClient.id,
    };

    try {
      const resp = await axios.post(
        "https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma",
        orderData
      );

      const newOrderId = resp.data.id;

      orderData.order_id = newOrderId;

      await axios.patch(
        `https://10d4bfbc5e3cc2dc.mokky.dev/buyurtma/${newOrderId}`,
        { order_id: newOrderId }
      );

      setBuyurtma((prevOrders) => [...prevOrders, resp.data]);

      setAddProdList([]);
      setSelectedClient(null);
      setSelectedFilial(null);
      setAddress([]);
      setOpen(false);
    } catch (error) {
      console.log("Error submitting order:", error);
    }
  };
  const getFilial = (id: number) => {
    const fil = filial.find((f) => f.id === id);
    return fil ? fil.nameUz : "-";
  };
  const getHodim = (filialId: number) => {
    // const filiaL = filial.find((f) => f.id === filialId);

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

  const narxDelivery = (id: number): string => {
    const branch = filial.find((f) => f.id === id);
    if (branch) {
      const deliveryI = delivery.find((d) => d.filialId === branch.id);
      // setDelNarx(deliveryI?.narxi)
      return deliveryI ? deliveryI.narxi.toString() : "-";
    }
    return "N/A";
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
        <div className="w-[686px] flex justify-center content-center items-center gap-5">
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
                          .map((item) => (
                            <div
                              key={item.id}
                              className="w-[235px] h-[200px] rounded-[10px] shadow-lg bg-[white] mt-5"
                            >
                              <img
                                className="w-[235px] h-[100px] object-cover rounded-t-[10px]"
                                src={item.img}
                                alt=""
                              />
                              <div className="p-3 ">
                                <div>
                                  <Typography>{item.name}</Typography>
                                  <Typography>{item.desc}</Typography>
                                </div>
                                <div className="flex justify-between">
                                  <div>
                                    <PriceComponent price={item.price} />
                                  </div>
                                  <div>
                                    {isProductAdded ? (
                                      <div className="flex gap-2">
                                        <Button
                                          onClick={() =>
                                            decrementQuantity(item.id)
                                          }
                                        >
                                          -
                                        </Button>
                                        <Typography>{item.quantity}</Typography>
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
                            </div>
                          ))}
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
                      <div key={index} className="flex justify-between">
                        <div>
                          <p>{item.name}</p>
                        </div>
                        <div>
                          <PriceComponent price={item.price} />
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
                <Form onFinish={handleSubmit}>
                  <Form.Item>
                    <Typography>Mijoz ismi</Typography>
                    <Select
                      style={{ width: "330px" }}
                      suffixIcon={<FiUserPlus />}
                      onChange={handleClientChange}
                    >
                      {mijoz.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {`${item.firstName} ${item.lastName}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Typography>Telefon raqam</Typography>
                    <Input
                      readOnly
                      value={selectedClient ? selectedClient.phone : ""}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Typography>Filial</Typography>
                    <Select
                      style={{ width: "330px" }}
                      // suffixIcon={<FiUserPlus />}
                      onChange={handleBranchh}
                    >
                      {filial.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.nameUz}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Typography>Operator</Typography>
                    <Input
                      readOnly
                      value={
                        selectedOperator
                          ? `${selectedOperator.fistN} ${selectedOperator.lastN} ${selectedOperator.thName}`
                          : "Operator tanlanmadi"
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <Typography>Manzil</Typography>
                    <Input
                      value={
                        address.length
                          ? `L1: ${address[0].L1}, L2: ${address[0].L2}`
                          : ""
                      }
                      onChange={(e) =>
                        setAddress([
                          {
                            L1: e.target.value.split(",")[0],
                            L2: e.target.value.split(",")[1],
                          },
                        ])
                      }
                    />
                    <YMaps
                      query={{
                        load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon,geocode",
                      }}
                    >
                      <Map
                        defaultState={{
                          center: [41.327169, 69.282666],
                          zoom: 13,
                        }}
                        onClick={handleMapClick}
                        modules={["geocode"]}
                      >
                        {address.map((item: any, index: any) => (
                          <Placemark
                            key={index}
                            geometry={[item.L1, item.L2]}
                          />
                        ))}
                      </Map>
                    </YMaps>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Saqlash
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              {/* <Button>Saqlash</Button> */}
            </div>
          </div>
        </Drawer>
      </div>
      <div className=" flex justify-center items-center content-center flex-col py-3">
        {filteredOrders.map((order) => {
          const client = getClient(order.mijoz_id);
          return (
            <div
              key={order.id}
              className="flex bg-white mt-6 w-[1200px] h-[150px] rounded-md shadow-lg"
            >
              <div className="flex flex-col  px-4 py-4 justify-center gap-4 w-[200px] items-center">
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
                    <Typography style={{ color: "#2D3A45", fontSize: "20px" }}>
                      {order.order_time}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-l-2 border-x-[#edeff3] px-4 py-3 justify-center items-center gap-6 w-[300px]">
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
                    <Typography style={{ color: "#2D3A45", fontSize: "20px" }}>
                      {client.firstName} {client.lastName}
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div>
                    <FiPhone style={{ fontSize: "20px", color: "#8d8e90" }} />
                  </div>
                  <div>
                    <Typography style={{ color: "#2D3A45", fontSize: "14px" }}>
                      {client.phone}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex border-l-2 border-x-[#edeff3]  px-4 py-4 justify-center gap-4  w-[330px]">
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
                          {narxDelivery(order.filial_id)}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <Typography style={{ color: "#8d8e90", fontSize: "13px" }}>
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
              <div className="border-l-2 border-x-[#edeff3] flex flex-col  px-10 py-4 gap-6">
                <div>
                  <Typography style={{ color: "#8d8e90", fontSize: "13px" }}>
                    Operator:
                  </Typography>
                  <Typography
                    style={{ color: "#2D3A45", fontWeight: "bolder" }}
                  >
                    {getOperatorForOrder(order.filial_id)}
                  </Typography>
                </div>
                <div>
                  <Typography style={{ color: "#8d8e90", fontSize: "13px" }}>
                    Filial:
                  </Typography>
                  <Typography
                    style={{ color: "#2D3A45", fontWeight: "bolder" }}
                  >
                    {getFilial(order.filial_id)}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col relative left-[107px] gap-3 justify-center ">
                <div
                  onClick={() => orderStatus(order, "backward")}
                  className={`w-[50px] h-[50px] bg-[#edeff3] rounded-full flex justify-center content-center items-center cursor-pointer ${
                    order.status === "yangi"
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  style={{
                    pointerEvents: order.status === "yangi" ? "none" : "auto",
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
          );
        })}
      </div>
    </div>
  );
};
