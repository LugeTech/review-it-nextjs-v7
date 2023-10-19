import React from 'react';
import { iProduct } from '../util/Interfaces';
// import Link from 'next/link';
import ProductCardSlim from './ProductCardSlim';

interface SearchResultsProps {
  results: iProduct[];
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
}) => {
  const productCardOptions = {
    size: 'rating-sm',
  }

  return (
    <div className="  mt-2 gap-2 p-4 flex w-full flex-col justify-start items-start bg-myTheme-primary shadow-xl overflow-scroll rounded-md z-10">
      {results.map((result) => (
        <ProductCardSlim options={productCardOptions} product={result} key={result.id} />))}
    </div>
  );
};

export default SearchResults;
