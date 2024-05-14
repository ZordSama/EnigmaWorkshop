"use client";
import { Category, Produtct } from "@/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTableColumnHeader } from "@/components/datatable/table-header";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/datatable/data-table";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { CopyIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { OctagonAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function InventoryPage() {
  const [modalBody, setModalBody] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");

  const [products, setProducts] = useState<Produtct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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
  const DelConfirm = (row: Row<Produtct>) => {
    return (
      <>
        <div className="flex w-full flex-col items-center justify-center text-center">
          <Separator />
          <div className="mb-1 flex w-full flex-col items-center justify-center text-red-600">
            <span>Mã sản phẩm: {row.original.id}</span>
            <OctagonAlert size={36} />
            <span>Đây là hành động không thể hoàn tác, chắc chắn xóa?</span>
          </div>
          <Separator />
          <div className="mt-2 flex w-full flex-row justify-center gap-3">
            <Button
              color="danger"
              onClick={() => {
                axios
                  .delete(
                    siteConfig.api + "Product/delete/" + row.original.id,
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    },
                  )
                  .then((resp) => {
                    if (resp.status === 200) {
                      toast("", { description: "Xóa thành công!" });
                      getProducts();
                      onClose();
                    }
                  })
                  .catch((error) => {
                    if (error.response.status === 404)
                      toast("Lỗi 404", {
                        description: "Không tìm thấy sản phẩm!",
                      });
                    else
                      toast("lỗi không xác định", {
                        description: error.response.data.toString(),
                      });
                  });
              }}
            >
              Xác nhận
            </Button>
            <Button color="success" onClick={onClose}>
              Huỷ
            </Button>
          </div>
        </div>
      </>
    );
  };
  const InventoryColumns: ColumnDef<Produtct>[] = [
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
              toast("Đã copy vào cliboard", {
                description: row.getValue("id"),
              });
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
        <div className="me-2 ms-auto flex h-12 w-36 flex-row gap-1">
          <Tooltip content="Chỉnh sửa" className="w-fit">
            <Button variant="ghost" color="default">
              <Pencil1Icon />
            </Button>
          </Tooltip>
          <Tooltip content="Xóa" className="w-fit">
            <Button
              variant="ghost"
              color="danger"
              onClick={() => {
                setModalTitle("Bạn có chắc chắn muốn xóa?");
                setModalBody(DelConfirm(row));
                onOpen();
              }}
            >
              <TrashIcon />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="text-xl font-bold">Quản lý kho hàng</div>
        <hr className="my-1" />
        <DataTable columns={InventoryColumns} data={products} />
      </div>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1 py-1 text-center">
                {modalTitle}
              </ModalHeader>
              <ModalBody>{modalBody}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
