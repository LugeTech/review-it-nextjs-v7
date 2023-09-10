import React from 'react';
import { iProduct } from '../util/Interfaces';

interface SearchResultsProps {
  results: iProduct[];
  onItemClick: (result: iProduct) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onItemClick,
}) => {
  return (
    <ul>
      {results.map((result) => (
        <li
          key={result.id}
          onClick={() => onItemClick(result)}
          className="cursor-pointer p-2 border hover:bg-gray-100"
        >
          <div className="text-xl font-bold">{result.name}</div>
          <div className="text-sm font-light">{result.id}</div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
