"use client"
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { CartContext } from './_context/CartContext'

function Provider({children}) {
  const{user}=useUser()
  const [cart,setCart]=useState([])
  useEffect(()=>{
    user&&checkIsNewUser()
    user&&GetCartItems()
  },[user])
  const checkIsNewUser=async()=>{
    const result=await axios.post('/api/user',{
      user:user
    })
  }

  const GetCartItems=async()=>{
    const result=await axios.get('/api/cart?email='+user?.primaryEmailAddress?.emailAddress)
    setCart(result.data)
    console.log("cart item",result);
  }
  return (
    <div>
      <CartContext.Provider value={{cart,setCart}}>

        <Header/>
        <div>
        {children}
    </div>
      </CartContext.Provider>
    </div>
  )
}

export default Provider