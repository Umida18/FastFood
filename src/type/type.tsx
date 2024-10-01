export interface Payment {
  order_amount: string;
  delivery_amount: string;
  total_amount: string;
  payment_method: number;
}

export interface Order {
  id: number;
  order_id: number;
  order_time: string;
  order_day: string;
  filial_id: number;
  status: string;
  order_details: Payment;
  mijoz_id: number;
}
export interface PaymentM {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  MainKateg: number;
  nameUz: string;
  nameRu: string;
}

export interface Product {
  id: number;
  name: string;
  type: number;
  desc: string;
  img: string;
  price: number;
  quantity: number;
  originalPrice: number;
  isProductAdded: boolean;
}

export interface Mijoz {
  id: number;
  firstName: string;
  lastName: string;
  ordersC: number;
  status: string;
  phone: string;
}

export interface Branch {
  id: number;
  nameUz: string;
  nameRu: string;
  location: string;
  operatorId: number;
  telefon: string;
  hours: string;
  geometry: [number, number];
}
export interface Hodimlarr {
  id: number;
  fistN: string;
  lastN: string;
  thName: string;
  phone: string;
  lavozim: string;
  filialId: number;
}
export interface Addres {
  L1: number | string;
  L2: number | string;
}

export interface Delivey {
  id: number;
  filialId: number;
  narxi: number;
  minimalNarx: string;
}
export interface SelecCat {
  [key: string]: string[];
}
export interface Geom {
  0: number;
  1: number;
}
export interface Filial {
  id: number;
  nameUz: string;
  nameRu: string;
  location: string;
  geometry: Geom;
  operator: string;
  telefon: string;
  hours: string;
}

export interface Narx {
  id: number;
  filialId: number;
  narxi: number;
  minimalNarx: string;
}
