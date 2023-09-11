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
      // );
    }
    setSearchTerm(e.target.value);
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className="border p-2 rounded"
      />
      <SearchResults results={searchResults} onItemClick={() => { }} />
    </div>
  );
};

export default SearchBox;
