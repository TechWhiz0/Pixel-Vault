import React, { useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartContext } from "../_context/CartContext";
import CartProductItem from "./CartProductItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CartList({ children }) {
  const { cart, setCart } = useContext(CartContext);
  const calculate = () => {
    let total = 0;
    cart.forEach((product) => {
      total += Number(product.price);
    });
    return total;
  };
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart ({cart?.length})</SheetTitle>
          <SheetDescription asChild>
            <div>
              <p>Your all cart items listed here</p>
              <div className="flex mt-5 flex-col gap-2">
                {cart?.map((product, index) => (
                  <CartProductItem key={index} product={product} />
                ))}
              </div>
              <div>
                <h2 className="font-bold mt-10 flex text-2xl justify-between">
                  Total : <span>₹{calculate()}</span>
                </h2>
                <Link href={"/checkout"}>
                  <Button className="w-full mt-3">CHECKOUT</Button>
                </Link>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CartList;
