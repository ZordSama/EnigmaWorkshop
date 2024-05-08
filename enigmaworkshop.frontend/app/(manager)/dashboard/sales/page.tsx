"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";

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
        <span>{props.order_id}</span>
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
          <TabTrigger title={"Default"} value={"default"} />
          {tabs.map(({ order_id }) => (
            <div key={order_id} className="flex flex-row">
              <div className="my-auto h-1/2 w-[1px] bg-blue-500"></div>
              <TabTrigger title={"tab" + order_id} value={order_id} />
            </div>
          ))}
        </Tabs.List>
        <Tabs.Content
          value="default"
          className={activeTab === "default" ? "flex grow flex-col" : ""}
        >
          <Button
            onClick={() =>
              setTabs((tabs) => [
                ...tabs,
                { order_id: Math.random().toString() },
              ])
            }
          >
            test
          </Button>
        </Tabs.Content>
        {tabs.map(({ order_id }) => (
          <SaleTab key={order_id} order_id={order_id} value={order_id} />
        ))}
      </Tabs.Root>
    </div>
  );
}
