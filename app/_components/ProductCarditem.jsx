import { Card } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MoreVerticalIcon } from 'lucide-react';
import ProductEditableOption from './ProductEditableOption';


function ProductCarditem({ product,editable=false }) {
  return (
    <div>
      <Card className="p-3"> 
        {/* Product Image */}
        <Image src={product?.imageUrl} alt={product?.title} width={500} height={300} />
        <div className="mt-3">
          <h2 className="font-bold text-xl">{product?.title || 'Unknown Product'}</h2>
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
           {!editable?<Button size="sm" className="mt-1">Add to Cart</Button>:
           <ProductEditableOption>
            <MoreVerticalIcon/>
           </ProductEditableOption>
           } 
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductCarditem;
