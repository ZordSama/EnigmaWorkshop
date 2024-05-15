import {
  CheckIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
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

export type Person = {
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
  role: 0 | 1 | 2 | 3;
  status: 0 | 1 | 2;
};

export type Produtct = {
  id: string;
  name: string;
  des: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  data?: {};
};

export type Category = {
  id: string;
  name: string;
};

export type UserFieldValid = {
  username: boolean;
  password: boolean;
  role: boolean;
  status: boolean;
};

export type ProductFieldValid = {
  name: boolean;
  des: boolean;
  price: boolean;
  stock: boolean;
  category: boolean;
};

export type ValidateObject = {
  isValid: boolean;
  message?: string;
};

export const roles = {
  0: "Quản trị viên",
  1: "Quản lý",
  2: "Nhân viên",
  3: "Khách hàng",
};

export const accStatus = {
  0: "Bình thường",
  1: "Cảnh báo",
  2: "Khóa",
};

export const orderStatus = {
  0: "Chờ xác nhận",
  1: "Đang giao hàng",
  2: "Đã hoàn thành",
  3: "Đã hủy",
};

export type ChipColours =
  | "danger"
  | "secondary"
  | "primary"
  | "success"
  | "default"
  | "warning"
  | undefined;

export const roleChip = {
  0: "danger" as ChipColours,
  1: "secondary" as ChipColours,
  2: "primary" as ChipColours,
  3: "success" as ChipColours,
};

export const accStatusChip = {
  0: { colour: "success" as ChipColours, icon: CheckIcon },
  1: { colour: "warning" as ChipColours, icon: ExclamationTriangleIcon },
  2: { colour: "danger" as ChipColours, icon: LockClosedIcon },
};
