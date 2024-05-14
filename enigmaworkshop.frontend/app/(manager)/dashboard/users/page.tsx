"use client";

import { DataTable } from "@/components/datatable/data-table";
import { DataTableColumnHeader } from "@/components/datatable/table-header";
import { siteConfig } from "@/config/site";
import {
  roleChip,
  ChipColours,
  Customer,
  Employee,
  roles,
  User,
  accStatusChip,
  accStatus,
} from "@/types";
import { Button } from "@nextui-org/button";
import { CopyIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateUserForm, UpdateUser } from "@/components/forms/userforms";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function getUsers() {
    await axios
      .get<User[]>(siteConfig.api + "User/getAll", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) setUsers(response.data);
      })
      .catch((error) => {
        toast.error("Lỗi khi lấy dữ liệu!", {
          description: error.response.data.message,
        });
      });
  }
  async function getEmployees() {
    await axios
      .get<Employee>(siteConfig.api + "Employee/getAll", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {});
  }
  async function getCustomers() {
    const resp = await axios.get(siteConfig.api + "Customer/getAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  useEffect(() => {
    getUsers();
  }, []);
  const userColumns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User ID" />
      ),
      cell: ({ row }) => (
        <Tooltip className="w-fit" content={row.original.id}>
          <div className="group flex w-fit items-center gap-1">
            <span className="w-20 truncate rounded-md bg-slate-400 bg-opacity-10 px-2 py-1 group-hover:bg-opacity-60">
              {row.original.id}
            </span>
            <CopyIcon
              className="cursor-pointer opacity-0 group-hover:opacity-100"
              onClick={() => {
                navigator.clipboard.writeText(row.original.id);
                toast("Đã copy vào clipboard!", {
                  description: row.original.id,
                });
              }}
            />
          </div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "username",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên đăng nhập" />
      ),
      cell: ({ row }) => (
        <span className="text-medium font-semibold">
          {row.original.username}
        </span>
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Loại tài khoản" />
      ),
      cell: ({ row }) => {
        const chipColor: ChipColours = roleChip[row.original.role];
        return (
          <Chip color={chipColor} variant="dot">
            {roles[row.original.role]}
          </Chip>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => {
        const chipColor: ChipColours =
          accStatusChip[row.original.status].colour;
        const Icon = accStatusChip[row.original.status].icon;
        return (
          <Chip
            color={chipColor}
            variant="flat"
            className="ps-2"
            startContent={<Icon />}
          >
            {accStatus[row.original.status]}
          </Chip>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        function handleOpen() {
          setEditingUser(row.original as User);
          setIsUpdate(true);
          onOpen();
        }
        return (
          <div className="me-0 ms-auto flex w-fit gap-2">
            <Tooltip content="Chỉnh sửa" className="w-fit">
              <Button
                onClick={() => handleOpen()}
                variant="ghost"
                color="default"
              >
                <Pencil1Icon />
              </Button>
            </Tooltip>
            <Tooltip content="Xóa" className="w-fit">
              <Button variant="ghost" color="danger">
                <TrashIcon />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="text-xl font-bold">Quản lý người dùng</div>
          <Button
            onClick={() => {
              setIsUpdate(false);
              onOpen();
            }}
          >
            Thêm người dùng
          </Button>
        </div>
        <hr className="my-1" />
        <DataTable columns={userColumns} data={users.toReversed()} />
      </div>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cập nhật người dùng {editingUser?.username}
              </ModalHeader>
              <ModalBody>
                {isUpdate ? (
                  <UpdateUser user={editingUser!} />
                ) : (
                  <CreateUserForm />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
