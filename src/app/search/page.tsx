'use client';
import React, { Suspense, useState } from 'react';
import SearchBox from '@/app/components/SearchBox';
import SearchResult from '@/app/components/SearchResult';
import ProductListLoader from '@/app/components/ProductListLoader'; // Import the loader component
import { iProduct } from '@/app/util/Interfaces';
// interface Product {
//   id: number;
//   name: string;
//   details: string;
// }

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<iProduct[]>([]);
  const [selectedResult, setSelectedResult] = useState<iProduct | null>(null);
  const [results, setResults] = useState<iProduct[]>([]);

  // Callback function to handle data loading completion
  const handleDataLoaded = (data: iProduct[]) => {
    console.log(data);
    setSearchResults(data);
  };

  const handleSearch = (query: string) => {
    // Filter the data based on the user's search query
    console.log(selectedResult);
    const results = searchResults.filter((result) =>
      result.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(results);
    setSelectedResult(null);
  };

  const handleItemClick = (result: iProduct) => {
    setSelectedResult(result);
  };

  return (
    <div className="">
      <h1>Search App</h1>
      <Suspense >
        <ProductListLoader />
      </Suspense>

      <SearchBox onSearch={handleSearch} />
      <SearchResult
        results={results}
        onItemClick={handleItemClick}
      />
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
