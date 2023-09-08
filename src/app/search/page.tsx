'use client';
import React, { useState } from 'react';
import SearchBox from '@/app/components/SearchBox';
import SearchResult from '@/app/components/SearchResult';

const fakeData = [
  { id: 1, name: 'John Doe', details: '123 Main St' },
  { id: 2, name: 'Jane Smith', details: '456 Elm St' },
  { id: 3, name: 'Alice Johnson', details: '789 Oak St' },
  // Add more fake data here
];
interface iSearchResult {
  id: number;
  name: string;
  details: string;
}

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState(fakeData);
  const [selectedResult, setSelectedResult] = useState<
    iSearchResult | null
  >(null);

  const handleSearch = (query: string) => {
    // Simulate querying the database
    const results = fakeData.filter((result) =>
      result.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setSelectedResult(null);
  };

  const handleItemClick = (result: iSearchResult) => {
    setSelectedResult(result);
  };

  return (
    <div className="App">
      <h1>Search App</h1>
      <SearchBox onSearch={handleSearch} />
      <SearchResult
        results={searchResults}
        onItemClick={handleItemClick}
      />
      {selectedResult && (
        <div className="selected-result">
          <div className="top-layer">{selectedResult.name}</div>
          <div className="bottom-layer">{selectedResult.details}</div>
        </div>
      )}
    </div>
  );
};

export default Search;
