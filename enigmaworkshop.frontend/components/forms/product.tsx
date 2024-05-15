"use client";

import { siteConfig } from "@/config/site";
import { Category, Produtct, ValidateObject } from "@/types";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectItem } from "@nextui-org/react";
import { toast } from "sonner";

export function CreateProductForm({ onClose }: { onClose: () => void }) {
  const [productData, setProductData] = useState<Produtct>({} as Produtct);
  const [fieldsValid, setFieldsValid] = useState(
    {} as { [key in keyof Produtct]?: ValidateObject },
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFiles(e.target.files);
    }
  };
  async function handleUpload(): Promise<string[]> {
    let result: string[] = [];
    if (files) {
      setStatus("uploading");

      const formData = new FormData();

      [...files].forEach((file) => {
        formData.append("files", file);
      });

      await axios
        .post(
          `${siteConfig.api}FileUpload/product/${productData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => {
          setStatus("success");
          result = response.data as string[];
        })
        .catch((error) => {
          setStatus("fail");
        });
    }
    return result;
  }

  const handleSubmit = async () => {
    if (Object.values(fieldsValid).every((v) => v.isValid)) {
      productData.images = await handleUpload();
      axios
        .post(`${siteConfig.api}Product/create`, productData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => onClose());
    } else {
      toast(
        Object.values(fieldsValid)
          .map((v) => v.message)
          .join(", "),
      );
    }
  };

  useEffect(() => {
    axios
      .get(`${siteConfig.api}Product/getCategories`)
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <form className="grid grid-cols-2 gap-3">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Mã sản phẩm</Label>
        <Input
          type="text"
          onChange={(e) => {
            setProductData({ ...productData, id: e.target.value });
            setFieldsValid({
              ...fieldsValid,
              id: { isValid: true },
            });
            if (e.target.value.length < 1) {
              setFieldsValid({
                ...fieldsValid,
                id: {
                  isValid: false,
                  message: "Mã sản phẩm không được để trống",
                },
              });
            } else
              axios
                .get(`${siteConfig.api}Product/isExist/${e.target.value}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                })
                .then((resp) => {
                  if (resp.data === true)
                    setFieldsValid({
                      ...fieldsValid,
                      id: { isValid: false, message: "Mã sản phẩm đã tồn tại" },
                    });
                });
          }}
          aria-invalid={!fieldsValid.id?.isValid}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Tên Sản phảm</Label>
        <Input type="text" onChange={(e) => setProductData({ ...productData, name: e.target.value })}/>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Giá thành</Label>
        <Input type="number" onChange={(e) => setProductData({ ...productData, price: +e.target.value })}/>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Số lượng</Label>
        <Input type="number" onChange={(e) => setProductData({ ...productData, stock: +e.target.value })}/>
      </div>
      <div className="col-span-2 grid w-full items-center gap-1.5">
        <Label>Mô tả</Label>
        <Textarea className="w-full" onChange={(e) => setProductData({ ...productData, des: e.target.value })}></Textarea>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Select label="Phân loại" onChange={(e) => setProductData({ ...productData, category: e.target.value })}>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Ảnh</Label>
        <Input type="file" onChange={handleFileChange} multiple />
      </div>
      <Button onClick={handleSubmit} className="col-span-2">
        Xác nhận
      </Button>
    </form>
  );
}
