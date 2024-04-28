"use client";
import { Logo } from "@/components/icons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CustomerForm,
  LoginForm,
  RegisterForm,
} from "@/components/forms/authforms";
import { AnimatePresence, motion } from "framer-motion";

function LoginBlock() {
  return (
    <>
      <div className="w-1/2">
        <h1 className="text-3xl font-bold">Chào mừng quay trở lại, Enigma</h1>
        {/* <LoginForm /> */}
        <CustomerForm/>
      </div>
    </>
  );
}

function RegisterWrapper() {
  // local storage watcher

  const [stepNumValue, setStepNumValue] = useState(
    window.localStorage.getItem("stepNum"),
  );

  useEffect(() => {
    const handleStorage = () => {
      const newValue = window.localStorage.getItem("stepNum");
      setStepNumValue(newValue);
      console.log("New value:", newValue);
    };

    window.onstorage = () => {
      handleStorage();
    };

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // const RegisterFormStep1 = () => {
  //   return <RegisterForm />;
  // };
  // const RegisterFormStep2 = () => {};

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1.0 }}
          className="flex h-5/6 w-full flex-col items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">
              Chào mừng đến với Enigma Workshop
            </h1>
            <span>placeholder for stepper</span>
          </div>
          <div className="flex w-full flex-col items-center">
            {stepNumValue === "1" ? <CustomerForm /> : <RegisterForm />}
          </div>
          <div></div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function Auth() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [visible, setVisible] = useState(true);
  const visibleToggle = () => {
    window.localStorage.setItem("stepNum", "0");
    window.dispatchEvent(new Event("storage"));
    setVisible(!visible);
    setSelectedTab(1);
  };
  return (
    <div className="flex h-full w-full flex-row place-content-evenly">
      <div className="flex h-full w-1/2 flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-gray-600 text-default-200">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0 }}
            className="flex h-5/6 w-full flex-col items-center justify-between"
          >
            {visible ? <div></div> : null}
            {selectedTab === 0 ? <LoginBlock /> : <RegisterWrapper />}
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
      {/* R */}
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
