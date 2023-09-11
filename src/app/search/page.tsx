'use client';
import React, { useState } from 'react';
import SearchComponent from '@/app/components/SearchComponent';
import ProductListLoader from '@/app/components/ProductListLoader'; // Import the loader component
import { iProduct } from '@/app/util/Interfaces';
import ProductCardSlim from '../components/ProductCardSlim';

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<iProduct[]>([]);
  const [selectedResult, setSelectedResult] = useState<iProduct | null>(null);
  const [results, setResults] = useState<iProduct[]>([]);

  return (
    <div className="flex flex-col bg-myTheme-light dark:bg-myTheme-dark h-full w-full items-center justify-start">
      <SearchComponent />
      <ProductListLoader />
      {selectedResult && (
        <div className="selected-result">
          <div className="top-layer">{selectedResult.name}</div>
          <div className="bottom-layer">{selectedResult.id}</div>
        </div>
      )}
    </div>
  );
};

export default Search;
