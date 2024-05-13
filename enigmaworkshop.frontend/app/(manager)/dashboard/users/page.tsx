"use client";

import { siteConfig } from "@/config/site";
import { Customer, Employee, User } from "@/types";
import axios from "axios";
import { useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  async function getUsers() {
    const resp = await axios.get(siteConfig.api + "");
  }
}
