"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SimilarProduct from "./_components/SimilarProduct";
import { ChevronLeftIcon } from "lucide-react";
import AddToCartBtn from "@/app/_components/AddToCartBtn";

function ProductDetail() {
  const { productId } = useParams();
  const router = useRouter(); // Use Next.js useRouter hook
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const GetProductDetail = async () => {
      try {
        const result = await axios.get("/api/products?id=" + productId);
        setProduct(result.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      GetProductDetail();
    }
  }, [productId]);

  return (
    product && (
      <div className="mt-10">
        <button
          onClick={() => router.back()} // Go back to the previous page
          className="flex items-center gap-2 text-yellow-600 font-bold hover:underline"
        >
          <ChevronLeftIcon className="inline-block font-bold " />
          BACK
        </button>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 mt-6">
          <div>
            <Card className="flex max-h-[400px] items-center justify-center">
              <Image
                className="h-[400px] w-full object-contain"
                src={product?.imageUrl}
                alt={"image"}
                width={400}
                height={400}
              />
            </Card>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-bold text-2xl">{product?.title}</h2>
              <Badge className={"text-black"}>{product?.category}</Badge>
            </div>
            <h2 className="font-bold text-3xl text-yellow-600">
              ₹ {product?.price}
            </h2>
            <p className="text-gray-500">
              The {product?.category} will be sent to your registered email ID
              once you purchase this digital content.
            </p>
           
            <AddToCartBtn product={product} size="lg" />

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>{product?.description}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>About Product</AccordionTrigger>
                <AccordionContent>{product?.about}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="mt-10">
          <SimilarProduct category={product?.category} />
        </div>
      </div>
    )
  );
}

export default ProductDetail;
