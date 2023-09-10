import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { useAtom } from "jotai";
import { allProductsStore } from "@/app/store/store";
import { iProduct } from '../util/Interfaces';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [allProducts, setAllProducts] = useAtom(allProductsStore);

  const filteredProducts = (products: iProduct[]) => {
    const fp = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('input change', fp)
    return fp;
  };

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      // setAllProducts(filteredProducts(allProducts));
      filteredProducts(allProducts)
    }, 1000); // 500ms delay

    setTypingTimeout(timeout);
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [searchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      // console.log('input change', filteredProducts(allProducts));
    }
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleInputChange}
      className="border p-2 rounded"
    />
  );
};

export default SearchBox;
