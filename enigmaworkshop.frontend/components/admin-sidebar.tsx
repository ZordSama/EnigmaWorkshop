"use client";
import Link from "next/link";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const SidebarItems = [
  {
    title: "Tổng quan",
    href: "/dashboard",
    icon: Icons.dashboard,
    authorize: [0, 1, 2],
  },
  {
    title: "Bán hàng",
    href: "/dashboard/sales",
    icon: Icons.cart,
    authorize: [0, 1, 2],
  },
  {
    title: "Orders/Shipments",
    href: "/dashboard/orders",
    icon: Icons.shipments,
    authorize: [0, 1, 2],
  },
  {
    title: "Quản lý nhân viên",
    href: "/dashboard/employees",
    icon: Icons.employees,
    authorize: [0, 1, 2],
  },
  {
    title: "Quản lý kho hàng",
    href: "/dashboard/inventory",
    icon: Icons.inventory,
    authorize: [0, 1, 2],
  }
];
export const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="hidden h-screen w-64 border-r border-gray-700 bg-background pt-16 sm:flex">
      <nav className="flex w-full flex-col items-start space-y-2 px-4 pt-5">
        {SidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex h-12 w-full items-center space-x-2 rounded-md bg-opacity-45 px-3 font-medium transition-all duration-200 hover:translate-x-1 hover:text-white hover:bg-opacity-45",
                pathname === item.href
                  ? "-translate-x-1 bg-indigo-400 text-white"
                  : "bgop hover:bg-slate-600",
              )}
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
