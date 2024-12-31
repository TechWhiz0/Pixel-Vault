import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import RemoveFromCart from "./RemoveFromCart";

function CheckoutProductItem({ product }) {
  return (
    <div>
      <Card className="p-3 flex justify-betweenc gap-5">
        <div className="flex items-center gap-5 justify-between">
          <Image
            className="object-cover h-[80px] w-[80px]"
            width={100}
            height={100}
            src={product?.imageUrl}
            alt={product?.title}
          />
          <div>
            <h2 className="font-medium text-lg">{product?.title}</h2>
            <h2 className="text-gray-400">{product?.category}</h2>
            <RemoveFromCart product={product} />
          </div>
        </div>
        <h2 className="font-bold text-lg">₹{product?.price}</h2>
      </Card>
    </div>
  );
}

export default CheckoutProductItem;
