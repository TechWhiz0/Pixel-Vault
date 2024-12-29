"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from "react";
import ImageUpoad from "./_components/ImageUpoad";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";

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
  const [formData,setFormData]=React.useState([])
  const {user}=useUser()
  const [loading,setLoading]=useState(false)
  const router=useRouter()
  useEffect(()=>{
    setFormData({
      userEmail:user?.primaryEmailAddress?.emailAddress
    })
  },[user])

  const handleInputChange=(fieldName,fieldValue)=>{
    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue
    }))
    console.log(formData);
  }

  const onAddProductButtonClick = async () => {
    setLoading(true); // Start loading immediately on button click
    
    const formDataObj = new FormData();
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }
    if (formData.file) {
      formDataObj.append("file", formData.file);
    }
    formDataObj.append("data", JSON.stringify(formData));
  
    try {
      const result = await axios.post("/api/products", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast("New product added successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false); // End loading after request completion
    }
  };
  
  

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold">Add New Product</h2>
      <p>Start adding product details to sell your item</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        <div className="flex flex-col gap-5">

          <ImageUpoad onImageSelect={(e)=>handleInputChange(e.target.name,e.target.files[0])}/>
          <div>
            <h4>Upload File which you  want to Sell</h4>
            <Input type="file" onChange={(e)=>handleInputChange(e.target.name,e.target.files[0])} name="file" />
          </div>
          <div>
            <h4>Message to User</h4>
            <Textarea onChange={(e)=>handleInputChange(e.target.name,e.target.value)} name="message" placeholder={'Write Thank you message to user to User'}/>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <h4>Product Title</h4>
            <Input name="title" onChange={(e)=>handleInputChange(e.target.name,e.target.value)} placeholder="Ex. UI Kit in Figma" />
          </div>
          <div>
            <h4>Price</h4>
            <Input onChange={(e)=>handleInputChange(e.target.name,e.target.value)} type="number" name="price" placeholder="Ex. ₹500" />
          </div>
          <div>
            <h4>Category</h4>
            <Select onValueChange={(value)=>handleInputChange('category',value)}>
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
          <div>
            <h4>Description</h4>
            <Textarea onChange={(e)=>handleInputChange(e.target.name,e.target.value)} name="description" placeholder={'Add Product description'}/>
          </div>
          <div>
            <h4>About Product (Optional)</h4>
            <Textarea onChange={(e)=>handleInputChange(e.target.name,e.target.value)} name="about" placeholder={'Add Product Information'}/>
          </div>
          <Button onClick={onAddProductButtonClick} disabled={loading}>
  {loading ? <Loader2Icon className="animate-spin" /> : "Add Product"}
</Button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
