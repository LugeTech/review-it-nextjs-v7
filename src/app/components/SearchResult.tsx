import React from "react";
import { iProduct } from "../util/Interfaces";
import ProductCardSlim from "@/app/components/ProductCardSlim";

interface SearchResultsProps {
  results: iProduct[];
  tags: iProduct[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, tags }) => {
  const productCardOptions = {
    size: "rating-sm",
  };

  return (
    <div className="mt-1 w-full h-[460px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 h-full flex flex-col">
        {/* Products section */}
        <section className="flex-1 overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Products</h2>
          <div className="space-y-2 overflow-y-auto h-[calc(100%-2rem)]">
            {results.map((result) => (
              <ProductCardSlim
                options={productCardOptions}
                product={result}
                key={result.id}
              />
            ))}
          </div>
        </section>

        {/* Categories section */}
        <section className="flex-1 overflow-hidden mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Categories
          </h2>
          <div className="overflow-y-auto h-[calc(100%-2rem)]">
            {tags.map((result) => (
              <ProductCardSlim
                options={productCardOptions}
                product={result}
                key={result.id}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default SearchResults;
