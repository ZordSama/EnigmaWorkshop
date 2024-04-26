"use client";
import { Logo } from "@/components/icons";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/forms/authforms";
import { AnimatePresence, motion } from "framer-motion";

const LoginBlock = () => {
  return (
    <>
      <div className="w-1/2">
        <h1 className="text-3xl font-bold">Chào mừng quay trở lại, Enigma</h1>
        <LoginForm />
      </div>
    </>
  );
};
const RegisterWrapper = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">
          Chào mừng đến với Enigma Workshop
        </h1>
        {/* stepper will sit here */}
      </div>
      <div>
        <RegisterFormStep1 />
      </div>
    </>
  );
};
const RegisterFormStep1 = () => {
  return (
    <>
      <form action=""></form>
    </>
  );
};

const tabs = [
  { label: "loginTab", component: LoginBlock },
  { label: "registerTab", component: RegisterWrapper },
];

export default function Auth() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [visible, setVisible] = useState(true);
  const visibleToggle = () => {
    setVisible(false);
    setSelectedTab(tabs[1]);
  };
  return (
    <div className="flex h-full w-full flex-row place-content-evenly">
      <div className="flex h-full w-1/2 flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-gray-600 text-default-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex h-5/6 w-full flex-col justify-between items-center"
          >
            <div></div>
            {selectedTab ? selectedTab.component() : tabs[0].component()}
            {visible ? (
              <div className="mt-3">
                Chưa phải là một <span>Enigma</span>?{" "}
                <Button
                  variant={"link"}
                  onClick={visibleToggle}
                  className="ps-1 text-base text-default"
                >
                  Đăng ký
                </Button>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
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
