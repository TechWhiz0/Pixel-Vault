"use client";
import { Card } from "@/components/ui/card";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { CartContext } from "../_context/CartContext";
import AddToCartBtn from "./AddToCartBtn";

function ProductCarditem({ product, editable = false, user, purchase }) {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const AddToCart = async () => {
    setLoading(true);
    setCart((cart) => [...cart, product]);
    const result = await axios.post("/api/cart", {
      email: user?.primaryEmailAddress?.emailAddress,
      productId: product?.id,
    });
    setLoading(false);
  };

  return (
    <Card className="p-3">
      <Link href={"/explore/" + product.id}>
        {/* Product Image */}
        <Image
          className="h-[180px] object-cover"
          src={product?.imageUrl}
          alt={product?.title}
          width={500}
          height={300}
        />
        <div className="mt-3">
          <h2 className="font-bold line-clamp-1 text-xl">
            {product?.title || "Unknown Product"}
          </h2>
          <h2 className="font-bold text-2xl text-yellow-500">
            ₹{product?.price || "0.00"}
          </h2>
        </div>
      </Link>
      <div className="mt-3 md:flex justify-between items-center">
        {!purchase && (
          <>
            <div className="flex gap-2 items-center">
              {/* User Image */}
              <Image
                src={product?.user?.image}
                alt="User image"
                width={20}
                height={20}
                className="rounded-full"
              />
              <h2 className="text-sm text-gray-400">
                {product?.user?.name || "Unknown User"}
              </h2>
            </div>
            <AddToCartBtn product={product} editable={editable} />
          </>
        )}
        
        {purchase && (
          <Link href={product?.fileUrl}>
            <Button className="w-full bg-green-700 text-white">
              Download Content
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}

export default ProductCarditem;