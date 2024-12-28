import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

function AddProduct() {
  const categoryOption = [
    "Source Code",
    "UI Kit",
    "Icons",
    "Documents",
    "Fonts",
    "Theme",
    "Video",
    "Illustration",
    "Other",
  ];

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold">Add New Product</h2>
      <p>Start adding product details to sell your item</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div></div>
        <div className="flex flex-col gap-5">
          <div>
            <h4>Product Title</h4>
            <Input name="title" placeholder="Ex. UI Kit in Figma" />
          </div>
          <div>
            <h4>Price</h4>
            <Input type="number" name="price" placeholder="Ex. ₹500" />
          </div>
          <div>
            <h4>Category</h4>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOption.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
