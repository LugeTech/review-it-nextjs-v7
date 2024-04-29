"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useAtom } from "jotai";
import { allProductsStore } from "@/app/store/store";
import { iProduct } from "../util/Interfaces";
import SearchResults from "./SearchResult";

const SearchBox = () => {
  const [searchResults, setSearchResults] = useState<iProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [allProducts, _] = useAtom(allProductsStore);

  const filteredProducts = (products: iProduct[], searchTerm: string) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Sort by closest match
    filteredProducts.sort((a, b) => {
      const aIndex = a.name.toLowerCase().indexOf(searchTerm.toLowerCase());
      const bIndex = b.name.toLowerCase().indexOf(searchTerm.toLowerCase());

      // If one product contains the search term earlier in the name, it's considered closer match
      return aIndex - bIndex;
    });

    return filteredProducts;
  };

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      // setAllProducts(filteredProducts(allProducts));
      setSearchResults(filteredProducts(allProducts, searchTerm));
    }, 100); // 500ms delay

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
    <div className="flex flex-col px-4 h-full w-full md:w-5/6 items-center bg-transparent ">
      <input
        type="search"
        className="block w-full py-4 pl-4 pr-4 text-sm text-black border border-gray-400 rounded-lg bg-gray-50 focus:ring-myTheme-neutral focus:border-myTheme-light dark:bg-myTheme-niceBlack dark:border-myTheme-grey-600 dark:placeholder-myTheme-light dark:text-myTheme-light dark:focus:ring-myTheme-secondary dark:focus:border-myTheme-light"
        placeholder="Company | Service | Product..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm && <SearchResults results={searchResults} />}
    </div>
  );
};

export default SearchBox;
