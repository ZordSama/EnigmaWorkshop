import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Order = {
  id: string;
  customerName: string;
  address: string;
  status: number;
  total: number;
  data?: {};
};

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  gender: number;
  doB: Date;
  phone: string;
  email: string;
  address: string;
  user: string;
};

export type Customer = Person & {
  rank: number;
  point: number;
};

export type Employee = Person & {
  optIn: Date;
  optOut: Date;
};

export type User = {
  id: string;
  username: string;
  password?: string;
  role: number;
  status: number;
};

export type Produtct = {
  id: string;
  name: string;
  des: string;
  price: number;
  stock: number;
  category: string;
  data?: {};
};

export type Category = {
  id: string;
  name: string;
};
