import { Card } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import React, { useContext } from 'react'
import { toast } from 'sonner'
import { CartContext } from '../_context/CartContext'
import RemoveFromCart from './RemoveFromCart'

function CartProductItem({product}) {
  return (
    <Card className="flex gap-4">
        <Image className='h-[80px] w-[80px] object-cover' src={product?.imageUrl} alt={product?.title} width={70} height={70}  />
        <div>
            <h2 className='font-bold'>{product?.title}</h2>
            <h2 className='font-bold text-yellow-600 text-lg'>₹ {product?.price}</h2>
           <RemoveFromCart product={product}/>
        </div>
    </Card>
  )
}

export default CartProductItem