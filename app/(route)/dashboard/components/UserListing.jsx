"use client";
import ProductCarditem from '@/app/_components/ProductCarditem';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function UserListing() {
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
  
    useEffect(() => {
      if (user) {
        GetUserProductList();
      }
    }, [user]);
  
    const GetUserProductList = async () => {
      setLoading(true);
      try {
        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) {
          console.error("Email is undefined");
          return;
        }
  
        const result = await axios.get(`/api/products?email=${email}`);
        console.log("API Response:", result);
        setListing(result?.data); // Ensure `data` is the correct key.
    
      } catch (error) {
        console.error("Error fetching user products:", error);
      } finally {
        setLoading(false);
      }
    };

  
    return (
      <div className="mt-5">
        <h2 className="font-bold text-xl flex justify-between items-center">
          Listing
          <Link href={'/add-product'}>
            <Button>+ Add New Product</Button>
          </Link>
        </h2>
        {loading && <p className="text-center">Loading...</p>}
        <div>
          {listing?.length === 0 && !loading && (
            <h2 className="font-medium mt-10 text-2xl text-center text-gray-300">No Listing Found</h2>
          )}
          <div className="grid mt-5 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {listing?.map((product, index) => (
              <ProductCarditem key={index} product={product} editable={true} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default UserListing;