import { Logo } from "@/components/icons";
import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@/components/ui/button";
export default function Auth() {
  return (
    <div className="flex h-full w-full flex-row place-content-evenly">
      <div className="flex h-full w-1/2 flex-col place-content-center items-center bg-gradient-to-r from-gray-900 to-gray-600 text-default-200">
        {/* <LoginForm /> */}
        <RegisterWrapper />
      </div>
      <div className="relative h-full w-1/2">
        <img
          src="/img/auth/bg-mecha-1.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 flex h-full w-full flex-col place-content-center items-center bg-gradient-to-r from-gray-600 via-transparent via-80%">
          <Logo size={60} />
          <h1 className="text-5xl font-extrabold text-default-400">
            ENIGMA WORKSHOP
          </h1>
          <p className="text-sm font-medium text-default-200">
            Tưởng tượng thế giới công nghệ ngay trong con mắt của bạn
          </p>
        </div>
      </div>
    </div>
  );
}

const LoginForm = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Chào mừng quay trở lại, Enigma</h1>
      <form
        action="/api/auth/login"
        method="post"
        className="mt-8 w-full max-w-md space-y-6"
      >
        <Input
          type="text"
          label="Tên tài khoản/Email"
          classNames={{
            label: "text-black",
            inputWrapper: "bg-default-400",
            input: "text-sm",
          }}
        />
        <Input
          type="password"
          label="Mật khẩu"
          classNames={{
            label: "text-black",
            inputWrapper: "bg-default-400",
            input: "text-sm",
          }}
        />
        <Button
          size="lg"
          className="h-14 w-full rounded-lg bg-default-700 hover:bg-default-400"
        >
          Đăng nhập
        </Button>
        <div className="w-full text-end">
          Chưa có tài khoản?{" "}
          <Button variant="link" className="ps-0 text-default-200">
            Đăng ký
          </Button>
        </div>
      </form>
    </>
  );
};
const RegisterWrapper = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Chào mừng đến với Enigma Workshop</h1>
      <RegisterFormStep1/>
    </>
  );
};
const RegisterFormStep1 = () => {
  return (
    <>
    <form action="" >

    </form>
    </>
  );
};
