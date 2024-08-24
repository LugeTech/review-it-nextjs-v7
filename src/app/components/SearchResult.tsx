import React from "react";
import { iProduct } from "../util/Interfaces";
import ProductCardSlim from "@/app/components/ProductCardSlim";

interface SearchResultsProps {
  results: iProduct[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const productCardOptions = {
    size: "rating-sm",
  };

  return (
    <div className="mt-1 w-full max-h-[460px] bg-white shadow-lg rounded-lg overflow-hidden z-10">
      <div className="p-4 space-y-4">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Products</h2>
          <div className="space-y-2">
            {results.slice(0, 3).map((result) => (
              <ProductCardSlim
                options={productCardOptions}
                product={result}
                key={result.id}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Categories</h2>
          <p className="text-gray-600">Category list (to be implemented)</p>
        </section>
      </div>
    </div>
  );
};

export default SearchResults;
