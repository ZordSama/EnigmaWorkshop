"use client";

import { siteConfig } from "@/config/site";
import { Category, Produtct } from "@/types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Produtct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  async function getProducts() {
    await axios.get(`${siteConfig.api}Product/getAll`).then((res) => {
      setProducts(res.data);
    });
  }
  async function getCategories() {
    await axios
      .get(`${siteConfig.api}Product/getCategories`)
      .then((res) => setCategories(res.data));
  }
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  console.log(products);
  return (
    <main className="max-w-8xl container mx-auto flex-grow px-6 pt-16">
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="grid w-full grid-cols-4 gap-2">
          {products.map((product) => (
            <div key={product.id} className="">
              <Card isFooterBlurred className="h-[300px]">
                <CardHeader className="absolute top-1 z-10 flex-col items-start">
                  <p className="text-tiny font-bold uppercase text-white/60">
                    {
                      categories.find(
                        (category) => category.id === product.category,
                      )?.name
                    }
                  </p>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 h-full w-full object-cover"
                  src={JSON.parse(product.images.toString())[0]}
                />
                <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-black/40 dark:border-default-100">
                  <div className="flex flex-grow items-center gap-2">
                    <div className="flex flex-col">
                      <h4 className="text-xl font-medium text-white/90">
                        {product.name}
                      </h4>
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </span>
                    </div>
                  </div>
                  <Button radius="full" size="sm">
                    Mua ngay
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
