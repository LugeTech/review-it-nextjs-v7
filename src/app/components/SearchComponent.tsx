'use client'
import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { useAtom } from "jotai";
import { allProductsStore } from "@/app/store/store";
import { iProduct } from '../util/Interfaces';
import SearchResults from './SearchResult';

const SearchBox = () => {
  const [searchResults, setSearchResults] = useState<iProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [allProducts, setAllProducts] = useAtom(allProductsStore);

  const filteredProducts = (products: iProduct[]) => {
    const fp = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return fp;
  };

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      // setAllProducts(filteredProducts(allProducts));
      console.log('typing timeout!')
      setSearchResults(filteredProducts(allProducts));
    }, 700); // 500ms delay

    setTypingTimeout(timeout);
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [searchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      // );
    }
    setSearchTerm(e.target.value);
  };


  return (
    <div className="flex flex-col px-4 h-full w-full lg:w-1/2 items-center bg-myTheme-light dark:bg-myTheme-dark ">
      <input
        type="text"
        className="block w-full py-4 pl-4 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-myTheme-neutral focus:border-myTheme-light dark:bg-myTheme-neutral dark:border-myTheme-grey-600 dark:placeholder-myTheme-light dark:text-myTheme-light dark:focus:ring-myTheme-secondary dark:focus:border-myTheme-light"
        placeholder="Company | Service | Product..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchBox;
