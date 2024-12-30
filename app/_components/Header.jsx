import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";

function Header() {
  const MenuList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Store",
      path: "/store",
    },
    {
      name: "Explore",
      path: "/explore",
    },
  ];

  const {cart,setCart}=useContext(CartContext)
  return (
    <div className="flex justify-between items-center p-4 px-10 md:px-32 lg:px-48 bg-primary border-black border-b-2">
      <h2 className="font-bold text-lg bg-black text-white px-2 p-1">
        Pixel Vault
      </h2>
      <ul className="hidden md:flex gap-5">
        {MenuList.map((menu, index) => (
          <Link key={index} href={menu?.path}>
            <li
              key={index}
              className="px-2 p-1 cursor-pointer hover:border-2 hover:border-white"
            >
              {menu?.name}
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex gap-5 items-center">
        <div className="flex rounded-full py-1 items-center">
          <ShoppingBag />
          <Badge className="bg-black text-white hover:bg-black">{cart?.length}</Badge>
        </div>
        <Link href={"/dashboard"}>
          <Button className="bg-red-500 hover:bg-red-600">Start Selling</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
