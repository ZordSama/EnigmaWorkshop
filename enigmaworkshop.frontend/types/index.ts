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
  optIn:Date;
  optOut:Date;
}