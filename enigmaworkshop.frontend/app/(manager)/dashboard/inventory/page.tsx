"use client";
import { Category, Produtct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/table-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable/data-table";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { CopyIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

export default function InventoryPage() {
  const { toast } = useToast();

  const [products, setProducts] = useState<Produtct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  async function getProducts() {
    const resp = await axios.get<Produtct[]>(siteConfig.api + "Product/getAll");
    if (resp.status === 200) setProducts(resp.data);
  }
  async function getCategories() {
    const resp = await axios.get<Category[]>(
      siteConfig.api + "Product/getCategories",
    );
    if (resp.status === 200) setCategories(resp.data);
  }
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const InventoryColumns: ColumnDef<Produtct>[] = [
    {
      accessorKey: "id",
      // id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mã sản phẩm" />
      ),
      cell: ({ row }) => (
        <div className="group flex w-fit items-center gap-1 ">
          <span className="rounded-md bg-slate-500 bg-opacity-20 px-2 py-1 group-hover:bg-opacity-70">
            {row.getValue("id")}
          </span>
          <CopyIcon
            className="cursor-pointer opacity-0 group-hover:opacity-100"
            onClick={() => {
              navigator.clipboard.writeText(row.getValue("id"));
              toast({ title: "Copied to clipboard!" });
            }}
          />
        </div>
      ),
      meta: {
        title: "Mã sản phẩm",
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên sản phẩm" />
      ),
      meta: {
        title: "Tên sản phẩm",
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phân loại" />
      ),
      meta: {
        title: "Phân loại",
      },
      cell: ({ row }) => (
        <Badge>
          {categories.find((c) => c.id === row.getValue("category"))?.name}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giá" />
      ),
      meta: {
        title: "Giá",
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tồn kho" />
      ),
      cell: ({ row }) => <Badge>{row.getValue("stock")}</Badge>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="me-0 ms-auto grid h-12 w-36 grid-cols-3 gap-1">
          <Button variant={"outline"} size={"icon"}>
            <InfoCircledIcon />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <InfoCircledIcon />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <InfoCircledIcon />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="flex h-full w-full flex-col">
      <div className="text-xl font-bold">Quản lý kho hàng</div>
      <hr className="my-1" />
      <DataTable
        columns={InventoryColumns}
        data={products}
        meta={{ api: siteConfig + "Product" }}
      />
    </div>
  );
}
