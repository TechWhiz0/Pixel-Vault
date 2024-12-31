import React, { useContext, useState } from 'react'
import { CartContext } from '../_context/CartContext'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import ProductEditableOption from './ProductEditableOption'
import { MoreVerticalIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

function AddToCartBtn({ editable, size = "sm" ,product}) {
    const { cart, setCart } = useContext(CartContext)
    const [loading, setLoading] = useState(false)
    const {user}=useUser()

    const AddToCart = async () => {
        setLoading(true)
        setCart(cart => [...cart, product])
        await axios.post('/api/cart', {
            email: user?.primaryEmailAddress?.emailAddress,
            productId: product?.id
        })
        setLoading(false)
    }

    return (
        <div>
            {!editable ? (
                <Button size={size} disabled={loading} onClick={AddToCart} className="mt-1">
                    Add to Cart
                </Button>
            ) : (
                <ProductEditableOption>
                    <MoreVerticalIcon />
                </ProductEditableOption>
            )}
        </div>
    )
}

export default AddToCartBtn
