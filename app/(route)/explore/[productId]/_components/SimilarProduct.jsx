import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCarditem from "@/app/_components/ProductCarditem";

function SimilarProduct({ category }) {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (category) {
      fetchSimilarProducts();
    }
  }, [category]); // Fetch similar products whenever the category changes

  const fetchSimilarProducts = async () => {
    try {
      // Fetch all products
      const result = await axios.get("/api/products");

      // Filter products by category
      const filteredProducts = result.data.filter(
        (product) => product.category === category
      );

      setSimilarProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-4">Similar Products</h2>
      
      
      {similarProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {similarProducts.map((product) => (
            <ProductCarditem product={product}/>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No similar products found for this category.</p>
      )}
    </div>
  );
}

export default SimilarProduct;
