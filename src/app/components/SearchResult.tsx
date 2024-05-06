import React from "react";
import { iProduct } from "../util/Interfaces";
// import Link from 'next/link';
import ProductCardSlim from "@/app/components/ProductCardSlim";

interface SearchResultsProps {
  results: iProduct[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const productCardOptions = {
    size: "rating-sm",
  };

  return (
    <div className="  mt-1 gap-2 p-4 flex w-full max-h-[460px] flex-col justify-center items-center bg-myTheme-accent dark:bg-myTheme-niceBlack shadow-2xl rounded-md z-10">
      <div className="mt-2 flex flex-col gap-2">
        <p className="text-xl font-bold text-left">Products</p>
        {results.slice(0, 3).map((result) => (
          <ProductCardSlim
            options={productCardOptions}
            product={result}
            key={result.id}
          />
        ))}
        <p className="text-xl font-bold text-left">Categories</p>
        Category list
      </div>
    </div>
  );
};

export default SearchResults;
