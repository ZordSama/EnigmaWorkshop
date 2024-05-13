"use client";
import { DataTable } from "@/components/datatable/data-table";
import { DataTableColumnHeader } from "@/components/datatable/table-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Employee } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  async function getEmployees() {
    const resp = await axios.get<Employee[]>(
      siteConfig.api + "Employee/getAll",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
    // {
    //   id: "fullName",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Tên" />
    //   ),
    //   cell: ({ row }) => (
    //     <span>
    //       {row.original.firstName} {row.original.lastName}
    //     </span>
    //   ),
    // },
    {
      accessorKey: "doB",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày sinh" />
      ),
      meta: {
        title: "Ngày sinh",
      },
      cell: ({ row }) => (
        <div>{new Date(row.original.doB).toLocaleDateString("vi")}</div>
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
            <div>{new Date(row.original.optIn).toLocaleDateString("vi")}</div>
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
            <div>{new Date(row.original.optOut).toLocaleDateString("vi")}</div>
          ) : (
            "Chưa thôi việc"
          )}
        </>
      ),
    },
    {
      id: "Actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant={"outline"} size={"icon"}></Button>
        </div>
      )
    }
  ];
  return (
    <div className="flex h-full w-full flex-col">
      <div className="text-xl font-bold">Quản lý nhân viên</div>
      <hr className="my-1" />
      <DataTable columns={employeeColumn} data={employees} meta={{api: siteConfig.api+"Employee"}}/>
    </div>
  );
}
