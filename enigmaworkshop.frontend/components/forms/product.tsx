"use client";

import { Produtct } from "@/types";
import { Input } from "@nextui-org/input";
import { useState } from "react";

export function CreateProductForm() {
  const [productData, setProductData] = useState<Produtct>({} as Produtct);
  const [fieldsValid, setFieldsValid] = useState({} as { [key: string]: boolean });
  
  return (
    <form>
        <Input/>
    </form>
  )
}
