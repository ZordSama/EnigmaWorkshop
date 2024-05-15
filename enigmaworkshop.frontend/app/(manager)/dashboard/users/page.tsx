"use client";

import { DataTable } from "@/components/datatable/data-table";
import { DataTableColumnHeader } from "@/components/datatable/table-header";
import { siteConfig } from "@/config/site";
import {
  roleChip,
  ChipColours,
  roles,
  User,
  accStatusChip,
  accStatus,
} from "@/types";
import { Button } from "@nextui-org/button";
import { CopyIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef, Row } from "@tanstack/react-table";
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

import { CreateUserForm, UpdateUser } from "@/components/forms/userforms";
import { Separator } from "@/components/ui/separator";
import { OctagonAlert } from "lucide-react";

export default function UsersPage() {
  const [modalBody, setModalBody] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User>();
  // const [employees, setEmployees] = useState<Employee[]>([]);
  // const [customers, setCustomers] = useState<Customer[]>([]);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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

  const handleClose = () => {
    getUsers();
    onClose();
  };
  // async function getEmployees() {
  //   await axios
  //     .get<Employee>(siteConfig.api + "Employee/getAll", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((response) => {});
  // }
  // async function getCustomers() {
  //   const resp = await axios.get(siteConfig.api + "Customer/getAll", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  // }

  useEffect(() => {
    getUsers();
  }, []);

  const DelConfirm = (row: Row<User>) => {
    return (
      <>
        <div className="flex w-full flex-col items-center justify-center text-center">
          <Separator />
          <div className="mb-1 flex w-full flex-col items-center justify-center text-red-600">
            <span>Tên người dùng: {row.original.username}</span>
            <OctagonAlert size={36} />
            <span>Đây là hành động không thể hoàn tác, chắc chắn xóa?</span>
          </div>
          <Separator />
          <div className="mt-2 flex w-full flex-row justify-center gap-3">
            <Button
              color="danger"
              onClick={() => {
                axios
                  .delete(siteConfig.api + "User/delete/" + row.original.id, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  })
                  .then((resp) => {
                    if (resp.status === 200) {
                      toast("", { description: "Xóa thành công!" });
                      getUsers();
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
        return (
          <div className="me-0 ms-auto flex w-fit gap-2">
            <Tooltip content="Chỉnh sửa" className="w-fit">
              <Button
                onClick={() => {
                  setModalTitle(
                    `Chỉnh sửa người dùng ${row.original.username}`,
                  );
                  setModalBody(
                    <UpdateUser user={row.original} onClose={handleClose} />,
                  );
                  onOpen();
                }}
                variant="ghost"
                color="default"
              >
                <Pencil1Icon />
              </Button>
            </Tooltip>
            <Tooltip content="Xóa" className="w-fit">
              <Button
                variant="ghost"
                color="danger"
                onClick={() => {
                  setModalTitle(`Xóa người dùng ${row.original.username}`);
                  setModalBody(DelConfirm(row));
                  onOpen();
                }}
              >
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
              setModalTitle("Thêm người dùng mới");
              setModalBody(<CreateUserForm onClose={handleClose} />);
              onOpen();
            }}
          >
            Thêm người dùng
          </Button>
        </div>
        <hr className="my-1" />
        <DataTable columns={userColumns} data={users.toReversed()} />
      </div>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleClose}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {modalTitle}
                </ModalHeader>
                <ModalBody>{modalBody}</ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
