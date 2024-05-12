"use client";
import { DataTable } from "@/components/datatable/data-table";
import { DataTableColumnHeader } from "@/components/datatable/table-header";
import { siteConfig } from "@/config/site";
import { Employee } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  async function getEmployees() {
    const resp = await axios.get<Employee[]>(
      siteConfig.api + "Employee/getEmployees",
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      },
    );
    if (resp.status === 200) setEmployees(resp.data);
    else setEmployees([]);
  }
  
  useEffect(() => {
    getEmployees();
  }, []);

  const employeeColumn: ColumnDef<Employee>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mã nhân viên" />
      ),
      meta: {
        title: "Mã nhân viên",
      },
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Họ" />
      ),
      meta: {
        title: "Họ",
      },
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên" />
      ),
      meta: {
        title: "Tên",
      },
    },
    {
      accessorKey: "doB",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày sinh" />
      ),
      meta: {
        title: "Ngày sinh",
      },
      cell: ({ row }) => (
        <div>{new Date(row.original.doB).toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      meta: {
        title: "Email",
      },
    },
    {
      accessorKey: "optIn",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày vào làm" />
      ),
      meta: {
        title: "Ngày vào làm",
      },
      cell: ({ row }) => (
        <>
          {row.original.optIn !== null ? (
            <div>{new Date(row.original.optIn).toLocaleDateString()}</div>
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      accessorKey: "optOut",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Thôi việc" />
      ),
      meta: {
        title: "Thôi việc",
      },
      cell: ({ row }) => (
        <>
          {row.original.optOut !== null ? (
            <div>{new Date(row.original.optOut).toLocaleDateString()}</div>
          ) : (
            "Chưa thôi việc"
          )}
        </>
      ),
    },
  ];
  return (
    <div className="flex h-full w-full flex-col">
      <div className="text-xl font-bold">Quản lý nhân viên</div>
      <hr className="my-1" />
      <DataTable columns={employeeColumn} data={employees} />
    </div>
  );
}
