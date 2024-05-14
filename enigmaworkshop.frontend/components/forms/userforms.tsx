"use client";
import { siteConfig } from "@/config/site";
import { Person, User, UserFieldValid } from "@/types";
import { Input } from "@nextui-org/input";
import { Button, Checkbox, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

export function UpdateUser({
  user,
  onClose,
}: {
  user?: User;
  onClose: () => void;
}) {
  const [userData, setUserData] = useState({ ...user });
  const [userFieldsValid, setUserFieldsValid] = useState<UserFieldValid>({
    username: true,
    password: true,
    role: true,
    status: true,
  });

  const [needNewPass, setNeedNewPass] = useState(false);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      userFieldsValid.username &&
      userFieldsValid.role &&
      userFieldsValid.status
    )
      axios
        .put(
          `${siteConfig.api}User/update`,
          { ...userData },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("Thành công", response.data);
            onClose();
            // setInterval(() => window.location.reload(), 1000);
          }
        })
        .catch((error) => {
          toast.error("Thất bại", error.response.data.message);
        });
    else toast.error("Thông tin không hợp lệ, vui lòng kiểm tra lại!");
  }
  return (
    <form onSubmit={submitHandler} className="grid w-full grid-cols-1 gap-2">
      <Input
        type="text"
        label="Tên người dùng"
        value={userData.username}
        onChange={(e) => {
          setUserData({ ...userData, username: e.target.value });
          /^[A-Za-z0-9_]{6,15}$/.test(e.target.value) === true
            ? setUserFieldsValid({ ...userFieldsValid, username: true })
            : setUserFieldsValid({ ...userFieldsValid, username: false });
        }}
        isInvalid={!userFieldsValid.username}
        errorMessage="Tên người dùng phải chứa 6-15 ký tự chữ và số"
      />
      {needNewPass && (
        <Input
          type="password"
          label="Mật khẩu mới"
          value={userData.password}
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value) ===
            true
              ? setUserFieldsValid({ ...userFieldsValid, password: true })
              : setUserFieldsValid({ ...userFieldsValid, password: false });
          }}
          isInvalid={!userFieldsValid.password}
          errorMessage="Mật khẩu phải có ít nhất 8 kí tự, bao gồm chữ và số"
        />
      )}
      {userData.role! < 3 && (
        <Select
          label="Loại tài khoản"
          value={userData.role?.toString()}
          defaultSelectedKeys={userData.role?.toString()}
          onChange={(e) => {
            setUserData({ ...userData, role: +e.target.value as 0 | 1 | 2 });
          }}
        >
          <SelectItem key={0} value="0">
            Quản trị viên
          </SelectItem>
          <SelectItem key={1} value="1">
            Quản lý
          </SelectItem>
          <SelectItem key={2} value="2">
            Nhân viên
          </SelectItem>
        </Select>
      )}
      <Select
        label="Trạng thái"
        value={userData.status?.toString()}
        defaultSelectedKeys={userData.status?.toString()}
        onChange={(e) => {
          setUserData({ ...userData, status: +e.target.value as 0 | 1 | 2 });
        }}
      >
        <SelectItem key={0} value="0">
          Bình thường
        </SelectItem>
        <SelectItem key={1} value="1">
          Cảnh báo
        </SelectItem>
        <SelectItem key={2} value="2">
          Khóa
        </SelectItem>
      </Select>
      <Button value={"Submit"} type="submit">
        Xác nhận
      </Button>
      <Checkbox
        onChange={(e) => {
          setNeedNewPass(e.target.checked);
          !e.target.checked &&
            setUserData({ ...userData, password: undefined });
        }}
        className="me-1 ms-auto"
      >
        Đặt lại mật khẩu
      </Checkbox>
    </form>
  );
}

export function CreateUserForm({ onClose }: { onClose: () => void }) {
  const [userData, setUserData] = useState<User>({} as User);
  const [personData, setPersonData] = useState<Person>({} as Person);
  const [isCustomer, setIsCustomer] = useState(true);
  const [userFieldsValid, setUserFieldsValid] = useState({
    username: false,
    password: false,
  });
  const [personFieldsValid, setPersonFieldsValid] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    doB: false,
  });
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (userFieldsValid.username && userFieldsValid.password) {
      let data = isCustomer
        ? { user: { ...userData }, customer: { ...personData } }
        : { user: { ...userData }, employee: { ...personData } };
      axios
        .post(`${siteConfig.api}User/create`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) toast.success("Thành công!");
          onClose();
        })
        .catch((error) => {
          toast.error("Thất bại!", { description: error.response.data });
        });
    } else toast.error("Thông tin không hợp lệ, vui lòng kiểm tra lại");
  };
  return (
    <form onSubmit={submitHandler} className="grid w-full grid-cols-2 gap-2">
      <Input
        type="text"
        label="Tên đăng nhập"
        value={userData.username}
        onChange={(e) => {
          setUserData({ ...userData, username: e.target.value });
          /^[A-Za-z0-9_]{6,15}$/.test(e.target.value) === true
            ? setUserFieldsValid({ ...userFieldsValid, username: true })
            : setUserFieldsValid({ ...userFieldsValid, username: false });
        }}
        isInvalid={!userFieldsValid.username}
        errorMessage="Tên đăng nhập phải chứa 6-15 chữ và số"
        required
      />
      <Input
        type="password"
        label="Mật khẩu mới"
        value={userData.password}
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value) === true
            ? setUserFieldsValid({ ...userFieldsValid, password: true })
            : setUserFieldsValid({ ...userFieldsValid, password: false });
        }}
        isInvalid={!userFieldsValid.password}
        errorMessage="Mật khẩu phải có ít nhất 8 kí tự, bao gồm chữ và số"
      />
      <Select
        label="Loại tài khoản"
        value={userData.role?.toString()}
        defaultSelectedKeys={"3"}
        onChange={(e) => {
          setUserData({
            ...userData,
            role: +e.target.value as 0 | 1 | 2 | 3,
          });

          e.target.value !== "3" ? setIsCustomer(false) : setIsCustomer(true);
        }}
      >
        <SelectItem key={0} value="0">
          Quản trị viên
        </SelectItem>
        <SelectItem key={1} value="1">
          Quản lý
        </SelectItem>
        <SelectItem key={2} value="2">
          Nhân viên
        </SelectItem>
        <SelectItem key={3} value="3">
          Khách hàng
        </SelectItem>
      </Select>
      <Select
        label="Trạng thái"
        value={userData.status?.toString()}
        defaultSelectedKeys={"0"}
        onChange={(e) => {
          setUserData({ ...userData, status: +e.target.value as 0 | 1 | 2 });
        }}
      >
        <SelectItem key={0} value="0">
          Bình thường
        </SelectItem>
        <SelectItem key={1} value="1">
          Cảnh báo
        </SelectItem>
        <SelectItem key={2} value="2">
          Khóa
        </SelectItem>
      </Select>
      <Separator className="col-span-2" />

      <span className="col-span-2 mb-2 text-medium font-semibold">
        {isCustomer ? "Thông tin khách hàng" : "Thông tin nhân viên"}
      </span>
      <Input
        type="text"
        label="Họ"
        value={personData.firstName}
        onChange={(e) => {
          setPersonData({ ...personData, firstName: e.target.value });
          e.target.value.length < 1
            ? setPersonFieldsValid({ ...personFieldsValid, firstName: false })
            : setPersonFieldsValid({ ...personFieldsValid, firstName: true });
        }}
        required
        isInvalid={!personFieldsValid.firstName}
        errorMessage="Không được để trống mục này"
      />
      <Input
        label="Tên"
        type="text"
        value={personData.lastName}
        onChange={(e) => {
          setPersonData({ ...personData, lastName: e.target.value });
          e.target.value.length < 1
            ? setPersonFieldsValid({ ...personFieldsValid, lastName: false })
            : setPersonFieldsValid({ ...personFieldsValid, lastName: true });
        }}
        required
        isInvalid={!personFieldsValid.lastName}
        errorMessage="Không được để trống mục này"
      />
      <Select
        label="Giới tính"
        defaultSelectedKeys={"2"}
        // value={personData.gender.toString()}
        onChange={(e) => {
          setPersonData({
            ...personData,
            gender: +e.target.value as 0 | 1 | 2,
          });
        }}
      >
        <SelectItem key={0} value="0">
          Nam
        </SelectItem>
        <SelectItem key={1} value="1">
          Nữ
        </SelectItem>
        <SelectItem key={2} value="2">
          Khác
        </SelectItem>
      </Select>
      <Input
        label="Ngày sinh"
        type="date"
        onChange={(e) => {
          setPersonData({
            ...personData,
            doB: new Date(e.target.value.toString()),
          });
          e.target.value != undefined &&
          2024 - new Date(e.target.value).getFullYear() >= 13
            ? setPersonFieldsValid({ ...personFieldsValid, doB: true })
            : setPersonFieldsValid({ ...personFieldsValid, doB: false });
        }}
        required
        isInvalid={!personFieldsValid.doB}
        errorMessage="Bạn phải từ đủ 13 tuổi để sử dụng hệ thống"
      />
      <Input
        label="Số điện thoại"
        type="tel"
        onChange={(e) => {
          setPersonData({ ...personData, phone: e.target.value });
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(e.target.value)
            ? setPersonFieldsValid({ ...personFieldsValid, phone: true })
            : setPersonFieldsValid({ ...personFieldsValid, phone: false });
        }}
        isInvalid={!personFieldsValid.phone}
        errorMessage="Số điện thoại không hợp lệ"
        required
      />
      <Input
        label="Email"
        type="email"
        onChange={(e) => {
          setPersonData({ ...personData, email: e.target.value });
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(
            e.target.value,
          )
            ? setPersonFieldsValid({ ...personFieldsValid, email: true })
            : setPersonFieldsValid({ ...personFieldsValid, email: false });
        }}
        isInvalid={!personFieldsValid.email}
        errorMessage="Email không hợp lệ"
      />
      <Button value={"Submit"} type="submit" className="col-span-2">
        Xác nhận
      </Button>
    </form>
  );
}
