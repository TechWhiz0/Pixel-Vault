"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Products from '../_mockData/Products'
import ProductCarditem from './ProductCarditem'

function ProductList() {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    setProductList(Products)
  }, [])

  return (
    <div className="font-bold text-xl">
      <div className="flex justify-between items-center">
        <span>Featured</span>
        <h2>
          <Button>View All</Button>
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5">
        {productList.map((product, index) => (
          <ProductCarditem product={product} key={index} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
