"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Logo } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export const AdminNav = () => {
  return (
    <div className="flex w-full items-center justify-center h-16 border-b border-gray-700 fixed inset-x-0 top-0 bg-background">
      <nav className="w-full px-5 mx-auto flex flex-row items-center justify-between py-2">
        <div>
          <Link href={"/"} className="flex items-center font-semibold">
            <Logo />
            <span>EnigmaWorkshop</span>
          </Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center gap-2 focus-visible:outline-none">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/128?img=3" />
                <AvatarFallback>VA</AvatarFallback>
              </Avatar>
              <span>Username</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};
