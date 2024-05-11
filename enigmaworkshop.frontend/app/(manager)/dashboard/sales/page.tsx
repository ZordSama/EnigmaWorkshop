"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { DataTableColumnHeader } from "@/components/datatable/table-header";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { EyeOpenIcon, Pencil1Icon, ReaderIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types";

interface TabTriggerProps extends Tabs.TabsTriggerProps {}
interface SaleTabProps extends Tabs.TabsContentProps {
  order_id: string;
}
interface ITabObject {
  order_id: string;
}

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState("default");
  const [tabs, setTabs] = useState(() => [] as ITabObject[]);

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
        <DataTableColumnHeader column={column} title="Tên khâch hàng" />
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
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => {
              if (
                tabs.findIndex((tab) => tab.order_id === row.original.id) === -1
              )
                setTabs((tabs) => [...tabs, { order_id: row.original.id }]);

              setActiveTab(row.original.id);
            }}
          >
            <EyeOpenIcon />
          </Button>
        );
      },
    },
  ];

  const TabTrigger = (props: TabTriggerProps) => {
    const isActive = activeTab === props.value;
    const isDefault = props.value === "default";
    const CloseIcon = Icons.x;
    return (
      <div
        className={cn(
          "flex h-10 flex-row items-center rounded-md px-3 transition-all duration-250 hover:bg-indigo-400 hover:bg-opacity-25",
          props.className,
          !isActive && "opacity-65 hover:opacity-100",
        )}
      >
        <Tabs.Trigger
          {...props}
          className={cn(
            "flex h-full items-center px-3",
            isActive ? "border-b-1 border-indigo-400 text-white" : "z-0",
          )}
        >
          {props.title}
        </Tabs.Trigger>
        {!isDefault && (
          <CloseIcon
            onClick={() => {
              setTabs(tabs.filter((tab) => tab.order_id !== props.value));
              setActiveTab("default");
            }}
            size={14}
            className="z-50 rounded-full hover:bg-red-500 hover:bg-opacity-45"
          />
        )}
      </div>
    );
  };

  const SaleTab = (props: SaleTabProps) => {
    const isActive = activeTab === props.value;
    return (
      <Tabs.Content
        {...props}
        className={cn(isActive && "flex grow flex-col", props.className)}
      >
        <div className="flex h-full w-full flex-col p-4">
          <span className="text-4xl font-bold">Thông tin đơn hàng </span>
          <div className="flex flex-row gap-2 p-2">
            <Card className="w-2/5">
              <CardHeader>
                <CardTitle>Thông tin Giao hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex grow flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <span>Khách Hàng:</span>
                    <span>Nguyễn Văn A</span>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between">
                    <span>Email:</span>
                    <span>ngvana.123@example.com</span>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between">
                    <span>Số điện thoại:</span>
                    <span>19001008</span>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 justify-between gap-3">
                    <div className="font-semibold">Địa chỉ giao hàng:</div>
                    <address className="text-end not-italic">
                      Số 4 Ngõ 6 Đường A, Phường B, Thành Phố C, Tỉnh
                      E4ewqeqwdasdwqdasdaw asdasdw asd awd asd ẳdfad
                    </address>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between">
                    <span>Trạng thái thanh toán:</span>
                    <span>Đã thanh toán, Trace: 23ksjd12da</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-3/5">
              <CardHeader>
                <CardTitle>Chi tiết đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-12 gap-3">
                    <div className=""></div>
                    <div className="col-span-4 flex place-content-center items-center">
                      <span>Tên mặt hàng</span>
                    </div>
                    <div className="col-span-2 flex place-content-center items-center">
                      <span>Đơn giá</span>
                    </div>
                    <div className="flex place-content-center items-center">
                      <span>Số lượng</span>
                    </div>
                    <div className="col-span-3 flex place-content-center items-center">
                      <span>Thành tiền</span>
                    </div>
                    <div className="flex items-center"></div>
                  </div>
                  <hr />
                  <div className="grid grid-cols-12 gap-3">
                    <div className="">
                      <img
                        src="https://i.imgur.com/V0QJ4x9.jpeg"
                        alt="Product Image"
                        className="h-16 w-16"
                      />
                    </div>
                    <div className="col-span-4 flex place-content-center items-center">
                      <span>Nvidia RTX 4090 OC GIGABYTE</span>
                    </div>
                    <div className="col-span-2 flex place-content-center items-center">
                      <span>12.000.000 VNĐ</span>
                    </div>
                    <div className="flex place-content-center items-center">
                      <span>
                        10{" "}
                        <Button variant={"outline"} size={"icon"}>
                          <Pencil1Icon />
                        </Button>
                      </span>
                    </div>
                    <div className="col-span-3 flex place-content-center items-center">
                      <span>120.000.000 VNĐ</span>
                    </div>
                    <div className="flex items-center">
                      <Button variant={"outline"} size={"icon"}>
                        <ReaderIcon />
                      </Button>
                    </div>
                  </div>
                  <Separator className="last:hidden" />
                  <div className="grid grid-cols-12 gap-3">
                    <div className="">
                      <img
                        src="https://i.imgur.com/V0QJ4x9.jpeg"
                        alt="Product Image"
                        className="h-16 w-16"
                      />
                    </div>
                    <div className="col-span-4 flex place-content-center items-center">
                      <span>Nvidia RTX 4090 OC GIGABYTE</span>
                    </div>
                    <div className="col-span-2 flex place-content-center items-center">
                      <span>12.000.000 VNĐ</span>
                    </div>
                    <div className="flex place-content-center items-center">
                      <span>
                        10{" "}
                        <Button variant={"outline"} size={"icon"}>
                          <Pencil1Icon />
                        </Button>
                      </span>
                    </div>
                    <div className="col-span-3 flex place-content-center items-center">
                      <span>120.000.000 VNĐ</span>
                    </div>
                    <div className="flex items-center">
                      <Button variant={"outline"} size={"icon"}>
                        <ReaderIcon />
                      </Button>
                    </div>
                  </div>
                  <Separator className="last:hidden" />
                  <div className="grid grid-cols-12 gap-3">
                    <div className="">
                      <img
                        src="https://i.imgur.com/V0QJ4x9.jpeg"
                        alt="Product Image"
                        className="h-16 w-16"
                      />
                    </div>
                    <div className="col-span-4 flex place-content-center items-center">
                      <span>Nvidia RTX 4090 OC GIGABYTE</span>
                    </div>
                    <div className="col-span-2 flex place-content-center items-center">
                      <span>12.000.000 VNĐ</span>
                    </div>
                    <div className="flex place-content-center items-center">
                      <span>
                        10{" "}
                        <Button variant={"outline"} size={"icon"}>
                          <Pencil1Icon />
                        </Button>
                      </span>
                    </div>
                    <div className="col-span-3 flex place-content-center items-center">
                      <span>120.000.000 VNĐ</span>
                    </div>
                    <div className="flex items-center">
                      <Button variant={"outline"} size={"icon"}>
                        <ReaderIcon />
                      </Button>
                    </div>
                  </div>
                  <Separator className="last:hidden" />
                  <div className="grid grid-cols-12 gap-3">
                    <div className="">
                      <img
                        src="https://i.imgur.com/V0QJ4x9.jpeg"
                        alt="Product Image"
                        className="h-16 w-16"
                      />
                    </div>
                    <div className="col-span-4 flex place-content-center items-center">
                      <span>Nvidia RTX 4090 OC GIGABYTE</span>
                    </div>
                    <div className="col-span-2 flex place-content-center items-center">
                      <span>12.000.000 VNĐ</span>
                    </div>
                    <div className="flex place-content-center items-center">
                      <span>
                        10{" "}
                        <Button variant={"outline"} size={"icon"}>
                          <Pencil1Icon />
                        </Button>
                      </span>
                    </div>
                    <div className="col-span-3 flex place-content-center items-center">
                      <span>120.000.000 VNĐ</span>
                    </div>
                    <div className="flex items-center">
                      <Button variant={"outline"} size={"icon"}>
                        <ReaderIcon />
                      </Button>
                    </div>
                  </div>
                  {/* <Separator className="last:hidden" /> */}
                  <hr />
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-8 flex place-content-start items-center">
                      <span>Khuyến mãi:</span>
                    </div>
                    <div className="col-span-3 flex place-content-center items-center">
                      <span className="text-red-500">-800.000 VNĐ</span>
                    </div>
                    <div>
                      <Button variant={"outline"} size={"icon"}>
                        <ReaderIcon />
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-8 flex place-content-start items-center">
                      <span>Tổng cộng:</span>
                    </div>
                    <div className="col-span-3 flex place-content-center items-center">
                      <span className="text-lg font-bold">
                        8.000.000.000 VNĐ
                      </span>
                    </div>
                    <div>
                      <Button variant={"outline"} size={"icon"}>
                        <ReaderIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex w-full flex-row justify-end gap-3 px-10 mt-2">
            <Button variant={"destructive"}>Từ chối đơn hàng</Button>
            <Button>Xác nhận xuất kho</Button>
          </div>
        </div>
      </Tabs.Content>
    );
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Tabs.Root
        defaultValue={"default"}
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="flex h-full w-full flex-col"
      >
        <Tabs.List className="mb-2 flex flex-row">
          <TabTrigger title={"Đơn hàng"} value={"default"} />
          {tabs.map(({ order_id }) => (
            <div key={order_id} className="flex flex-row">
              <div className="my-auto h-1/2 w-[1px] bg-blue-500"></div>
              <TabTrigger title={"tab" + order_id} value={order_id} />
            </div>
          ))}
        </Tabs.List>
        <Separator />
        <Tabs.Content
          value="default"
          className={activeTab === "default" ? "flex grow flex-col" : ""}
        >
          <div className="flex h-full w-full flex-row">
            <div className="h-full w-1/2">
              <DataTable columns={orderColumns} data={dummyData} />
            </div>
            <div></div>
          </div>
        </Tabs.Content>
        {tabs.map(({ order_id }) => (
          <SaleTab key={order_id} order_id={order_id} value={order_id} />
        ))}
      </Tabs.Root>
    </div>
  );
}
