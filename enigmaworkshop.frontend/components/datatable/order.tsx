"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./table-header";

export type Order = {
  id: string;
  customerName: string;
  address: string;
  status: number;
  total: number;
};

