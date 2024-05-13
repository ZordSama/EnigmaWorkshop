"use client";
import { DataTable } from "@/components/datatable/data-table";
import { DataTableColumnHeader } from "@/components/datatable/table-header";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import { Action } from "@radix-ui/react-toast";
import { ColumnDef } from "@tanstack/react-table";
import { ShoppingCart } from "lucide-react";

export default function OrdersPage() {
  const dummyData = [] as Order[];
  for (let i = 0; i < 20; i++) {
    dummyData.push({
      id: i.toString(),
      customerName: `Name ${i}`,
      address: `address ${i}`,
      status: 1,
      total: i * 10,
    });
  }

  const orderColumns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mã đơn hàng" />
      ),
      meta: {
        title: "Mã đơn hàng",
      },
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên khách hàng" />
      ),
      meta: {
        title: "Tên khách hàng",
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Địa chỉ" />
      ),
      meta: {
        title: "Địa chỉ",
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      meta: {
        title: "Trạng thái",
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tổng tiền" />
      ),
      meta: {
        title: "Tổng tiền",
      },
    },
    {
      id: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button variant={"ghost"} size={"icon"}>
              <ShoppingCart />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="flex h-full w-full flex-col">
      <div className="text-xl font-bold">Đơn đặt hàng</div>
      <hr className="my-1" />
      <DataTable columns={orderColumns} data={dummyData} meta={{}}/>
    </div>
  );
}
