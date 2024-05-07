"use client";

import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState("default");
  const TabTrigger = (props: Tabs.TabsTriggerProps) => {
    return (
      <Tabs.Trigger
        {...props}
        className={cn(
          "h-10 rounded-md px-3 transition-all duration-250 hover:bg-indigo-400 hover:bg-opacity-25",
          props.className,
        )}
      >
        <div
          className={cn(
            "flex h-full items-center px-3",
            activeTab === props.value ? "border-b-1 border-indigo-400 bg" : "",
          )}
        >
          {props.title}
        </div>
      </Tabs.Trigger>
    );
  };
  return (
    <div className="flex h-full w-full flex-col">
      <Tabs.Root
        defaultValue={"default"}
        onValueChange={(value) => setActiveTab(value)}
        className="flex h-full w-full flex-col"
      >
        <Tabs.List className="mb-2 flex flex-row">
          <TabTrigger title="Default" value="default" className="test" />
          <div className="my-auto h-1/2 w-[1px] bg-blue-500"></div>
          <TabTrigger title="Sales" value="sales" className="test" />
        </Tabs.List>
        <Tabs.Content value="default">default</Tabs.Content>
        <Tabs.Content value="sales">sale</Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
