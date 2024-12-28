"use client"
import React, { useEffect } from 'react'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'

function Provider({children}) {
  const{user}=useUser()
  useEffect(()=>{
    user&&checkIsNewUser()
  },[user])
  const checkIsNewUser=async()=>{
    const result=await axios.post('/api/user',{
      user:user
    })
    console.log("result",result.data);
  }
  return (
    <div>
        <Header/>
        <div>
        {children}
    </div>
    </div>
  )
}

export default Provider