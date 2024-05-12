"use client";
import { Produtct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export default function InventoryPage() {
  const [products, setProducts] = useState<Produtct[]>([]);
  const InventoryColumns: ColumnDef<Produtct>[] = [
    {
      accessorKey: "id",
      header: "",
      
    },
  ];
}
