"use client";

import { DataTable } from "@/components/datatable/data-table";
import { siteConfig } from "@/config/site";
import { Customer, Employee, User } from "@/types";
import { ColumnDefBase } from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  async function getUsers() {
    const roles = {
      0: "Quản trị viên",
      1: "Quản lý",
      2: "Nhân viên",
      3: "Khách hàng",
    };
    const resp = await axios.get(siteConfig.api + "User/getAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  async function getEmployees() {
    const resp = await axios.get(siteConfig.api + "Employee/getAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  async function getCustomers() {
    const resp = await axios.get(siteConfig.api + "Customer/getAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  // const userColumn: ColumnDefBase<User>[] = [
  //   {
      
  //   }
  // ];
  return (
    <div className="flex h-full w-full flex-col">
      <div className="text-xl font-bold">Quản lý người dùng</div>
      <hr className="my-1" />
      {/* <DataTable columns={} */}
    </div>
  );
}
