import { Card } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function ProductCarditem({ product }) {
  // Provide default images
  const productImage = product?.image?.startsWith('http') ? product.image : '/default-product.png';
  const userImage = product?.user?.image?.startsWith('http') ? product.user.image : '/default-user.png';

  return (
    <div>
      <Card className="p-3"> 
        {/* Product Image */}
        <Image src={product?.image} alt="Product image" width={500} height={300} />
        <div className="mt-3">
          <h2 className="font-bold text-xl">{product?.name || 'Unknown Product'}</h2>
          <h2 className="font-bold text-2xl text-yellow-500">₹{product?.price || '0.00'}</h2>
          <div className="mt-3 md:flex justify-between items-center">
            <div className="flex gap-2 items-center">
              {/* User Image */}
              {/* <Image
                src={product?.user?.image}
                alt="User image"
                width={20}
                height={20}
                className="rounded-full"
              /> */}
              <h2 className="text-sm text-gray-400">{product?.user?.name || 'Unknown User'}</h2>
            </div>
            <Button size="sm" className="mt-1">Add to Cart</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductCarditem;
