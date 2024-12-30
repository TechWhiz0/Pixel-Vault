"use client"
import { Card } from '@/components/ui/card'
import React, { useContext ,useState} from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MoreVerticalIcon } from 'lucide-react';
import ProductEditableOption from './ProductEditableOption';
import Link from 'next/link';
import axios from 'axios';
import { CartContext } from '../_context/CartContext'


function ProductCarditem({ product,editable=false ,user}) {
  const {cart,setCart}=useContext(CartContext)
  const[loading,setLoading]=useState(false)
  const AddToCart=async()=>{
    setLoading(true)
    const result=await axios.post('/api/cart',{
      email:user?.primaryEmailAddress?.emailAddress,
      productId:product?.id
    })
    setCart((cart=>[...cart,product]))
    setLoading(false)
  }
  return (
    <Link href={'/explore/'+product.id}>
      <Card className="p-3"> 
        {/* Product Image */}
        <Image className='h-[180px] object-cover' src={product?.imageUrl} alt={product?.title} width={500} height={300} />
        <div className="mt-3">
          <h2 className="font-bold line-clamp-1 text-xl">{product?.title || 'Unknown Product'}</h2>
          <h2 className="font-bold text-2xl text-yellow-500">₹{product?.price || '0.00'}</h2>
          <div className="mt-3 md:flex justify-between items-center">
            <div className="flex gap-2 items-center">
              {/* User Image */}
              <Image
                src={product?.user?.image}
                alt="User image"
                width={20}
                height={20} 
                className="rounded-full"
              />
              <h2 className="text-sm text-gray-400">{product?.user?.name || 'Unknown User'}</h2>
            </div>
           {!editable?<Button size="sm" disabled={loading} onClick={AddToCart} className="mt-1">Add to Cart</Button>:
           <ProductEditableOption>
            <MoreVerticalIcon/>
           </ProductEditableOption>
           } 
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default ProductCarditem;
