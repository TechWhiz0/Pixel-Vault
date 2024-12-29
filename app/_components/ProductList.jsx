"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Products from '../_mockData/Products'
import ProductCarditem from './ProductCarditem'
import axios from 'axios'
import Link from 'next/link'
import DisplayProductList from './DisplayProductList'

function ProductList() {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    // setProductList(Products)
    GetProductList()
  }, [])

  const GetProductList=async()=>{
    const result=await axios.get('/api/products?limit=9')
    console.log(result);
    setProductList(result.data)
  }

  return (
    <div className="font-bold text-xl">
      <div className="flex justify-between items-center">
        <span>Featured</span>
        <h2>
          <Link href={'/explore'}>
          <Button>View All</Button>
          </Link>
        </h2>
      </div>

      <DisplayProductList productList={productList}/>
    </div>
  )
}

export default ProductList
