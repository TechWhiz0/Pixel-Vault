"use client";
import React, { useState, useEffect } from 'react';
import DisplayProductList from '@/app/_components/DisplayProductList';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import SortProducts from '@/app/_components/SortProducts';

function Explore() {
  const [productList, setProductList] = useState([]); // Initialize as an empty array
  const [offset, setOffset] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({
    label: "NEWEST",
    field: "id",  // Ensure 'id' matches a valid column in the database
    order: "desc",
  });

  useEffect(() => {
    GetProductList(0, true); // Fetch data on component mount
  }, []);

  const GetProductList = async (offset_, reset = false) => {
    try {
      const result = await axios.post('/api/all-products', {
        limit: 6,
        offset: offset_,
        searchText: searchInput,
        sort:sort??[]
      });
      console.log("Fetched products:", result.data);

      // Reset product list if starting a new search
      if (reset) {
        setProductList(result.data);
      } else {
        setProductList((prev) => [...prev, ...result.data]);
      }

      // Update the offset
      setOffset(offset_ + 6);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = () => {
    setOffset(0); // Reset offset for new search
    GetProductList(0, true); // Fetch data and reset the product list
  };

  useEffect(()=>{
    if(sort){
      setProductList([])
      GetProductList(0)
    }
  },[sort])

  return (
    <div className="mt-10">
      <h2 className="font-bold text-3xl">Explore</h2>
      <div className="mt-5 mb-5 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="font-medium">Search:</h2>
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="w-80"
            placeholder="Search products"
          />
          <Button onClick={handleSearch}>
            <Search className="mr-2" />
            Search
          </Button>
        </div>
        <SortProducts onSortChange={(value)=>setSort(value)}/>
      </div>
      <DisplayProductList productList={productList} />
      <div className="flex items-center justify-center mt-10">
        <Button onClick={() => GetProductList(offset)}>Load More</Button>
      </div>
    </div>
  );
}

export default Explore;
